"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Users, Briefcase, CheckCircle, XCircle, Download, Search, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function InternshipAdmin() {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [activeJobs, setActiveJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search logic

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    const { data: apps } = await supabase.from('applicants').select('*').order('created_at', { ascending: false });
    const { data: jobs } = await supabase.from('internships').select('*').order('created_at', { ascending: false });
    if (apps) setApplicants(apps);
    if (jobs) setActiveJobs(jobs);
  }

  const filteredApplicants = applicants.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function updateStatus(id: number, status: string) {
    await supabase.from('applicants').update({ status }).eq('id', id);
    fetchData();
  }

  return (
    <div className="space-y-10 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Internship <span className="text-gold">Management</span></h1>
        <Link href="/admin/internships/new">
          <button className="bg-gold text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all"><Plus size={20}/> Add Position</button>
        </Link>
      </div>

      {/* Applicant Tracker with Search */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl font-bold flex items-center gap-2"><Users className="text-blue-400"/> Recent Applicants</h2>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18}/>
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 focus:border-gold outline-none transition-all text-sm"
            />
          </div>
        </div>

        <div className="glass rounded-3xl overflow-hidden border-white/5 overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-white/5 text-gold text-xs uppercase p-4">
               <tr>
                 <th className="p-6">Applicant Info</th>
                 <th className="p-6">Position</th>
                 <th className="p-6">Status</th>
                 <th className="p-6 text-center">CV / Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
               {filteredApplicants.map((app) => (
                 <tr key={app.id} className="hover:bg-white/5 transition-all">
                   <td className="p-6">
                     <p className="font-bold text-white text-base">{app.name}</p>
                     <div className="flex flex-col gap-1 mt-1">
                        <span className="text-[11px] text-blue-400 flex items-center gap-1"><Mail size={12}/> {app.email}</span>
                        <span className="text-[11px] text-green-400 flex items-center gap-1"><Phone size={12}/> {app.whatsapp}</span>
                     </div>
                   </td>
                   <td className="p-6 text-sm font-medium">{app.role_applied}</td>
                   <td className="p-6">
                     <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${app.status === 'pending' ? 'bg-orange-500/10 text-orange-400' : app.status === 'approved' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                       {app.status.toUpperCase()}
                     </span>
                   </td>
                   <td className="p-6 flex justify-center gap-3">
                     {app.cv_url && <a href={app.cv_url} target="_blank" className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20"><Download size={18}/></a>}
                     <button onClick={() => updateStatus(app.id, 'approved')} className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-400 hover:text-black"><CheckCircle size={18}/></button>
                     <button onClick={() => updateStatus(app.id, 'rejected')} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white"><XCircle size={18}/></button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
           {filteredApplicants.length === 0 && <p className="p-10 text-center text-muted-foreground italic">No applicants found matching your search.</p>}
        </div>
      </div>
    </div>
  );
}