import { createClient } from "@/lib/supabase/server";
import { addStudent } from "@/app/actions/student";

export default async function StudentsPage() {
  const supabase = await createClient();

  // স্টুডেন্ট এবং তাদের প্রোফাইল ডেটা জয়েন করে আনা হচ্ছে
  const { data: students, error } = await supabase
    .from("students")
    .select(`
      permanent_student_id,
      current_class,
      current_roll,
      xp,
      rank,
      profiles ( full_name, phone )
    `)
    .order("current_class", { ascending: true });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Student Management</h2>
          <p className="text-gray-500">Manage student records and IDs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Student Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
          <h3 className="text-lg font-semibold mb-4">Admit New Student</h3>
          <form action={addStudent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="fullName" required className="mt-1 block w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Class</label>
              <select name="class" required className="mt-1 block w-full px-3 py-2 border rounded-md">
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 10">Class 10</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Roll Number</label>
              <input type="number" name="roll" required className="mt-1 block w-full px-3 py-2 border rounded-md" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Admit Student
            </button>
          </form>
        </div>

        {/* Student List Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permanent ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class & Roll</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank / XP</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students?.map((student) => (
                  <tr key={student.permanent_student_id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{student.profiles?.full_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {student.permanent_student_id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.current_class} | Roll: {student.current_roll}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.rank} ({student.xp} XP)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {(!students || students.length === 0) && (
              <div className="text-center py-8 text-gray-500">No students found. Add a student to get started.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}