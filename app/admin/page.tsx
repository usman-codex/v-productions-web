"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Users, MessageSquare, Briefcase, FileText, 
  Loader2, Clock, ChevronRight, ArrowUpRight 
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ leads: 0, applicants: 0, projects: 0, blogs: 0 });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [recentApps, setRecentApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    try {
     
      const { count: lCount } = await supabase.from('leads').select('*', { count: 'exact', head: true });
      const { count: aCount } = await supabase.from('applicants').select('*', { count: 'exact', head: true });
      const { count: pCount } = await supabase.from('portfolio').select('*', { count: 'exact', head: true });
      const { count: bCount } = await supabase.from('blogs').select('*', { count: 'exact', head: true });

      setStats({ leads: lCount || 0, applicants: aCount || 0, projects: pCount || 0, blogs: bCount || 0 });

      const { data: leads } = await supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(15);
      const { data: apps } = await supabase.from('applicants').select('*').order('created_at', { ascending: false }).limit(15);

      setRecentLeads(leads || []);
      setRecentApps(apps || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center text-gold">
      <Loader2 className="animate-spin mb-4" size={40} />
      <p className="text-xs font-bold uppercase tracking-widest opacity-60">Syncing System Data...</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-fade-in pb-10">
      <div className="flex justify-between items-end px-2">
        <div>
            <h1 className="text-4xl font-black text-white tracking-tighter">Dashboard <span className="text-gold">Overview</span></h1>
            <p className="text-gray-500 font-medium mt-1">Real-time system intel and insights.</p>
        </div>
        <div className="text-right">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">System Health</p>
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-500 text-[10px] font-black uppercase tracking-tighter">Operational</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Inquiries", value: stats.leads, icon: MessageSquare, color: "text-gold" },
          { label: "Intern Apps", value: stats.applicants, icon: Users, color: "text-blue-400" },
          { label: "Showcase Projects", value: stats.projects, icon: Briefcase, color: "text-purple-400" },
          { label: "Active Blogs", value: stats.blogs, icon: FileText, color: "text-green-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0d0d1a] p-8 rounded-[2.5rem] border border-white/5 shadow-xl hover:border-gold/20 transition-all group">
            <div className={`w-14 h-14 rounded-2xl bg-white/5 ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon size={28} />
            </div>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-4xl font-black mt-1 text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        <div className="bg-[#0d0d1a] p-8 rounded-[3rem] border border-white/5 shadow-2xl flex flex-col h-[520px]">
          <div className="flex justify-between items-center mb-8 px-2">
             <h2 className="text-xl font-bold flex items-center gap-3"><Users className="text-blue-400" size={24}/> Recent <span className="text-blue-400">Applicants</span></h2>
             <Link href="/admin/internships" className="text-[10px] font-black uppercase text-gray-500 hover:text-gold tracking-widest flex items-center gap-1">View All <ChevronRight size={12}/></Link>
          </div>
          
          <div className="space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {recentApps.map((app, i) => (
              <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/5 flex justify-between items-center group hover:bg-white/[0.08] transition-all">
                <div>
                    <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{app.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-black mt-1 tracking-tighter">Applied: <span className="text-blue-400/80">{app.role_applied}</span></p>
                </div>
                <div className="text-right">
                    <p className="text-[9px] font-black text-gray-600 mb-1">{new Date(app.created_at).toLocaleDateString()}</p>
                    <Link href="/admin/internships" className="p-2 bg-blue-500/10 rounded-lg text-blue-400 inline-block opacity-0 group-hover:opacity-100 transition-all"><ArrowUpRight size={14}/></Link>
                </div>
              </div>
            ))}
            {recentApps.length === 0 && <p className="text-gray-600 italic py-10 text-center text-sm">No recent applications.</p>}
          </div>
        </div>

        <div className="bg-[#0d0d1a] p-8 rounded-[3rem] border border-white/5 shadow-2xl flex flex-col h-[520px]">
          <div className="flex justify-between items-center mb-8 px-2">
             <h2 className="text-xl font-bold flex items-center gap-3"><MessageSquare className="text-gold" size={24}/> Recent <span className="text-gold">Leads</span></h2>
             <Link href="/admin/leads" className="text-[10px] font-black uppercase text-gray-500 hover:text-gold tracking-widest flex items-center gap-1">Open Inbox <ChevronRight size={12}/></Link>
          </div>
          
          <div className="space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {recentLeads.map((lead, i) => (
              <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/5 flex justify-between items-center group hover:bg-white/[0.08] transition-all">
                <div>
                    <p className="font-bold text-white group-hover:text-gold transition-colors">{lead.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-black mt-1 tracking-tighter">Service: <span className="text-gold/80">{lead.service}</span></p>
                </div>
                <div className="text-right">
                    <p className="text-[9px] font-black text-gray-600 mb-1">{new Date(lead.created_at).toLocaleDateString()}</p>
                    <Link href="/admin/leads" className="p-2 bg-gold/10 rounded-lg text-gold inline-block opacity-0 group-hover:opacity-100 transition-all"><ArrowUpRight size={14}/></Link>
                </div>
              </div>
            ))}
            {recentLeads.length === 0 && <p className="text-gray-600 italic py-10 text-center text-sm">No recent inquiries.</p>}
          </div>
        </div>

      </div>

      <div className="flex justify-center pt-10">
          <button onClick={fetchDashboardData} className="px-10 py-4 border border-white/10 rounded-full text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] hover:border-gold hover:text-gold transition-all flex items-center gap-3 shadow-lg">
              <Clock size={14}/> Sync System Analytics
          </button>
      </div>
    </div>
  );
}