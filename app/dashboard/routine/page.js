import { createClient } from "@/lib/supabase/server";
import { addRoutineSlot } from "@/app/actions/routine";

export default async function RoutinePage() {
  const supabase = await createClient();

  // ফর্মের ড্রপডাউনের জন্য ডেটা ফেচ করা
  const { data: classes } = await supabase.from("classes").select("id, name, sections(id, name), subjects(id, name)");
  const { data: teachers } = await supabase.from("profiles").select("id, full_name").eq("role", "TEACHER");
  
  // existing রুটিন ফেচ করা
  const { data: routines } = await supabase
    .from("routines")
    .select(`
      id, day_of_week, start_time, end_time, room_no,
      classes(name), sections(name), subjects(name), profiles(full_name)
    `)
    .order("start_time", { ascending: true });

  const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Class Routine Management</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Routine Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
          <h3 className="font-semibold mb-4">Add Routine Slot</h3>
          <form action={addRoutineSlot} className="space-y-4">
            <select name="classId" required className="w-full px-3 py-2 border rounded-md">
              <option value="">Select Class...</option>
              {classes?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            
            <div className="grid grid-cols-2 gap-2">
              <input type="text" name="sectionId" placeholder="Section ID (Copy from Academics)" required className="w-full px-3 py-2 border rounded-md text-sm" />
              <input type="text" name="subjectId" placeholder="Subject ID (Copy from Academics)" required className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>

            <select name="teacherId" required className="w-full px-3 py-2 border rounded-md">
              <option value="">Select Teacher...</option>
              {teachers?.map(t => <option key={t.id} value={t.id}>{t.full_name}</option>)}
            </select>

            <select name="dayOfWeek" required className="w-full px-3 py-2 border rounded-md">
              <option value="">Select Day...</option>
              {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            <div className="grid grid-cols-2 gap-2">
              <input type="time" name="startTime" required className="w-full px-3 py-2 border rounded-md" />
              <input type="time" name="endTime" required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <input type="text" name="roomNo" placeholder="Room Number (e.g. 101)" required className="w-full px-3 py-2 border rounded-md" />

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Add to Routine</button>
          </form>
        </div>

        {/* Display Routine */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3">Day & Time</th>
                <th className="px-4 py-3">Class & Section</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Teacher & Room</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {routines?.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {r.day_of_week} <br/> <span className="text-xs text-gray-500">{r.start_time} - {r.end_time}</span>
                  </td>
                  <td className="px-4 py-3">{r.classes?.name} - {r.sections?.name}</td>
                  <td className="px-4 py-3 font-semibold text-blue-600">{r.subjects?.name}</td>
                  <td className="px-4 py-3">{r.profiles?.full_name} <br/><span className="text-xs text-gray-500">Room: {r.room_no}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}