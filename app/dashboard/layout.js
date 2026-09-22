import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import SidebarNav from "@/components/SidebarNav";

export default async function DashboardLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="campus-shell">
      <aside className="sidebar">
        <Link href="/dashboard" className="brand-block">
          <img src="/logo.svg" alt="" style={{width:39,height:39}} />
          <div><strong>Genesis</strong><small>Vidyapeeth</small></div>
        </Link>
        <div className="session-card"><span>ACADEMIC SESSION</span><b>2026</b></div>
        <SidebarNav />
        <div className="sidebar-bottom">
          <div className="support-dot"><i /> Systems operational</div>
          <div className="user-chip">
            <span>{user?.email?.slice(0,1).toUpperCase() || "A"}</span>
            <div><b>{user?.email || "Admin"}</b><small>Authenticated</small></div>
          </div>
        </div>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>Genesis Vidyapeeth <b>/</b> Digital Campus</div>
          <div className="top-status">● Secure session</div>
        </header>
        {children}
      </main>
    </div>
  );
}
