"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, Trash2, Edit3, Power, History, Briefcase, Clock, 
  Loader2, AlertCircle, Users, Mail, Phone, Download, 
  CheckCircle, XCircle, Search, RefreshCcw
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

  const filteredApplicants = applicants.filter(a => 
    a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.whatsapp?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex h-screen items-center justify-center bg-[#060610]"><Loader2 className="animate-spin text-gold" size={40}/></div>;

  return (
    <div className="p-4 md:p-10 space-y-10 bg-[#060610] min-h-screen text-white overflow-x-hidden pb-20">
      
      {/* 1. TOP BAR */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-[#0d0d1a] p-8 rounded-[2.5rem] border border-white/5 gap-6 shadow-2xl">
        <div className="flex items-center gap-6">
            <div className="bg-gold/10 p-4 rounded-2xl"><Briefcase className="text-gold" size={32}/></div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Internship <span className="text-gold">Admin</span></h1>
                <p className={`text-xs font-bold flex items-center gap-2 mt-1 ${isProgramOpen ? 'text-green-400' : 'text-red-400'}`}>
                   <span className={`w-2 h-2 rounded-full ${isProgramOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                   STATUS: {isProgramOpen ? 'LIVE' : 'OFFLINE'}
                </p>
            </div>
        </div>
        <div className="flex gap-4">
            <button onClick={toggleStatus} disabled={actionLoading} className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${isProgramOpen ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white' : 'bg-green-600 text-white shadow-lg'}`}>
                {actionLoading ? <Loader2 className="animate-spin" size={18}/> : <Power size={18}/>} {isProgramOpen ? 'Stop' : 'Start'} Hiring
            </button>
            <Link href="/admin/internships/new" className="bg-gold text-black px-6 py-3 rounded-xl font-bold shadow-xl active:scale-95 transition-all text-sm">+ Add Role</Link>
        </div>
      </div>

      {/* 2. TOP GRID */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2 px-2 text-gold"><Briefcase size={20}/> Positions ({internships.length})</h2>
            <div className="grid md:grid-cols-2 gap-4">
                {internships.map(job => (
                    <div key={job.id} className="bg-[#0d0d1a] p-5 rounded-2xl border border-white/5 flex justify-between items-center hover:border-white/10 transition-all">
                        <div><h3 className="font-bold text-sm">{job.title}</h3><p className="text-[10px] text-gray-500">{job.duration}</p></div>
                        <div className="flex gap-2">
                            <Link href={`/admin/internships/edit/${job.id}`} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white"><Edit3 size={14}/></Link>
                            <button onClick={() => deleteJob(job.id, job.title)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white"><Trash2 size={14}/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2 px-2 text-purple-400"><History size={20}/> Logs</h2>
            <div className="bg-[#0d0d1a] p-5 rounded-2xl border border-white/5 space-y-4 max-h-[250px] overflow-y-auto scrollbar-hide shadow-xl">
                {historyLogs.map((log, i) => (
                    <div key={i} className="flex gap-3 items-start relative border-l border-white/5 pl-3">
                        <div className="absolute -left-[4.5px] top-1 w-2 h-2 bg-gold rounded-full"></div>
                        <div>
                            <p className="text-[10px] font-bold text-white uppercase">{log.action}</p>
                            <p className="text-[9px] text-gray-500">{new Date(log.created_at).toLocaleTimeString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* 3. RECENT APPLICANTS - COMPACT VERSION */}
      <section className="space-y-6 w-full pt-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
              <div className="flex items-center gap-3">
                <Users className="text-blue-400" size={24}/>
                <h2 className="text-xl font-bold tracking-tight text-white">Recent Applications</h2>
              </div>
              <div className="relative w-full md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16}/>
                  <input 
                      onChange={(e) => setSearchTerm(e.target.value)} 
                      placeholder="Search by Name, Email, Number" 
                      className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-xs focus:border-gold outline-none transition-all shadow-2xl text-white"
                  />
              </div>
          </div>

          <div className="bg-[#0d0d1a] rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden w-full">
              <div className="max-h-[600px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10">
                  <table className="w-full text-left border-collapse">
                      <thead className="bg-white/[0.03] text-gold text-[10px] uppercase tracking-[0.2em] font-black sticky top-0 z-20 backdrop-blur-xl border-b border-white/5">
                          <tr>
                              <th className="p-5">Applicant</th>
                              <th className="p-5">Position</th>
                              <th className="p-5 text-center">Status</th>
                              <th className="p-5 text-center">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                          {filteredApplicants.map(app => (
                              <tr key={app.id} className="hover:bg-white/[0.01] transition-colors group">
                                  <td className="p-5">
                                      <p className="font-bold text-white text-sm group-hover:text-gold transition-colors">{app.name}</p>
                                      <div className="flex flex-col gap-1 mt-1 opacity-60">
                                          <span className="text-[10px] flex items-center gap-2"><Mail size={12}/> {app.email}</span>
                                          <span className="text-[10px] flex items-center gap-2"><Phone size={12}/> {app.whatsapp}</span>
                                      </div>
                                  </td>
                                  <td className="p-5">
                                      <div className="bg-white/5 px-3 py-1 rounded-lg border border-white/5 inline-block text-[11px] font-bold text-slate-400">
                                        {app.role_applied}
                                      </div>
                                  </td>
                                  <td className="p-5 text-center">
                                      <span className={`px-4 py-1 rounded-full text-[9px] font-black tracking-widest border ${app.status === 'pending' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : app.status === 'approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                          {app.status.toUpperCase()}
                                      </span>
                                  </td>
                                  <td className="p-5">
                                      <div className="flex justify-center gap-2">
                                          {app.cv_url && <a href={app.cv_url} title="CV" target="_blank" className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><Download size={16}/></a>}
                                          <button onClick={() => updateAppStatus(app.id, 'approved')} title="Approve" className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-600 hover:text-white transition-all"><CheckCircle size={16}/></button>
                                          <button onClick={() => updateAppStatus(app.id, 'rejected')} title="Reject" className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition-all"><XCircle size={16}/></button>
                                      </div>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
                  {filteredApplicants.length === 0 && <div className="p-20 text-center text-gray-500 italic text-sm">No results.</div>}
              </div>
          </div>
      </section>
    </div>
  );
}