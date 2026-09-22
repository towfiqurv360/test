import { createClient } from "@/lib/supabase/server";

export default async function CCTVPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Access Check: শুধুমাত্র ADMIN রা এই পেজ দেখতে পারবে (Middleware দিয়েও করা যায়)
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  
  if (profile?.role !== 'ADMIN' && profile?.role !== 'SUPER_ADMIN') {
    return (
      <div className="bg-red-50 p-8 rounded-3xl text-center border border-red-200">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="text-red-500 mt-2">You do not have clearance to view security feeds.</p>
      </div>
    );
  }

  const cameras = [
    { name: "Main Gate", status: "Online" },
    { name: "Playground", status: "Online" },
    { name: "Corridor A", status: "Online" },
    { name: "Library", status: "Offline" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-2xl shadow-sm flex justify-between items-center text-white">
        <div>
          <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            Live Security Feed
          </h2>
          <p className="text-slate-400 text-sm mt-1">All access is logged and monitored.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cameras.map((cam, idx) => (
          <div key={idx} className="bg-black rounded-2xl overflow-hidden relative aspect-video border border-slate-800">
            {/* Fake Stream UI */}
            {cam.status === "Online" ? (
              <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                <span className="text-slate-600">Camera Feed Loading...</span>
              </div>
            ) : (
              <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                <span className="text-red-900 font-bold">SIGNAL LOST</span>
              </div>
            )}
            
            {/* Overlays */}
            <div className="absolute top-4 left-4 flex flex-col gap-1">
              <span className="bg-black/50 text-white text-xs px-2 py-1 rounded font-mono backdrop-blur-sm">
                {cam.name}
              </span>
              <span className="text-white text-[10px] font-mono drop-shadow-md">
                {new Date().toLocaleString()}
              </span>
            </div>
            
            {cam.status === "Online" && (
              <div className="absolute top-4 right-4">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wider animate-pulse">
                  REC
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}