import { createClient } from "@/lib/supabase/server";
import { addClass, addSection, addSubject } from "@/app/actions/academics";

export default async function AcademicsPage() {
  const supabase = await createClient();

  // ক্লাস, সেকশন এবং সাবজেক্ট একসাথে ফেচ করা হচ্ছে
  const { data: classes } = await supabase
    .from("classes")
    .select(`
      id,
      name,
      sections ( id, name ),
      subjects ( id, name, code )
    `)
    .order("name", { ascending: true });

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Academic Structure</h2>
        <p className="text-gray-500">Manage Classes, Sections, and Subjects</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Forms Section */}
        <div className="space-y-6">
          {/* Add Class Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-4">Add New Class</h3>
            <form action={addClass} className="flex gap-2">
              <input type="text" name="className" placeholder="e.g. Class 10" required className="flex-1 px-3 py-2 border rounded-md" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add</button>
            </form>
          </div>

          {/* Add Section Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-4">Add Section</h3>
            <form action={addSection} className="space-y-3">
              <select name="classId" required className="w-full px-3 py-2 border rounded-md">
                <option value="">Select Class...</option>
                {classes?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <div className="flex gap-2">
                <input type="text" name="sectionName" placeholder="Section Name (e.g. A)" required className="flex-1 px-3 py-2 border rounded-md" />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Add</button>
              </div>
            </form>
          </div>

          {/* Add Subject Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-4">Add Subject</h3>
            <form action={addSubject} className="space-y-3">
              <select name="classId" required className="w-full px-3 py-2 border rounded-md">
                <option value="">Select Class...</option>
                {classes?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input type="text" name="subjectName" placeholder="Subject Name" required className="w-full px-3 py-2 border rounded-md" />
              <input type="text" name="subjectCode" placeholder="Subject Code (Optional)" className="w-full px-3 py-2 border rounded-md" />
              <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">Add Subject</button>
            </form>
          </div>
        </div>

        {/* Display Section */}
        <div className="lg:col-span-2 space-y-6">
          {classes?.map((cls) => (
            <div key={cls.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-blue-800 border-b pb-2 mb-4">{cls.name}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sections List */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-700 mb-2">Sections</h4>
                  {cls.sections?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {cls.sections.map(sec => (
                        <span key={sec.id} className="bg-white px-3 py-1 rounded-md border shadow-sm text-sm font-medium">
                          {sec.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No sections added.</p>
                  )}
                </div>

                {/* Subjects List */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-700 mb-2">Subjects</h4>
                  {cls.subjects?.length > 0 ? (
                    <ul className="space-y-1">
                      {cls.subjects.map(sub => (
                        <li key={sub.id} className="text-sm bg-white px-3 py-2 rounded-md border shadow-sm flex justify-between">
                          <span>{sub.name}</span>
                          <span className="text-gray-400 font-mono text-xs">{sub.code}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400">No subjects added.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {(!classes || classes.length === 0) && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
              No classes found. Add a class to set up your academic structure.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}