"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, FileText, Users, MessageSquare, 
  Settings, Image as ImageIcon, GraduationCap, Briefcase, Menu, X 
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: MessageSquare, label: "Leads/Inbox", href: "/admin/leads" },
  { icon: GraduationCap, label: "Internships", href: "/admin/internships" },
  { icon: FileText, label: "Blogs & SEO", href: "/admin/blogs" },
  { icon: Briefcase, label: "Portfolio", href: "/admin/portfolio" },
  { icon: ImageIcon, label: "Hero & UI CMS", href: "/admin/ui-settings" },
  { icon: Settings, label: "Global Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-[#16162d] border-r border-white/5 flex flex-col`}>
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && <span className="font-bold text-xl text-gold">V-ADMIN</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gold">
            {sidebarOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gold/10 hover:text-gold transition-all group">
              <item.icon size={22} />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-white/5 bg-[#16162d]/50 backdrop-blur-md flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold">System Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Admin: V-Productions</span>
            <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center text-gold font-bold">V</div>
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}