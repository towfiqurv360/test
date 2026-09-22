import { createClient } from "@/lib/supabase/server";
import { createSupportTicket, resolveTicket } from "@/app/actions/support";

export default async function SupportPage() {
  const supabase = await createClient();
  
  // ফেচিং টিকেট লিস্ট
  const { data: tickets } = await supabase
    .from("support_tickets")
    .select("*, students(permanent_student_id, profiles(full_name))")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Live Support Queue</h2>
          <p className="text-gray-500">Human escalation and doubt clearing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Create Ticket */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h3 className="font-bold text-gray-800 mb-4">Raise a Support Ticket</h3>
          <form action={createSupportTicket} className="space-y-4">
            <textarea 
              name="question" 
              rows="4" 
              required 
              placeholder="Describe your problem here. E.g., I didn't understand the Math formula on page 42."
              className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">
              Submit Question
            </button>
          </form>
        </div>

        {/* Tickets Queue */}
        <div className="lg:col-span-2 space-y-4">
          {tickets?.map(ticket => (
            <div key={ticket.id} className={`p-6 rounded-2xl border ${
              ticket.status === 'Resolved' ? 'bg-gray-50 border-gray-200 opacity-70' : 'bg-white border-blue-100 shadow-sm'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    ticket.status === 'Open' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {ticket.status}
                  </span>
                  <span className="text-sm font-semibold text-gray-500">
                    {ticket.students?.profiles?.full_name} ({ticket.students?.permanent_student_id})
                  </span>
                </div>
                <span className="text-xs text-gray-400">{new Date(ticket.created_at).toLocaleDateString()}</span>
              </div>
              
              <p className="text-gray-800 font-medium">{ticket.question}</p>
              
              {ticket.status !== 'Resolved' && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                  <form action={resolveTicket}>
                    <input type="hidden" name="ticketId" value={ticket.id} />
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition">
                      Mark Resolved
                    </button>
                  </form>
                  <button className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition">
                    Start Video Call
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}