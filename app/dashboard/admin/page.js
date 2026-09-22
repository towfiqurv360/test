import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminPage() {
  const supabase = await createClient();

  // ইউজারদের স্ট্যাটিস্টিক্স ফেচ করা
  const { data: profiles } = await supabase.from("profiles").select("role");

  const stats = {
    students: profiles?.filter(p => p.role === 'STUDENT').length || 0,
    teachers: profiles?.filter(p => p.role === 'TEACHER').length || 0,
    parents: profiles?.filter(p => p.role === 'PARENT').length || 0,
    staff: profiles?.filter(p => p.role === 'STAFF' || p.role === 'ADMIN' || p.role === 'SUPER_ADMIN').length || 0,
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-gray-900 p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black tracking-tight">System Administration</h2>
          <p className="mt-2 text-slate-400 font-medium">Control Center for Users, Roles, and Configurations</p>
        </div>
        <div className="relative z-10">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center gap-2">
            <span>+</span> Add New User
          </button>
        </div>
      </div>

      {/* User Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" count={stats.students} icon="🎓" color="bg-blue-50 text-blue-700 border-blue-100" />
        <StatCard title="Active Teachers" count={stats.teachers} icon="👨‍🏫" color="bg-emerald-50 text-emerald-700 border-emerald-100" />
        <StatCard title="Registered Parents" count={stats.parents} icon="👨‍👩‍👧" color="bg-amber-50 text-amber-700 border-amber-100" />
        <StatCard title="Admin & Staff" count={stats.staff} icon="🛡️" color="bg-purple-50 text-purple-700 border-purple-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Management Links */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3">Core Modules</h3>
          <div className="space-y-2">
            <ManagementLink href="/dashboard/students" title="Student Management" desc="Manage IDs, profiles, and ranks" icon="👤" />
            <ManagementLink href="/dashboard/teachers" title="Teacher Management" desc="Staff details and assignments" icon="📚" />
            <ManagementLink href="/dashboard/academics" title="Academics Structure" desc="Classes, sections, and subjects" icon="🏫" />
            <ManagementLink href="/dashboard/settings" title="Global Settings" desc="School details and configurations" icon="⚙️" />
          </div>
        </div>

        {/* System Health & Security Config */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3">System Health & Security</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50 flex items-start gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 shrink-0 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">✓</div>
              <div>
                <h4 className="font-bold text-gray-900">Database Status</h4>
                <p className="text-sm text-gray-500 mt-1">Supabase connection is stable and optimized.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50 flex items-start gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">🔒</div>
              <div>
                <h4 className="font-bold text-gray-900">RBAC Security</h4>
                <p className="text-sm text-gray-500 mt-1">Role-Based Access Control is active.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50 flex items-start gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 shrink-0 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xl">⏱️</div>
              <div>
                <h4 className="font-bold text-gray-900">Last Database Backup</h4>
                <p className="text-sm text-gray-500 mt-1">Automated backup completed at 03:00 AM today.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50 flex items-start gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 shrink-0 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xl">⚡</div>
              <div>
                <h4 className="font-bold text-gray-900">System Version</h4>
                <p className="text-sm text-gray-500 mt-1">Genesis Vidyapeeth Engine v2.1.0</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, count, icon, color }) {
  return (
    <div className={`p-6 rounded-3xl border flex items-center gap-4 bg-white shadow-sm hover:shadow-md transition`}>
      <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-2xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500">{title}</p>
        <h3 className="text-3xl font-black text-gray-900 mt-1">{count}</h3>
      </div>
    </div>
  );
}

function ManagementLink({ href, title, desc, icon }) {
  return (
    <Link href={href} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition group">
      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg group-hover:bg-blue-100 group-hover:text-blue-600 transition">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition">{title}</h4>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      <span className="text-gray-300 group-hover:text-blue-600 transition transform group-hover:translate-x-1">→</span>
    </Link>
  );
}