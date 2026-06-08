"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { supabase } from "@/lib/supabase";
import { ChevronDown, GraduationCap, Briefcase, CheckCircle, X, Loader2, UploadCloud, Clock, Target, Award, Rocket, Users, Code2, Database, Palette, BarChart3, Smartphone, Layers } from "lucide-react";
export const dynamic = "force-dynamic";

const cardThemes: any = {
  purple: { bg: "bg-[#4f46e5]", tagBg: "bg-[#1e1b4b]", tagText: "text-[#818cf8]", icon: Code2 },
  gold: { bg: "bg-[#fbbf24]", tagBg: "bg-[#451a03]", tagText: "text-[#fbbf24]", icon: Database },
  blue: { bg: "bg-[#0ea5e9]", tagBg: "bg-[#082f49]", tagText: "text-[#38bdf8]", icon: Palette },
  green: { bg: "bg-[#10b981]", tagBg: "bg-[#064e3b]", tagText: "text-[#34d399]", icon: BarChart3 },
  indigo: { bg: "bg-[#6366f1]", tagBg: "bg-[#1e1b4b]", tagText: "text-[#a5b4fc]", icon: Smartphone },
  amber: { bg: "bg-[#f59e0b]", tagBg: "bg-[#451a03]", tagText: "text-[#fbbf24]", icon: Layers },
};

