"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Edit3, Users, Briefcase, Image as ImageIcon, Loader2, X, CheckCircle, Link as LinkIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default function PortfolioAdmin() {
  const [projects, setProjects] = useState<any[]>([]);
  const [talent, setTalent] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("projects");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

 
  const [editingId, setEditingId] = useState<number | null>(null); 
  const [name, setName] = useState(""); 
  const [role, setRole] = useState(""); 
  const [skills, setSkills] = useState(""); 
  const [link, setLink] = useState(""); 
  const [file, setFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    const { data: p } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false });
    const { data: t } = await supabase.from('talent_hub').select('*').order('created_at', { ascending: false });
    if (p) setProjects(p);
    if (t) setTalent(t);
    setLoading(false);
  }

  
  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setName(item.title || item.name);
    setRole(item.category || item.role);
    setLink(item.project_link || item.project || "");
    setExistingImageUrl(item.image_url);
    if (activeTab === "talent") setSkills(item.skills?.join(", ") || "");
    setShowForm(true);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    if (!name || !role) return alert("Required fields missing!");
    if (!editingId && !file) return alert("Please select an image!");

    setIsUploading(true);
    try {
      const bucketName = activeTab === "projects" ? "portfolio" : "talent";
      let finalImageUrl = existingImageUrl;

    
      if (file) {
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const { error: sErr } = await supabase.storage.from(bucketName).upload(fileName, file);
        if (sErr) throw sErr;
        const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(fileName);
        finalImageUrl = urlData.publicUrl;
      }

   
      const payload: any = activeTab === "projects" 
        ? { title: name, category: role, image_url: finalImageUrl, project_link: link }
        : { name, role, image_url: finalImageUrl, skills: skills ? skills.split(",").map(s => s.trim()) : [], project: link };

     
      if (editingId) {
        const { error: dbErr } = await supabase.from(activeTab === "projects" ? "portfolio" : "talent_hub").update(payload).eq('id', editingId);
        if (dbErr) throw dbErr;
        alert("✅ Updated Successfully!");
      } else {
        const { error: dbErr } = await supabase.from(activeTab === "projects" ? "portfolio" : "talent_hub").insert([payload]);
        if (dbErr) throw dbErr;
        alert("🚀 Published Successfully!");
      }

      setShowForm(false); resetForm(); fetchData();
    } catch (err: any) { alert(err.message); } 
    finally { setIsUploading(false); }
  };

  const resetForm = () => { 
    setEditingId(null); setName(""); setRole(""); setSkills(""); setLink(""); setFile(null); setExistingImageUrl(""); 
  };

  async function deleteItem(table: string, id: number, url: string) {
    if (!confirm("Permanently delete?")) return;
    try {
      const bucketName = table === 'portfolio' ? 'portfolio' : 'talent';
      const fileName = url.split('/').pop();
      await supabase.storage.from(bucketName).remove([fileName!]);
      await supabase.from(table).delete().eq('id', id);
      fetchData();
    } catch (err) { alert("Delete failed"); }
  }

  return (
    <div className="p-4 md:p-10 space-y-10 bg-[#060610] min-h-screen text-white overflow-x-hidden">
      
      <div className="flex flex-col md:flex-row justify-between items-center bg-[#0d0d1a] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl gap-6">
        <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white">Showcase <span className="text-gold">Admin</span></h1>
        <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
          <button onClick={() => {setActiveTab("projects"); resetForm();}} className={`px-8 py-3 rounded-xl text-xs font-black transition-all ${activeTab === 'projects' ? 'bg-gold text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}>PROJECTS</button>
          <button onClick={() => {setActiveTab("talent"); resetForm();}} className={`px-8 py-3 rounded-xl text-xs font-black transition-all ${activeTab === 'talent' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>TALENT HUB</button>
        </div>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div onClick={() => { resetForm(); setShowForm(true); }} className="bg-[#0d0d1a] rounded-[2.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center p-12 cursor-pointer hover:border-gold/40 transition-all group min-h-[250px]">
            <Plus className="text-gray-500 group-hover:text-gold mb-3" size={40}/>
            <p className="font-black text-gray-500 group-hover:text-gold uppercase text-[10px] tracking-widest">Add {activeTab}</p>
        </div>

        {activeTab === "projects" ? projects.map(p => (
            <div key={p.id} className="bg-[#0d0d1a] rounded-[2.5rem] overflow-hidden border border-white/5 relative group shadow-xl">
                <img src={p.image_url} className="h-44 w-full object-cover opacity-60 group-hover:opacity-100 transition-all"/>
                <div className="p-5 flex justify-between items-end">
                    <div>
                        <h3 className="font-bold text-sm truncate max-w-[120px]">{p.title}</h3>
                        <p className="text-[10px] text-gold font-bold uppercase">{p.category}</p>
                    </div>
                    
                    <div className="flex gap-2">
                        <button onClick={() => handleEdit(p)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><Edit3 size={14}/></button>
                        <button onClick={() => deleteItem('portfolio', p.id, p.image_url)} className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14}/></button>
                    </div>
                </div>
            </div>
          )) : talent.map(t => (
            <div key={t.id} className="bg-[#0d0d1a] rounded-[2.5rem] p-8 border border-white/5 text-center relative group shadow-xl">
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button onClick={() => handleEdit(t)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-blue-500 hover:text-white transition-all"><Edit3 size={14}/></button>
                    <button onClick={() => deleteItem('talent_hub', t.id, t.image_url)} className="p-2 bg-red-500/20 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14}/></button>
                </div>
                <img src={t.image_url} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gold/20 object-cover shadow-lg"/>
                <h3 className="font-bold text-sm truncate">{t.name}</h3>
                <p className="text-[10px] text-blue-400 font-bold uppercase mt-1">{t.role}</p>
            </div>
          ))
        }
      </div>

      
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xl">
          <form onSubmit={handleUpload} className="bg-[#0d0d1a] w-full max-w-md rounded-[2.5rem] p-6 border border-white/10 space-y-4 shadow-2xl relative overflow-y-auto max-h-[85vh] scrollbar-hide">
            <div className="flex justify-between items-center sticky top-0 bg-[#0d0d1a] z-10 pb-2">
                <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">
                  {editingId ? "Edit" : "New"} {activeTab}
                </h2>
                <button type="button" onClick={() => {setShowForm(false); resetForm();}} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white"><X size={20}/></button>
            </div>
            
            <div className="space-y-4 text-left">
                <div>
                    <label className="text-[9px] text-gray-500 uppercase ml-1">Name / Title</label>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="..." className="w-full bg-white/5 p-3.5 rounded-xl border border-white/5 outline-none focus:border-gold text-sm" required />
                </div>
                <div>
                    <label className="text-[9px] text-gray-500 uppercase ml-1">Role / Category</label>
                    <input value={role} onChange={e => setRole(e.target.value)} placeholder="..." className="w-full bg-white/5 p-3.5 rounded-xl border border-white/5 outline-none focus:border-gold text-sm" required />
                </div>
                {activeTab === "talent" && (
                    <div>
                        <label className="text-[9px] text-gray-500 uppercase ml-1">Expertise (Comma separated)</label>
                        <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="React, Node..." className="w-full bg-white/5 p-3.5 rounded-xl border border-white/5 outline-none focus:border-gold text-sm" />
                    </div>
                )}
                <div>
                    <label className="text-[9px] text-gray-500 uppercase ml-1">URL / Portfolio Link</label>
                    <input value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." className="w-full bg-white/5 p-3.5 rounded-xl border border-white/5 outline-none focus:border-gold text-sm text-blue-400" />
                </div>
                
                <div className="p-6 border-2 border-dashed border-white/5 rounded-2xl bg-white/[0.02] text-center relative group">
                    <input type="file" id="upload" hidden onChange={(e:any) => setFile(e.target.files[0])} />
                    <label htmlFor="upload" className="cursor-pointer">
                        <ImageIcon className="mx-auto text-gray-600 mb-1" size={32}/>
                        <p className="text-[10px] font-bold text-gray-500">{file ? file.name : editingId ? "Change Image (Optional)" : "Select Image"}</p>
                    </label>
                </div>
            </div>

            <button disabled={isUploading} className="w-full py-4 bg-gold text-black font-black rounded-xl shadow-xl hover:brightness-110 active:scale-95 transition-all text-xs tracking-widest uppercase">
                {isUploading ? <Loader2 className="animate-spin mx-auto"/> : editingId ? "Save Changes" : "Publish Now"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}