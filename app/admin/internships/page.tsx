"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, Trash2, Edit3, Power, History, Briefcase, Clock, 
  Loader2, Users, Mail, Phone, Download, CheckCircle, XCircle, Search, RefreshCcw
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function InternshipAdmin() {
  const [internships, setInternships] = useState<any[]>([]);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [historyLogs, setHistoryLogs] = useState<any[]>([]);
  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const { data: jobs } = await supabase.from('internships').select('*').order('created_at', { ascending: false });
      const { data: apps } = await supabase.from('applicants').select('*').order('created_at', { ascending: false });
      const { data: settings } = await supabase.from('global_settings').select('*').eq('key', 'internship_status').single();
      const { data: logs } = await supabase.from('internship_history').select('*').order('created_at', { ascending: false }).limit(10);

      if (jobs) setInternships(jobs);
      if (apps) setApplicants(apps);
      if (settings) setIsProgramOpen(settings.value === 'open');
      if (logs) setHistoryLogs(logs);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  }

  async function toggleStatus() {
    setActionLoading(true);
    const newStatus = isProgramOpen ? 'closed' : 'open';
    try {
      await supabase.from('global_settings').upsert({ key: 'internship_status', value: newStatus });
      await supabase.from('internship_history').insert([{ 
        action: `SYSTEM ${newStatus.toUpperCase()}`, 
        details: `Applications manually ${newStatus} by admin.` 
      }]);
      setIsProgramOpen(!isProgramOpen);
      fetchData();
    } catch (err) { alert("Update failed"); } 
    finally { setActionLoading(false); }
  }

  async function deleteJob(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    await supabase.from('internships').delete().eq('id', id);
    await supabase.from('internship_history').insert([{ action: `DELETED`, details: `Removed role: ${title}` }]);
    fetchData();
  }

  async function updateAppStatus(id: string, status: string) {
    await supabase.from('applicants').update({ status }).eq('id', id);
    fetchData();
  }

  // UPDATED SEARCH LOGIC: Search by Name, Email, or WhatsApp
  const filteredApplicants = applicants.filter(a => 
    a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.whatsapp?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex h-screen items-center justify-center bg-[#060610]"><Loader2 className="animate-spin text-gold" size={40}/></div>;

  return (
    <div className="p-4 md:p-10 space-y-10 bg-[#060610] min-h-screen text-white overflow-x-hidden">
      
      {/* 1. TOP BAR CONTROL */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-[#0d0d1a] p-8 rounded-[2.5rem] border border-white/5 gap-6 shadow-2xl">
        <div className="flex items-center gap-6">
            <div className="bg-gold/10 p-4 rounded-2xl"><Briefcase className="text-gold" size={32}/></div>
            <div>
                <h1 className="text-3xl font-bold">System <span className="text-gold">Dashboard</span></h1>
                <p className={`text-sm font-bold flex items-center gap-2 mt-1 ${isProgramOpen ? 'text-green-400' : 'text-red-400'}`}>
                   <span className={`w-2 h-2 rounded-full ${isProgramOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                   Web Status: {isProgramOpen ? 'ONLINE' : 'OFFLINE'}
                </p>
            </div>
        </div>
        <div className="flex gap-4">
            <button onClick={toggleStatus} disabled={actionLoading} className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all ${isProgramOpen ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white' : 'bg-green-600 text-white shadow-lg'}`}>
                {actionLoading ? <Loader2 className="animate-spin"/> : <Power size={20}/>} {isProgramOpen ? 'Stop Hiring' : 'Start Hiring'}
            </button>
            <Link href="/admin/internships/new" className="bg-gold text-black px-8 py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all">+ Add Role</Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
            {/* Active Roles */}
            <section className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2 px-2"><Briefcase className="text-gold" size={22}/> Published Positions ({internships.length})</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {internships.map(job => (
                        <div key={job.id} className="bg-[#0d0d1a] p-6 rounded-[2rem] border border-white/5 flex justify-between items-center hover:border-white/10 transition-all">
                            <div><h3 className="font-bold">{job.title}</h3><p className="text-xs text-gray-500 mt-1">{job.duration}</p></div>
                            <div className="flex gap-2">
                                <Link href={`/admin/internships/edit/${job.id}`} className="p-3 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all"><Edit3 size={18}/></Link>
                                <button onClick={() => deleteJob(job.id, job.title)} className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18}/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Candidates Section */}
            <section className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
                    <h2 className="text-xl font-bold flex items-center gap-2"><Users className="text-blue-400" size={22}/> Recent Applicants</h2>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16}/>
                        <input 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            placeholder="Search name, email, or number..." 
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-gold outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Vertical & Horizontal Scroll Container */}
                <div className="bg-[#0d0d1a] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
                    <div className="max-h-[550px] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-white/10">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead className="bg-white/5 text-gold text-[10px] uppercase tracking-widest font-black sticky top-0 z-20 backdrop-blur-md">
                                <tr>
                                    <th className="p-6">Applicant Info</th>
                                    <th className="p-6">Applied Role</th>
                                    <th className="p-6">Status</th>
                                    <th className="p-6 text-center">CV / Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredApplicants.map(app => (
                                    <tr key={app.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-6">
                                            <p className="font-bold text-white text-base">{app.name}</p>
                                            <div className="flex flex-col gap-1 mt-1 opacity-50 font-medium">
                                                <span className="text-[10px] flex items-center gap-1"><Mail size={10}/> {app.email}</span>
                                                <span className="text-[10px] flex items-center gap-1"><Phone size={10}/> {app.whatsapp}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-sm font-bold text-slate-300">{app.role_applied}</td>
                                        <td className="p-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${app.status === 'pending' ? 'bg-orange-500/10 text-orange-400' : app.status === 'approved' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                                {app.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex justify-center gap-3">
                                                {app.cv_url && <a href={app.cv_url} title="Download CV" target="_blank" className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all"><Download size={18}/></a>}
                                                <button onClick={() => updateAppStatus(app.id, 'approved')} title="Approve" className="p-2.5 bg-green-500/10 text-green-400 rounded-xl hover:bg-green-600 hover:text-white transition-all"><CheckCircle size={18}/></button>
                                                <button onClick={() => updateAppStatus(app.id, 'rejected')} title="Reject" className="p-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition-all"><XCircle size={18}/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredApplicants.length === 0 && <div className="p-20 text-center text-gray-500 italic">No applicants found.</div>}
                    </div>
                </div>
            </section>
        </div>

        {/* System Logs & Stats Side (Right) */}
        <section className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 px-2"><History className="text-purple-400" size={22}/> System History</h2>
            <div className="bg-[#0d0d1a] p-8 rounded-[2.5rem] border border-white/5 space-y-10 relative max-h-[700px] overflow-y-auto scrollbar-hide">
                {historyLogs.map((log, i) => (
                    <div key={i} className="flex gap-5 items-start relative">
                        {i !== historyLogs.length - 1 && <div className="absolute left-[11px] top-8 w-[2px] h-full bg-white/5"></div>}
                        <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${log.action.includes('SYSTEM') ? 'bg-green-500/20 text-green-500' : 'bg-purple-500/20 text-purple-400'}`}>
                            <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                        </div>
                        <div>
                            <p className="text-sm font-black text-white uppercase tracking-wider">{log.action}</p>
                            <p className="text-xs text-gray-500 mt-2 leading-relaxed font-medium">{log.details}</p>
                            <p className="text-[10px] text-gold font-black mt-3 opacity-80">{new Date(log.created_at).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="bg-gradient-to-br from-indigo-500/10 to-transparent p-8 rounded-[2.5rem] border border-white/5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5 text-center">
                        <p className="text-2xl font-black text-white">{internships.length}</p>
                        <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest mt-1">Live Roles</p>
                    </div>
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5 text-center">
                        <p className="text-2xl font-black text-white">{applicants.length}</p>
                        <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest mt-1">Total Apps</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}