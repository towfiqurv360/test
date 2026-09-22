import { createClient } from "@/lib/supabase/server";
import { publishResult } from "@/app/actions/examEngine";

export default async function ResultsPage() {
  const supabase = await createClient();

  const { data: exams } = await supabase.from("exams").select("id, title, total_marks, classes(name)");
  const { data: students } = await supabase.from("students").select("id, permanent_student_id, current_class, profiles(full_name)");
  
  // পাবলিশ হওয়া রেজাল্ট ফেচ করা
  const { data: results } = await supabase
    .from("exam_results")
    .select("*, exams(title, total_marks), students(permanent_student_id, profiles(full_name))")
    .order("published_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Result System</h2>
          <p className="text-gray-500">Grade calculation and result publishing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upload Marks Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">📊 Enter Student Marks</h3>
          <form action={publishResult} className="space-y-4">
            <select name="examId" required className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm">
              <option value="">Select Exam...</option>
              {exams?.map(e => <option key={e.id} value={e.id}>{e.title} ({e.classes?.name})</option>)}
            </select>
            
            <select name="studentId" required className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm">
              <option value="">Select Student...</option>
              {students?.map(s => <option key={s.id} value={s.id}>{s.profiles?.full_name} ({s.permanent_student_id})</option>)}
            </select>

            <div className="flex gap-2 items-center">
              <input type="number" name="marksObtained" placeholder="Marks Obtained" required className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
              <span className="text-gray-400 font-bold">/</span>
              {/* Note: In a real app, total marks should be fetched dynamically based on the selected exam. For now we use a default hidden input or user input */}
              <input type="number" name="totalMarks" placeholder="Total Marks" defaultValue="100" required className="w-24 px-4 py-2 border rounded-lg bg-gray-50 text-sm" />
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition">
              Publish Result
            </button>
          </form>
        </div>

        {/* Results Data Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto p-4">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 rounded-lg">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg font-bold text-gray-600">Student</th>
                  <th className="px-4 py-3 font-bold text-gray-600">Exam Name</th>
                  <th className="px-4 py-3 font-bold text-gray-600">Marks</th>
                  <th className="px-4 py-3 rounded-r-lg font-bold text-gray-600">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {results?.map((res) => (
                  <tr key={res.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-4 py-4">
                      <div className="font-bold text-gray-900">{res.students?.profiles?.full_name}</div>
                      <div className="text-xs text-gray-500 font-mono">{res.students?.permanent_student_id}</div>
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-700">{res.exams?.title}</td>
                    <td className="px-4 py-4 font-bold text-gray-900">
                      {res.marks_obtained} <span className="text-gray-400 font-normal text-xs">/ {res.exams?.total_marks}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        res.grade.includes('A') ? 'bg-green-100 text-green-800' :
                        res.grade === 'F' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {res.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}