export default function InternshipPage() {
  const [internships, setInternships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null); 
  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGlobalOpen, setIsGlobalOpen] = useState(false); 

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    try {
     
      const { data: status } = await supabase.from('global_settings').select('value').eq('key', 'internship_status').single();
      if (status) setIsGlobalOpen(status.value === 'open');

      
      const { data } = await supabase.from('internships').select('*').order('created_at', { ascending: false });
      if (data) setInternships(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleApply = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const file = formData.get("cv") as File;
    let cvUrl = "";

    try {
      if (file && file.size > 0) {
        const fileName = `${Date.now()}-${file.name}`;
        await supabase.storage.from('cv_storage').upload(fileName, file);
        const { data: pUrl } = supabase.storage.from('cv_storage').getPublicUrl(fileName);
        cvUrl = pUrl.publicUrl;
      }
      await supabase.from("applicants").insert([{
        name: formData.get("name"), 
        email: formData.get("email"),
        whatsapp: formData.get("whatsapp"), 
        role_applied: selectedRole,
        cv_url: cvUrl, 
        status: "pending"
      }]);
      alert("🎉 Success! Your application has been submitted.");
      setShowForm(false);
      setSelectedFile("");
    } catch (err: any) { alert("❌ Error: " + err.message); } 
    finally { setIsSubmitting(false); }
  };

  return (
    <main className="min-h-screen bg-[#060610] text-white pt-32"> 
      <Header />
      
  
      <section className="pb-20 text-center container mx-auto px-4">
       
        <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-8 transition-all duration-500 ${isGlobalOpen && internships.length > 0 ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
            <span className={`w-2.5 h-2.5 rounded-full ${isGlobalOpen && internships.length > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
                Internships: {isGlobalOpen && internships.length > 0 ? 'Currently Open' : 'Closed'}
            </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Open Internship <span className="text-white">Positions</span></h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto font-medium leading-relaxed">
          Explore our diverse internship opportunities and find the perfect match for your career goals.
        </p>
      </section>

    
      <div className="container mx-auto px-4 pb-20">
        {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gold" size={40}/></div>
        ) : isGlobalOpen && internships.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {internships.map((pos) => {
              const theme = cardThemes[pos.color] || cardThemes.purple;
              const IconComp = theme.icon;
              const isExpanded = expandedId === pos.id;
              return (
                <div key={pos.id} className="rounded-3xl overflow-hidden border border-white/5 bg-[#0d0d1a] flex flex-col group transition-all hover:border-white/10">
                  
                  <div className={`${theme.bg} p-6 flex items-center gap-5`}>
                     <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
                        <IconComp size={32} className="text-white"/>
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold text-white leading-tight">{pos.title}</h3>
                        <p className="text-white/80 text-sm flex items-center gap-2 mt-1 font-medium"><Clock size={16}/> {pos.duration}</p>
                     </div>
                  </div>

                  
                  <div className="p-6 flex flex-col h-full">
                   
                    <div className="flex flex-wrap gap-2 mb-4">
                        {pos.skills?.map((s:string) => (
                           <span key={s} className={`text-[11px] font-bold px-4 py-2 rounded-full uppercase tracking-widest ${theme.tagBg} ${theme.tagText}`}>
                             {s}
                           </span>
                        ))}
                    </div>

                    <button 
                      onClick={() => setExpandedId(isExpanded ? null : pos.id)}
                      className="w-full py-4 border border-gold/40 rounded-xl flex items-center justify-between px-6 text-sm font-bold text-gold hover:bg-gold/5 transition-all"
                    >
                      {isExpanded ? "Hide Details" : "View Requirements"}
                      <ChevronDown className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                  
                    <div className={`overflow-hidden transition-all duration-700 ${isExpanded ? 'max-h-[1500px] opacity-100 mt-10' : 'max-h-0 opacity-0'}`}>
                        <div className="space-y-10">
                           
                            <div className="space-y-4">
                                <h4 className="text-gold font-bold flex items-center gap-2 uppercase text-[11px] tracking-[0.2em]"><GraduationCap size={18}/> Eligibility</h4>
                                {pos.eligibility?.map((e: string) => <p key={e} className="flex gap-4 text-sm text-gray-400 leading-relaxed"><CheckCircle className="text-gold shrink-0 mt-0.5" size={18}/> {e}</p>)}
                            </div>
                            
                           
                            <div className="space-y-4">
                                <h4 className="text-blue-400 font-bold flex items-center gap-2 uppercase text-[11px] tracking-[0.2em]"><Target size={18}/> What You Will Do</h4>
                                {pos.tasks?.map((t: string) => <p key={t} className="flex gap-4 text-sm text-gray-400 leading-relaxed"><CheckCircle className="text-blue-400 shrink-0 mt-0.5" size={18}/> {t}</p>)}
                            </div>

                            
                            <div className="space-y-4">
                                <h4 className="text-green-400 font-bold flex items-center gap-2 uppercase text-[11px] tracking-[0.2em]"><Award size={18}/> Benefits</h4>
                                {pos.benefits?.map((b: string) => (
                                  <p key={b} className="flex gap-4 text-sm text-gray-400 leading-relaxed"><CheckCircle className="text-green-400 shrink-0 mt-0.5" size={18}/> {b}</p>
                                ))}
                            </div>

                            <button onClick={() => {setSelectedRole(pos.title); setShowForm(true);}} className="w-full py-5 bg-gold text-black font-black rounded-xl text-lg hover:brightness-110 transition-all shadow-xl">Enroll Now</button>
                        </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
         
          <div className="max-w-2xl mx-auto text-center py-32 bg-[#0d0d1a] rounded-[4rem] border border-white/5 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
             <h2 className="text-4xl font-black text-white mb-4 italic">Waiting... Coming Soon!</h2>
             <p className="text-gray-400 max-w-md mx-auto">We are currently not accepting applications. Please stay tuned for our next batch announcement.</p>
          </div>
        )}
      </div>

      
      <section className="container mx-auto px-4 py-24 border-t border-white/5">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {[
                { icon: <Users size={32}/>, title: "1:1 Mentorship", desc: "Personal guidance from industry experts" },
                { icon: <Award size={32}/>, title: "Certificate", desc: "Industry-recognized certification" },
                { icon: <Briefcase size={32}/>, title: "Job Offer", desc: "Potential full-time opportunity" },
                { icon: <Rocket size={32}/>, title: "Live Projects", desc: "Work on real client projects" }
            ].map((item, i) => (
                <div key={i} className="bg-[#0d0d1a] border border-white/5 p-10 rounded-[2.5rem] text-center group hover:border-gold/30 transition-all">
                    <div className="bg-gold/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gold group-hover:scale-110 transition-transform">
                        {item.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
            ))}
        </div>
      </section>

     
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="bg-[#0d0d1a] w-full max-w-2xl rounded-[2.5rem] p-10 md:p-16 relative border border-white/10 overflow-y-auto max-h-[90vh]">
            <button onClick={() => setShowForm(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"><X size={32}/></button>
            <h2 className="text-4xl font-bold mb-2">Apply for <span className="text-gold">{selectedRole}</span></h2>
            <form onSubmit={handleApply} className="grid md:grid-cols-2 gap-6 mt-10">
              <input name="name" type="text" placeholder="Full Name *" className="bg-white/5 border border-white/10 rounded-xl p-5 outline-none focus:border-gold text-white" required />
              <input name="email" type="email" placeholder="Email *" className="bg-white/5 border border-white/10 rounded-xl p-5 outline-none focus:border-gold text-white" required />
              <input name="whatsapp" type="text" placeholder="WhatsApp Number *" className="bg-white/5 border border-white/10 rounded-xl p-5 outline-none focus:border-gold text-white" required />
              <div className="md:col-span-2">
                <input name="cv" type="file" id="cv_up" className="hidden" accept=".pdf" onChange={(e:any) => setSelectedFile(e.target.files[0]?.name)} required />
                <label htmlFor="cv_up" className="p-8 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center gap-4 cursor-pointer hover:border-gold/50 bg-white/5 transition-all">
                  {selectedFile ? <><CheckCircle className="text-green-400" size={40}/> <span className="font-bold text-white">{selectedFile}</span></> : <><UploadCloud className="text-gold" size={40}/> <span className="font-bold text-gray-400">Upload Resume (PDF Only)</span></>}
                </label>
              </div>
              <button disabled={isSubmitting} className="md:col-span-2 py-5 bg-gold text-black font-black rounded-xl text-xl mt-4 flex justify-center items-center shadow-lg transition-all">
                {isSubmitting ? <Loader2 className="animate-spin"/> : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
}