import { createClient } from "@/lib/supabase/server";
import { generateFee } from "@/app/actions/finance";

export default async function FeesPage() {
  const supabase = await createClient();

  const { data: students } = await supabase.from("students").select("id, permanent_student_id, profiles(full_name)");
  
  const { data: fees } = await supabase
    .from("fees")
    .select("*, students(permanent_student_id, profiles(full_name))")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Fee Management</h2>
        <p className="text-gray-500">Generate invoices and track dues</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Generate Fee Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h3 className="font-bold text-gray-800 mb-4">Generate New Fee</h3>
          <form action={generateFee} className="space-y-4">
            <select name="studentId" required className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm">
              <option value="">Select Student...</option>
              {students?.map(s => <option key={s.id} value={s.id}>{s.profiles?.full_name} ({s.permanent_student_id})</option>)}
            </select>

            <select name="feeType" required className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm">
              <option value="Tuition Fee">Tuition Fee</option>
              <option value="Admission Fee">Admission Fee</option>
              <option value="Exam Fee">Exam Fee</option>
              <option value="Transport Fee">Transport Fee</option>
            </select>

            <input type="number" name="amount" placeholder="Amount (৳)" required className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
            
            <div>
              <label className="text-xs text-gray-500 ml-1">Due Date</label>
              <input type="date" name="dueDate" required className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">
              Generate Invoice
            </button>
          </form>
        </div>

        {/* Fees List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-4">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 rounded-lg">
              <tr>
                <th className="px-4 py-3 font-bold text-gray-600">Student Info</th>
                <th className="px-4 py-3 font-bold text-gray-600">Fee Details</th>
                <th className="px-4 py-3 font-bold text-gray-600">Amount & Due</th>
                <th className="px-4 py-3 font-bold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {fees?.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-4">
                    <div className="font-bold text-gray-900">{fee.students?.profiles?.full_name}</div>
                    <div className="text-xs text-gray-500 font-mono">{fee.students?.permanent_student_id}</div>
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-700">{fee.fee_type}</td>
                  <td className="px-4 py-4">
                    <div className="font-bold text-gray-900">৳{fee.amount}</div>
                    <div className="text-xs text-red-500">Due: {new Date(fee.due_date).toLocaleDateString()}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      fee.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {fee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}