import { createClient } from "@/lib/supabase/server";
import { createHomework } from "@/app/actions/questEngine";

export default async function HomeworkPage() {
  const supabase = await createClient();

  const { data: classes } = await supabase.from("classes").select("id, name");
  const { data: subjects } = await supabase.from("subjects").select("id, name");
  
  const { data: homeworks } = await supabase
    .from("homeworks")
    .select(`*, classes(name), subjects(name)`)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl shadow-lg text-white">
        <h2 className="text-3xl font-bold">Quest Board (Homework)</h2>
        <p className="mt-2 text-blue-100 opacity-90">Assign tasks, reward XP, and track student journeys.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Quest / Homework */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            ✨ Create New Quest
          </h3>
          <form action={createHomework} className="space-y-4">
            <input type="text" name="title" placeholder="Quest Title (e.g., Algebra Mastery)" required className="w-full px-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" />
            <textarea name="description" rows="3" placeholder="Mission details..." required className="w-full px-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500"></textarea>
            
            <div className="grid grid-cols-2 gap-3">
              <select name="classId" required className="w-full px-4 py-2 bg-gray-50 border-none rounded-xl text-sm">
                <option value="">Select Class</option>
                {classes?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <select name="subjectId" required className="w-full px-4 py-2 bg-gray-50 border-none rounded-xl text-sm">
                <option value="">Select Subject</option>
                {subjects?.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 ml-1">XP Reward</label>
                <input type="number" name="xpReward" defaultValue="50" className="w-full px-4 py-2 bg-amber-50 text-amber-700 font-bold border-none rounded-xl" />
              </div>
              <div>
                <label className="text-xs text-gray-500 ml-1">Deadline</label>
                <input type="date" name="deadline" required className="w-full px-4 py-2 bg-gray-50 border-none rounded-xl text-sm" />
              </div>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              Publish Quest
            </button>
          </form>
        </div>

        {/* Active Quests */}
        <div className="lg:col-span-2 space-y-4">
          {homeworks?.map(hw => (
            <div key={hw.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-colors group">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    {hw.classes?.name} • {hw.subjects?.name}
                  </span>
                  <h4 className="text-xl font-bold text-gray-800 mt-3 group-hover:text-indigo-600 transition-colors">{hw.title}</h4>
                  <p className="text-gray-500 text-sm mt-2">{hw.description}</p>
                </div>
                <div className="text-center bg-amber-50 p-3 rounded-xl border border-amber-100">
                  <span className="block text-2xl font-black text-amber-500">+{hw.xp_reward}</span>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">XP</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-sm">
                <span className="text-gray-500">Deadline: {new Date(hw.deadline).toLocaleDateString()}</span>
                <button className="text-indigo-600 font-semibold hover:underline">View Submissions &rarr;</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}