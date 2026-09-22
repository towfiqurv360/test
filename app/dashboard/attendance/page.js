import { createClient } from "@/lib/supabase/server";
import { markAttendance } from "@/app/actions/attendance";

export default async function AttendancePage() {
  const supabase = await createClient();
  
  const today = new Date().toISOString().split('T')[0];

  // স্টুডেন্ট লিস্ট এবং আজকের অ্যাটেনডেন্স রেকর্ড ফেচ করা
  const { data: students } = await supabase
    .from("students")
    .select(`
      id, permanent_student_id, current_class, current_roll,
      profiles ( full_name ),
      attendance ( status, date )
    `)
    .order("current_roll", { ascending: true });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Daily Attendance</h2>
          <p className="text-gray-500">Mark attendance for {today}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">Student ID</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Name & Class</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Status (Today)</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students?.map((student) => {
              // চেক করা হচ্ছে আজকের তারিখে কোনো স্ট্যাটাস আছে কিনা
              const todayRecord = student.attendance?.find(a => a.date === today);
              const currentStatus = todayRecord ? todayRecord.status : "Not Marked";

              return (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-sm text-blue-600">{student.permanent_student_id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{student.profiles?.full_name}</div>
                    <div className="text-xs text-gray-500">{student.current_class} | Roll: {student.current_roll}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      currentStatus === 'Present' ? 'bg-green-100 text-green-800' :
                      currentStatus === 'Absent' ? 'bg-red-100 text-red-800' :
                      currentStatus === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {currentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <form action={markAttendance} className="flex gap-2">
                      <input type="hidden" name="studentId" value={student.id} />
                      <input type="hidden" name="date" value={today} />
                      <select name="status" defaultValue={currentStatus === "Not Marked" ? "Present" : currentStatus} className="px-2 py-1 border rounded text-sm bg-white">
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                        <option value="Excused">Excused</option>
                      </select>
                      <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                        Save
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}