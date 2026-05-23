"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Briefcase, Users, Image as ImageIcon, Save } from "lucide-react";

export default function PortfolioAdmin() {
  const [projects, setProjects] = useState<any[]>([]);
  const [talent, setTalent] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("projects");

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    const { data: p } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false });
    const { data: t } = await supabase.from('talent_hub').select('*').order('created_at', { ascending: false });
    if (p) setProjects(p);
    if (t) setTalent(t);
  }

  async function deleteItem(table: string, id: number) {
    if(confirm("Are you sure?")) {
      await supabase.from(table).delete().eq('id', id);
      fetchData();
    }
  }

  return (
    <div className="space-y-8 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Showcase <span className="text-gold">Manager</span></h1>
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
          <button onClick={() => setActiveTab("projects")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'projects' ? 'bg-gold text-black' : 'text-muted-foreground'}`}>Projects</button>
          <button onClick={() => setActiveTab("talent")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'talent' ? 'bg-blue-500 text-white' : 'text-muted-foreground'}`}>Talent Hub</button>
        </div>
      </div>

      {activeTab === "projects" ? (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
             {/* Add Project Card Placeholder */}
             <div className="glass p-8 rounded-3xl border-dashed border-gold/30 flex flex-col items-center justify-center gap-4 hover:bg-gold/5 transition-all cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform"><Plus/></div>
                <p className="font-bold text-gold">Add New Project</p>
             </div>

             {projects.map(proj => (
               <div key={proj.id} className="glass rounded-3xl overflow-hidden border-white/5 group">
                 <div className="h-40 bg-white/5 relative">
                   {proj.image_url ? <img src={proj.image_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground"><ImageIcon/></div>}
                   <button onClick={() => deleteItem('portfolio', proj.id)} className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                 </div>
                 <div className="p-5">
                   <h3 className="font-bold">{proj.title}</h3>
                   <p className="text-xs text-gold uppercase font-bold mt-1">{proj.category}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">
            {/* Add Talent Placeholder */}
            <div className="glass p-6 rounded-[2rem] border-dashed border-blue-500/30 flex flex-col items-center justify-center gap-4 hover:bg-blue-500/5 transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400"><Plus/></div>
                <p className="font-bold text-blue-400 text-sm">Add Team/Intern</p>
            </div>

            {talent.map(t => (
              <div key={t.id} className="glass p-5 rounded-[2rem] border-white/5 text-center relative group">
                <button onClick={() => deleteItem('talent_hub', t.id)} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                <div className="w-20 h-20 rounded-full bg-white/5 mx-auto mb-4 border-2 border-gold/20 overflow-hidden">
                  <img src={t.image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name}`} />
                </div>
                <h3 className="font-bold text-sm">{t.name}</h3>
                <p className="text-[10px] text-muted-foreground">{t.role}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}