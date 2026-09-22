import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800">Welcome, {profile?.full_name}!</h3>
        <p className="text-gray-500 mt-2">
          Logged in as: <span className="font-semibold text-blue-600 px-2 py-1 bg-blue-50 rounded-md">{profile?.role}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-700">Recent Notices</h4>
          <p className="text-sm text-gray-500 mt-2">No new notices for today.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-700">Upcoming Events</h4>
          <p className="text-sm text-gray-500 mt-2">Check calendar for details.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-700">Quick Actions</h4>
          <p className="text-sm text-gray-500 mt-2">Shortcuts will appear here.</p>
        </div>
      </div>
    </div>
  );
}