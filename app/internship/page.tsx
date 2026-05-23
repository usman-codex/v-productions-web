"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { supabase } from "@/lib/supabase";
import { ChevronDown, GraduationCap, Briefcase, Rocket, CheckCircle, Send, X, Loader2, UploadCloud, Target, Award, Users } from "lucide-react";

const cardThemes: any = {
  purple: { bg: "bg-[#2d1b69]/20", border: "border-purple-500/30", text: "text-purple-400", icon: "bg-purple-500/20" },
  gold: { bg: "bg-[#69541b]/20", border: "border-gold/30", text: "text-gold", icon: "bg-gold/20" },
  blue: { bg: "bg-[#1b4369]/20", border: "border-blue-500/30", text: "text-blue-400", icon: "bg-blue-500/20" },
  green: { bg: "bg-[#1b693e]/20", border: "border-green-500/30", text: "text-green-400", icon: "bg-green-500/20" },
};

export default function InternshipPage() {
  const [internships, setInternships] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null); // Only one ID at a time
  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    const { data } = await supabase.from('internships').select('*').order('created_at', { ascending: false });
    if (data) setInternships(data);
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

      const { error } = await supabase.from("applicants").insert([{
        name: formData.get("name"),
        email: formData.get("email"),
        whatsapp: formData.get("whatsapp"),
        role_applied: selectedRole,
        cv_url: cvUrl,
        status: "pending"
      }]);

      if (error) throw error;
      alert("🎉 Success! Your application has been submitted.");
      setShowForm(false); // Success hone par popup band
      setSelectedFile(""); // Clear file name
    } catch (err: any) {
      alert("❌ Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060610] text-white pt-20">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 text-center container mx-auto px-4">
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9]">
          Shape Your Future with <br/> 
          <span className="text-gold">V-Productions</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
          Join a team that values innovation, mentorship, and real-world experience.
        </p>
      </section>

      {/* Grid Section */}
      <div className="container mx-auto px-4 space-y-12 pb-24">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {internships.map((pos) => {
            const theme = cardThemes[pos.color] || cardThemes.purple;
            const isExpanded = expandedId === pos.id;
            return (
              <div key={pos.id} className={`glass rounded-[2rem] border-t-4 ${theme.border} bg-[#111122]/50 p-8 transition-all duration-500 group`}>
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl ${theme.icon} ${theme.text}`}><Briefcase size={32} /></div>
                  <div className="text-right">
                    <h3 className="text-2xl font-bold leading-tight">{pos.title}</h3>
                    <p className="text-sm opacity-60 flex items-center justify-end gap-2 mt-1"><Target size={14}/> {pos.duration}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setExpandedId(isExpanded ? null : pos.id)}
                  className="w-full py-4 border border-gold/30 rounded-2xl flex items-center justify-between px-6 text-sm font-bold hover:bg-gold/10 transition-all"
                >
                  {isExpanded ? "Hide Details" : "View Requirements"}
                  <ChevronDown className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-700 ${isExpanded ? 'max-h-[1200px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-8 border-t border-white/5 pt-8">
                    <div>
                      <h4 className="text-gold font-bold flex items-center gap-2 mb-4 uppercase text-[10px] tracking-widest"><GraduationCap size={16}/> Eligibility</h4>
                      {pos.eligibility?.map((e: string) => <p key={e} className="flex gap-3 text-sm text-muted-foreground mb-3"><CheckCircle className="text-gold shrink-0 mt-0.5" size={16}/> {e}</p>)}
                    </div>
                    <button 
                      onClick={() => {setSelectedRole(pos.title); setShowForm(true);}}
                      className="w-full py-5 bg-gold text-[#060610] font-black rounded-2xl text-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Enrollment Popup - Fixed Scrollbar */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="glass w-full max-w-2xl rounded-[3rem] p-8 md:p-16 relative border-gold/20 animate-scale-up overflow-y-auto max-h-[95vh] scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <button onClick={() => setShowForm(false)} className="absolute top-8 right-8 text-muted-foreground hover:text-white"><X size={32}/></button>
            <h2 className="text-4xl font-bold mb-4">Enroll for <span className="text-gold">{selectedRole}</span></h2>
            <form onSubmit={handleApply} className="grid md:grid-cols-2 gap-6 mt-8">
              <input name="name" type="text" placeholder="Full Name *" className="bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-gold outline-none" required />
              <input name="email" type="email" placeholder="Email Address *" className="bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-gold outline-none" required />
              <input name="whatsapp" type="text" placeholder="WhatsApp Number *" className="bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-gold outline-none" required />
              <div className="md:col-span-2">
                <input name="cv" type="file" id="cv_up" className="hidden" accept=".pdf" onChange={(e:any) => setSelectedFile(e.target.files[0]?.name)} required />
                <label htmlFor="cv_up" className="p-8 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center gap-4 cursor-pointer hover:border-gold/50 transition-all bg-white/5">
                  {selectedFile ? <><CheckCircle className="text-green-400" size={40}/> <span className="font-bold">{selectedFile}</span></> : <><UploadCloud className="text-gold" size={40}/> <span className="font-bold text-center">Upload Resume/CV (PDF Only)</span></>}
                </label>
              </div>
              <button disabled={isSubmitting} className="md:col-span-2 py-5 bg-gold text-black font-black rounded-2xl text-xl mt-4 flex justify-center items-center gap-2">
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