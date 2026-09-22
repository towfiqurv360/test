import { createClient } from "@/lib/supabase/server";
import { createExam } from "@/app/actions/examEngine";

export default async function ExamsPage() {
  const supabase = await createClient();

  const { data: classes } = await supabase.from("classes").select("id, name");
  const { data: subjects } = await supabase.from("subjects").select("id, name");
  
  const { data: exams } = await supabase
    .from("exams")
    .select("*, classes(name), subjects(name)")
    .order("exam_date", { ascending: true });

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-700 p-8 rounded-2xl shadow-lg text-white">
        <h2 className="text-3xl font-bold">Exam Center</h2>
        <p className="mt-2 text-teal-100 opacity-90">Schedule upcoming exams and manage assessments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Exam Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">📝 Schedule New Exam</h3>
          <form action={createExam} className="space-y-4">
            <input type="text" name="title" placeholder="Exam Title (e.g. Mid Term)" required className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-teal-500" />
            
            <div className="grid grid-cols-2 gap-3">
              <select name="classId" required className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm">
                <option value="">Select Class</option>
                {classes?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <select name="subjectId" required className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm">
                <option value="">Select Subject</option>
                {subjects?.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 ml-1">Exam Date</label>
                <input type="date" name="examDate" required className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-500 ml-1">Type</label>
                <select name="examType" required className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm">
                  <option value="Written">Written</option>
                  <option value="MCQ">MCQ</option>
                  <option value="Practical">Practical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 ml-1">Total Marks</label>
              <input type="number" name="totalMarks" defaultValue="100" required className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
            </div>

            <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 transition">
              Create Exam
            </button>
          </form>
        </div>

        {/* Scheduled Exams List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-gray-800 text-lg mb-2">Upcoming & Past Exams</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exams?.map(exam => (
              <div key={exam.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-md">
                    {exam.exam_type} • {exam.total_marks} Marks
                  </span>
                  <span className="text-xs font-semibold text-gray-500">
                    {new Date(exam.exam_date).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-gray-800">{exam.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{exam.classes?.name} — {exam.subjects?.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}