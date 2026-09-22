import { createClient } from "@/lib/supabase/server";
import { assignChildToParent } from "@/app/actions/parent";

export default async function ParentsPage() {
  const supabase = await createClient();

  // প্যারেন্ট এবং তাদের লিঙ্ক করা স্টুডেন্টদের ডেটা ফেচ করা
  const { data: parents } = await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      phone,
      parent_student (
        relationship,
        students (
          permanent_student_id,
          current_class,
          profiles ( full_name )
        )
      )
    `)
    .eq("role", "PARENT");

  // অ্যাসাইন করার জন্য সব স্টুডেন্টের লিস্ট
  const { data: allStudents } = await supabase
    .from("students")
    .select("id, permanent_student_id, profiles(full_name)");

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Parent & Child Relationship</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
          <h3 className="font-semibold mb-4">Link Child to Parent</h3>
          <form action={assignChildToParent} className="space-y-4">
            <select name="parentId" required className="w-full px-3 py-2 border rounded-md">
              <option value="">Select Parent...</option>
              {parents?.map(p => <option key={p.id} value={p.id}>{p.full_name}</option>)}
            </select>
            
            <select name="studentId" required className="w-full px-3 py-2 border rounded-md">
              <option value="">Select Student...</option>
              {allStudents?.map(s => <option key={s.id} value={s.id}>{s.profiles?.full_name} ({s.permanent_student_id})</option>)}
            </select>

            <select name="relationship" required className="w-full px-3 py-2 border rounded-md">
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Guardian">Guardian</option>
            </select>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Link Student</button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {parents?.map((parent) => (
            <div key={parent.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="font-bold text-lg text-gray-800">{parent.full_name}</h4>
              <p className="text-sm text-gray-500 mb-4">Phone: {parent.phone || "N/A"}</p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-700 mb-2">Linked Children:</h5>
                {parent.parent_student?.length > 0 ? (
                  <ul className="space-y-2">
                    {parent.parent_student.map((childLink, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex justify-between border-b pb-2 last:border-0 last:pb-0">
                        <span>{childLink.students.profiles.full_name} ({childLink.relationship})</span>
                        <span className="font-mono bg-blue-100 text-blue-800 px-2 rounded">
                          {childLink.students.permanent_student_id} | {childLink.students.current_class}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-red-500">No children linked yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}