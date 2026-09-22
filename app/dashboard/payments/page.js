import { createClient } from "@/lib/supabase/server";
import { processPayment } from "@/app/actions/finance";

export default async function PaymentsPage() {
  const supabase = await createClient();

  // আনপেইড ফিস ফেচ করা (Payment Portal-এর জন্য)
  const { data: unpaidFees } = await supabase
    .from("fees")
    .select("*, students(permanent_student_id, profiles(full_name))")
    .eq("status", "Unpaid")
    .order("due_date", { ascending: true });

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-600 to-rose-700 p-8 rounded-2xl shadow-lg text-white">
        <h2 className="text-3xl font-bold">Online Payment Portal</h2>
        <p className="mt-2 text-pink-100 opacity-90">Pay your dues securely via bKash, Nagad, or Card.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {unpaidFees?.map(fee => (
          <div key={fee.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full">
                  {fee.fee_type}
                </span>
                <span className="text-lg font-black text-gray-800">৳{fee.amount}</span>
              </div>
              <h4 className="font-bold text-gray-900">{fee.students?.profiles?.full_name}</h4>
              <p className="text-sm text-gray-500 font-mono mb-4">ID: {fee.students?.permanent_student_id}</p>
              
              <div className="bg-red-50 text-red-700 text-xs font-semibold p-2 rounded-lg mb-4 text-center">
                Due by: {new Date(fee.due_date).toLocaleDateString()}
              </div>
            </div>

            <form action={processPayment} className="mt-auto space-y-3 border-t border-gray-100 pt-4">
              <input type="hidden" name="feeId" value={fee.id} />
              <input type="hidden" name="amountPaid" value={fee.amount} />
              
              <select name="paymentMethod" required className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm">
                <option value="bKash">bKash</option>
                <option value="Credit Card">Credit / Debit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>

              {/* Demo Transaction ID input (In real app, this comes from Gateway Webhook) */}
              <input type="text" name="transactionId" placeholder="Transaction ID (Demo)" required className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm" />

              <button type="submit" className="w-full bg-rose-600 text-white font-bold py-2.5 rounded-xl hover:bg-rose-700 transition">
                Pay Now
              </button>
            </form>
          </div>
        ))}

        {(!unpaidFees || unpaidFees.length === 0) && (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300 text-gray-500">
            🎉 All clear! No pending dues found.
          </div>
        )}
      </div>
    </div>
  );
}