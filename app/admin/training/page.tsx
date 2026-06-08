"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, Trash2, Edit3, GraduationCap, Users, UploadCloud, 
  Loader2, Mail, Phone, X, Link as LinkIcon, FileText, CheckCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";   
import { Label } from "@/components/ui/label";   

export const dynamic = "force-dynamic";

export default function TrainingAdmin() {
  const [activeTab, setActiveTab] = useState("programs");
  const [programs, setPrograms] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [enrolls, setEnrolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showProgModal, setShowProgModal] = useState(false);
  const [showStuModal, setShowStuModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null); // State for Edit logic
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    try {
        const { data: p } = await supabase.from('training_programs').select('*').order('created_at', { ascending: false });
        const { data: s } = await supabase.from('certified_students').select('*').order('created_at', { ascending: false });
        const { data: e } = await supabase.from('training_enrollments').select('*').order('created_at', { ascending: false });
        if (p) setPrograms(p);
        if (s) setStudents(s);
        if (e) setEnrolls(e);
    } catch (err) { console.error("Error fetching data:", err); }
    finally { setLoading(false); }
  }

  const deleteItem = async (table: string, id: any) => {
    if (!confirm("Are you sure? This data will be removed permanently.")) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) fetchData();
    else alert("Error deleting item.");
  };
  const handleProgramSubmit = async (e: any) => {
    e.preventDefault();
    setIsSaving(true);
    const f = new FormData(e.target);
    const syllabusFile = f.get("syllabus") as File;

    try {
        let sUrl = editingItem?.syllabus_url || "";
        
        if (syllabusFile && syllabusFile.size > 0) {
            const path = `syllabus/${Date.now()}-${syllabusFile.name}`;
            await supabase.storage.from('training_files').upload(path, syllabusFile);
            sUrl = supabase.storage.from('training_files').getPublicUrl(path).data.publicUrl;
        }

        const payload = {
            title: f.get("title"),
            duration: f.get("duration"),
            topics: (f.get("topics") as string).split(","),
            header_color: f.get("color"),
            syllabus_url: sUrl
        };

        if (editingItem) {
            await supabase.from('training_programs').update(payload).eq('id', editingItem.id);
        } else {
            await supabase.from('training_programs').insert([payload]);
        }

        setShowProgModal(false);
        setEditingItem(null);
        fetchData();
        alert("Program Updated! 🚀");
    } catch (err: any) { alert("Error: " + err.message); }
    finally { setIsSaving(false); }
  };
  const handleStudentSubmit = async (e: any) => {
    e.preventDefault();
    setIsSaving(true);
    const f = new FormData(e.target);
    const picFile = f.get("pic") as File;
    const workFile = f.get("work") as File;

    try {
        let pUrl = editingItem?.student_image || "";
        let wUrl = editingItem?.work_image || "";

        if (picFile && picFile.size > 0) {
            const pPath = `students/p-${Date.now()}.jpg`;
            await supabase.storage.from('training_images').upload(pPath, picFile);
            pUrl = supabase.storage.from('training_images').getPublicUrl(pPath).data.publicUrl;
        }
        if (workFile && workFile.size > 0) {
            const wPath = `students/w-${Date.now()}.jpg`;
            await supabase.storage.from('training_images').upload(wPath, workFile);
            wUrl = supabase.storage.from('training_images').getPublicUrl(wPath).data.publicUrl;
        }

        const payload = {
            name: f.get("name"),
            course_taken: f.get("course"),
            portfolio_link: f.get("link"),
            student_image: pUrl,
            work_image: wUrl
        };

        if (editingItem) {
            await supabase.from('certified_students').update(payload).eq('id', editingItem.id);
        } else {
            await supabase.from('certified_students').insert([payload]);
        }

        setShowStuModal(false);
        setEditingItem(null);
        fetchData();
        alert("Graduate Record Updated! 🎖️");
    } catch (err: any) { alert("Error: " + err.message); }
    finally { setIsSaving(false); }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#060610] text-gold"><Loader2 className="animate-spin" size={40}/></div>;

  return (
    <div className="p-4 md:p-10 space-y-10 bg-[#060610] min-h-screen text-white"> 
      <div className="flex flex-col md:flex-row justify-between items-center bg-[#0d0d1a] p-8 rounded-[2.5rem] border border-white/5 gap-6">
        <div className="flex items-center gap-4">
            <div className="bg-gold/10 p-4 rounded-2xl"><GraduationCap className="text-gold" size={32}/></div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Academy <span className="text-gold">Manager</span></h1>
                <p className="text-gray-500 text-sm">Update programs and manage student achievements</p>
            </div>
        </div>
        <div className="flex bg-black/40 p-1.5 rounded-xl border border-white/5 shadow-2xl">
            <button onClick={() => setActiveTab("programs")} className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'programs' ? 'bg-gold text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}>Programs</button>
            <button onClick={() => setActiveTab("students")} className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'students' ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>Students</button>
            <button onClick={() => setActiveTab("enrolls")} className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'enrolls' ? 'bg-green-500 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>Enrollments</button>
        </div>
      </div>

      {activeTab === "programs" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button onClick={() => { setEditingItem(null); setShowProgModal(true); }} className="bg-[#0d0d1a] border-2 border-dashed border-gold/20 rounded-[2.5rem] flex flex-col items-center justify-center p-12 hover:bg-gold/5 transition-all group min-h-[220px]">
                <Plus size={48} className="text-gold mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-bold text-gold uppercase tracking-widest text-xs">Add New Program</p>
            </button>
            {programs.map(p => (
                <div key={p.id} className="bg-[#0d0d1a] p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-between group relative overflow-hidden shadow-xl">
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button onClick={() => {setEditingItem(p); setShowProgModal(true);}} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><Edit3 size={16}/></button>
                        <button onClick={() => deleteItem('training_programs', p.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                    </div>
                    <div>
                        <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-2 block">Level: 100</span>
                        <h3 className="font-bold text-xl text-white pr-10">{p.title}</h3>
                        <p className="text-xs text-gray-500 mt-2 uppercase font-bold tracking-tighter">{p.duration}</p>
                    </div>
                </div>
            ))}
        </div>
      )}

      {activeTab === "students" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button onClick={() => { setEditingItem(null); setShowStuModal(true); }} className="bg-[#0d0d1a] border-2 border-dashed border-blue-500/20 rounded-[2.5rem] flex flex-col items-center justify-center p-10 hover:bg-blue-500/5 transition-all group min-h-[220px]">
                <Plus size={40} className="text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-bold text-blue-400 text-xs uppercase tracking-widest text-center">Add Certified <br/> Graduate</p>
            </button>
            {students.map(s => (
                <div key={s.id} className="bg-[#0d0d1a] p-6 rounded-[2.5rem] border border-white/5 text-center group relative shadow-2xl hover:border-gold/20 transition-all">
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button onClick={() => {setEditingItem(s); setShowStuModal(true);}} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Edit3 size={14}/></button>
                        <button onClick={() => deleteItem('certified_students', s.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg"><Trash2 size={14}/></button>
                    </div>
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gold/30 overflow-hidden bg-white/5 shadow-2xl">
                        <img src={s.student_image} className="w-full h-full object-cover" alt="stu" />
                    </div>
                    <p className="font-bold text-white text-base leading-tight mb-1">{s.name}</p>
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">{s.course_taken}</p>
                </div>
            ))}
        </div>
      )}

      {activeTab === "enrolls" && (
        <div className="bg-[#0d0d1a] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gold text-[10px] uppercase font-black tracking-widest">
                        <tr><th className="p-6">Applicant Info</th><th className="p-6 text-center">Course Interest</th><th className="p-6 text-center">Action</th></tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {enrolls.map(e => (
                            <tr key={e.id} className="hover:bg-white/[0.01] transition-colors">
                                <td className="p-6">
                                    <p className="font-bold text-white text-base leading-none mb-2">{e.full_name}</p>
                                    <div className="flex gap-4 text-[10px] text-gray-500">
                                        <span className="flex items-center gap-1"><Mail size={12}/>{e.email}</span>
                                        <span className="flex items-center gap-1 text-green-400 font-bold"><Phone size={12}/>{e.whatsapp}</span>
                                    </div>
                                </td>
                                <td className="p-6 text-center"><span className="bg-white/5 px-4 py-1.5 rounded-xl text-xs font-bold text-slate-300 border border-white/5 uppercase tracking-tighter">{e.course_interest}</span></td>
                                <td className="p-6 text-center">
                                    <button onClick={() => deleteItem('training_enrollments', e.id)} className="text-red-400 hover:text-red-500 p-2 transition-colors"><Trash2 size={20}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {enrolls.length === 0 && <p className="text-center py-20 text-gray-500 italic uppercase text-xs tracking-widest">No enrollment records found.</p>}
            </div>
        </div>
      )}

      {showProgModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto">
              <div className="bg-[#0d0d1a] w-full max-w-2xl rounded-[3rem] p-10 border border-white/10 relative my-auto shadow-2xl">
                <button onClick={() => setShowProgModal(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"><X size={32}/></button>
                <form onSubmit={handleProgramSubmit} className="space-y-6">
                    <h2 className="text-3xl font-black text-gold tracking-tight">{editingItem ? "Update Program" : "Launch New Program"}</h2>
                    <div className="space-y-2">
                        <Label className="text-xs uppercase font-bold text-gray-500 tracking-widest ml-1">Title</Label>
                        <Input name="title" defaultValue={editingItem?.title} required className="bg-white/5 border-white/10 h-14 rounded-2xl" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-xs uppercase font-bold text-gray-500 tracking-widest ml-1">Duration</Label>
                            <Input name="duration" defaultValue={editingItem?.duration} required className="bg-white/5 border-white/10 h-14 rounded-2xl" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs uppercase font-bold text-gray-500 tracking-widest ml-1">Theme Color</Label>
                            <select name="color" defaultValue={editingItem?.header_color || "bg-purple-deep"} className="w-full bg-[#16162d] border border-white/10 h-14 rounded-2xl px-4 outline-none">
                                <option value="bg-purple-deep">Purple Theme</option>
                                <option value="bg-gold">Gold Theme</option>
                                <option value="bg-blue-electric">Blue Theme</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs uppercase font-bold text-gray-500 tracking-widest ml-1">Syllabus PDF</Label>
                        <Input name="syllabus" type="file" accept=".pdf" className="bg-white/5 border-white/10 pt-2.5 h-14 rounded-2xl" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs uppercase font-bold text-gray-500 tracking-widest ml-1">Core Topics (Comma separated)</Label>
                        <textarea name="topics" defaultValue={editingItem?.topics?.join(",")} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl min-h-[120px] outline-none focus:border-gold" required />
                    </div>
                    <Button disabled={isSaving} className="w-full bg-gold text-black font-black h-18 py-8 rounded-[2rem] text-xl shadow-2xl hover:brightness-110 active:scale-[0.98] transition-all uppercase">
                        {isSaving ? <Loader2 className="animate-spin" /> : "Publish Program"}
                    </Button>
                </form>
              </div>
          </div>
      )}

      {showStuModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto">
              <div className="bg-[#0d0d1a] w-full max-w-2xl rounded-[3rem] p-10 border border-white/10 relative my-auto shadow-2xl">
                <button onClick={() => setShowStuModal(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"><X size={32}/></button>
                <form onSubmit={handleStudentSubmit} className="space-y-6">
                    <h2 className="text-3xl font-black text-blue-400 tracking-tight">{editingItem ? "Update Graduate" : "Certify New Student"}</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label className="text-xs uppercase font-bold text-gray-500 ml-1">Full Name</Label><Input name="name" defaultValue={editingItem?.name} required className="bg-white/5 border-white/10 h-14 rounded-2xl" /></div>
                        <div className="space-y-2"><Label className="text-xs uppercase font-bold text-gray-500 ml-1">Course Name</Label><Input name="course" defaultValue={editingItem?.course_taken} required className="bg-white/5 border-white/10 h-14 rounded-2xl" /></div>
                    </div>
                    <div className="space-y-2"><Label className="text-xs uppercase font-bold text-gray-500 ml-1">Portfolio/Certificate URL</Label><Input name="link" defaultValue={editingItem?.portfolio_link} placeholder="Paste link here..." className="bg-white/5 border-white/10 h-14 rounded-2xl" /></div>
                    <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-6">
                        <div className="space-y-2"><Label className="text-xs font-bold uppercase text-gray-600">Profile Pic</Label><Input name="pic" type="file" className="bg-white/5 pt-2.5 h-14 rounded-2xl" /></div>
                        <div className="space-y-2"><Label className="text-xs font-bold uppercase text-gray-600">Work Preview Pic</Label><Input name="work" type="file" className="bg-white/5 pt-2.5 h-14 rounded-2xl" /></div>
                    </div>
                    <Button disabled={isSaving} className="w-full bg-blue-600 text-white font-black h-18 py-8 rounded-[2rem] text-xl shadow-2xl active:scale-[0.98] transition-all uppercase">
                        {isSaving ? <Loader2 className="animate-spin" /> : "Update Record"}
                    </Button>
                </form>
              </div>
          </div>
      )}
    </div>
  );
}