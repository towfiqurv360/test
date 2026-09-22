import { createClient } from "@/lib/supabase/server";
import { addTeacher } from "@/app/actions/teacher";

export default async function TeachersPage() {
  const supabase = await createClient();

  const { data: teachers } = await supabase
    .from("teachers")
    .select(`
      employee_id,
      designation,
      joining_date,
      profiles ( full_name, phone )
    `)
    .order("joining_date", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Teacher Management</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
          <h3 className="font-semibold mb-4">Add New Teacher</h3>
          <form action={addTeacher} className="space-y-4">
            <input type="text" name="fullName" placeholder="Full Name" required className="w-full px-3 py-2 border rounded-md" />
            <input type="text" name="employeeId" placeholder="Employee ID (e.g. EMP-101)" required className="w-full px-3 py-2 border rounded-md" />
            <input type="text" name="designation" placeholder="Designation (e.g. Math Teacher)" required className="w-full px-3 py-2 border rounded-md" />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Add Teacher</button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="pb-3">Name</th>
                <th className="pb-3">Employee ID</th>
                <th className="pb-3">Designation</th>
              </tr>
            </thead>
            <tbody>
              {teachers?.map((teacher) => (
                <tr key={teacher.employee_id} className="border-b last:border-0">
                  <td className="py-3 font-medium">{teacher.profiles?.full_name}</td>
                  <td className="py-3 text-sm text-gray-600">{teacher.employee_id}</td>
                  <td className="py-3 text-sm text-gray-600">{teacher.designation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}