import { createClient } from "@/lib/supabase/server";

export default async function AnalyticsPage() {
  const supabase = await createClient();

  // রিয়েল প্রজেক্টে এগুলো ডেটাবেস থেকে count() করে আনা হবে। আপাতত ডেমো ডেটা:
  const stats = {
    totalStudents: 1240,
    attendanceRate: 92,
    feesCollected: 85,
    topQuests: 1450
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-3xl shadow-xl text-white">
        <h2 className="text-3xl font-bold">School Analytics Overview</h2>
        <p className="mt-2 text-slate-300">Real-time performance and financial metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Cards */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
          <p className="text-sm font-semibold text-gray-500">Total Students</p>
          <h3 className="text-3xl font-black text-gray-800 mt-2">{stats.totalStudents}</h3>
          <p className="text-xs text-green-500 font-bold mt-2">↑ 12% from last year</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-emerald-500">
          <p className="text-sm font-semibold text-gray-500">Today's Attendance</p>
          <h3 className="text-3xl font-black text-gray-800 mt-2">{stats.attendanceRate}%</h3>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${stats.attendanceRate}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-amber-500">
          <p className="text-sm font-semibold text-gray-500">Fees Collection</p>
          <h3 className="text-3xl font-black text-gray-800 mt-2">{stats.feesCollected}%</h3>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${stats.feesCollected}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-purple-500">
          <p className="text-sm font-semibold text-gray-500">Quests Completed</p>
          <h3 className="text-3xl font-black text-gray-800 mt-2">{stats.topQuests}</h3>
          <p className="text-xs text-purple-500 font-bold mt-2">High engagement 🔥</p>
        </div>
      </div>
    </div>
  );
}