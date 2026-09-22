"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNav({ role }) {
  const pathname = usePathname();

  const links = {
    STUDENT: [
      { name: "Overview", path: "/dashboard" },
      { name: "Homework", path: "/dashboard/homework" },
      { name: "Results", path: "/dashboard/results" },
      { name: "AI Support", path: "/dashboard/ai" },
    ],
    TEACHER: [
      { name: "Overview", path: "/dashboard" },
      { name: "Students", path: "/dashboard/students" },
      { name: "Attendance", path: "/dashboard/attendance" },
      { name: "Routine", path: "/dashboard/routine" },
    ],
    ADMIN: [
      { name: "Overview", path: "/dashboard" },
      { name: "User Management", path: "/dashboard/admin" },
      { name: "Admissions", path: "/dashboard/admissions" },
      { name: "Settings", path: "/dashboard/settings" },
    ],
    PARENT: [
      { name: "Overview", path: "/dashboard" },
      { name: "Child Progress", path: "/dashboard/parents" },
      { name: "Fees & Payments", path: "/dashboard/fees" },
    ]
  };

  const navLinks = links[role] || links.STUDENT;

  return (
    <nav className="space-y-1">
      {navLinks.map((link) => {
        const isActive = pathname === link.path;
        return (
          <Link
            key={link.name}
            href={link.path}
            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive 
                ? "bg-blue-600 text-white" 
                : "text-gray-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}