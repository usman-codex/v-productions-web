"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  LayoutDashboard, FileText, Users, MessageSquare, 
  Image as ImageIcon, GraduationCap, Briefcase, Menu, X, BookOpen, LogOut, Loader2 
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: MessageSquare, label: "Leads/Inbox", href: "/admin/leads" },
  { icon: GraduationCap, label: "Internships", href: "/admin/internships" },
  { icon: BookOpen, label: "Training", href: "/admin/training" },
  { icon: FileText, label: "Blogs", href: "/admin/blogs" },
  { icon: Briefcase, label: "Portfolio", href: "/admin/portfolio" },
  { icon: ImageIcon, label: "Hero & UI CMS", href: "/admin/ui-settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login"); // Agar login nahi hai toh nikaal do
      } else {
        setUser(user);
      }
      setCheckingAuth(false);
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (checkingAuth) return (
    <div className="h-screen bg-[#060610] flex flex-col items-center justify-center text-gold">
      <Loader2 className="animate-spin mb-4" size={40} />
      <p className="text-xs font-bold uppercase tracking-widest">Verifying Identity...</p>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a1a] text-white">
      {/* FIXED SIDEBAR */}
      <aside className={cn("bg-[#16162d] border-r border-white/5 flex flex-col transition-all duration-300 ease-in-out z-50", sidebarOpen ? "w-64" : "w-20")}>
        <div className="p-6 flex items-center justify-between h-20 shrink-0">
          {sidebarOpen && <span className="font-bold text-xl text-gold tracking-tighter italic">V-ADMIN</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gold hover:bg-white/5 p-1 rounded-lg">
            {sidebarOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto py-4 scrollbar-hide">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gold/10 hover:text-gold transition-all group whitespace-nowrap">
              <item.icon size={22} className="shrink-0" />
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* LOGOUT BUTTON AT BOTTOM */}
        <div className="p-4 border-t border-white/5">
            <button 
              onClick={handleLogout}
              className={cn("flex items-center gap-4 w-full p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all", !sidebarOpen && "justify-center")}
            >
                <LogOut size={22} />
                {sidebarOpen && <span className="font-bold text-sm">Logout</span>}
            </button>
        </div>
      </aside>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-white/5 bg-[#16162d]/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0 sticky top-0 z-40">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">System Management</h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Active Session</p>
                <p className="text-xs font-black text-gold truncate max-w-[150px]">{user?.email}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-black font-black shadow-lg">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}