import { createClient } from "@/lib/supabase/server";

export default async function QuestsPage() {
  const supabase = await createClient();

  // Leaderboard Fetch: টপ ১০ স্টুডেন্ট
  const { data: leaderboard } = await supabase
    .from("students")
    .select(`
      xp, rank, current_class,
      profiles ( full_name )
    `)
    .order("xp", { ascending: false })
    .limit(10);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-48 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Champions</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-xl">
            Complete quests, earn XP, unlock achievements, and climb the ranks. Your journey to Grandmaster begins here.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Leaderboard */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              🏆 Global Leaderboard
            </h3>
            <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Season 1</span>
          </div>
          
          <div className="divide-y divide-gray-50">
            {leaderboard?.map((student, index) => (
              <div key={index} className={`p-4 flex items-center justify-between transition-colors hover:bg-gray-50 ${index < 3 ? 'bg-amber-50/30' : ''}`}>
                <div className="flex items-center gap-4">
                  {/* Rank Number formatting */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${
                    index === 0 ? 'bg-amber-400 text-white shadow-lg shadow-amber-200' :
                    index === 1 ? 'bg-slate-300 text-white shadow-lg shadow-slate-200' :
                    index === 2 ? 'bg-orange-400 text-white shadow-lg shadow-orange-200' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    #{index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{student.profiles?.full_name}</h4>
                    <p className="text-xs font-semibold text-gray-500">{student.current_class} • {student.rank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block font-black text-indigo-600 text-lg">{student.xp}</span>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current User Stats (Mockup for now, later dynamic based on logged in user) */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-amber-300 to-orange-500 rounded-full p-1 shadow-lg mb-4">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center border-4 border-slate-900">
                  <span className="text-3xl">🐉</span>
                </div>
              </div>
              <h3 className="text-xl font-bold">Your Profile</h3>
              <p className="text-amber-400 font-bold tracking-widest text-sm uppercase mt-1">Apprentice</p>
              
              <div className="mt-6">
                <div className="flex justify-between text-xs font-bold text-indigo-200 mb-2">
                  <span>850 XP</span>
                  <span>1500 XP</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-indigo-950/50 rounded-full h-3 backdrop-blur-sm p-0.5">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full" style={{ width: '56%' }}></div>
                </div>
                <p className="text-xs text-indigo-300 mt-3">650 XP needed for <span className="text-white font-bold">Scholar</span> rank</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-4">🎖️ Recent Badges</h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex flex-col items-center">
                <span className="text-3xl mb-2">🔥</span>
                <span className="text-[10px] font-bold text-gray-500">7-Day Streak</span>
              </div>
              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100 flex flex-col items-center">
                <span className="text-3xl mb-2">🎯</span>
                <span className="text-[10px] font-bold text-amber-700">Perfect Score</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex flex-col items-center opacity-50 grayscale">
                <span className="text-3xl mb-2">⚡</span>
                <span className="text-[10px] font-bold text-gray-400">Fast Learner</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}