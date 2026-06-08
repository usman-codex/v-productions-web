"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { 
  Users, Rocket, BookOpen, Briefcase, Code, Brain, Clock, 
  CheckCircle2, ArrowRight, GraduationCap, Award, Star, 
  FileText, ExternalLink, Loader2, Zap 
} from "lucide-react";
import Link from "next/link"; 

export const dynamic = "force-dynamic";

const pillars = [
  { icon: Users, title: "Full Focus & Guidance", desc: "1-on-1 mentorship and small batch sizes ensure personalized attention.", color: "from-purple-600 to-indigo-600" },
  { icon: Rocket, title: "Live Project Experience", desc: "Work on real agency projects, not just theory. Gain practical experience.", color: "from-blue-600 to-cyan-600" },
  { icon: BookOpen, title: "Industry-Standard Curriculum", desc: "Learn the latest tools including AI, Next.js, and modern practices.", color: "from-amber-500 to-orange-600" },
  { icon: Briefcase, title: "Job Placement Support", desc: "Get guidance on portfolio building and direct placement assistance.", color: "from-emerald-500 to-teal-600" },
];

const headerThemes: any = {
  purple: "bg-[#4f46e5] shadow-[#4f46e5]/40",
  gold: "bg-[#fbbf24] shadow-[#fbbf24]/40",
  blue: "bg-[#0ea5e9] shadow-[#0ea5e9]/40",
  green: "bg-[#10b981] shadow-[#10b981]/40",
};

export default function TrainingPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const { data: p } = await supabase.from('training_programs').select('*').order('created_at', { ascending: true });
      const { data: s } = await supabase.from('certified_students').select('*').order('created_at', { ascending: false });
      
      if (p) setPrograms(p);
      if (s) setStudents(s);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleEnrollment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      const { error } = await supabase.from('training_enrollments').insert([{
        full_name: formData.get("name"),
        email: formData.get("email"),
        whatsapp: formData.get("whatsapp"),
        course_interest: formData.get("course"),
        skill_level: formData.get("level")
      }]);
      if (error) throw error;
      alert("🎉 Application Submitted Successfully!");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060610] text-white pt-32">
      <Header />
      <section className="container mx-auto px-4 text-center mb-32 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gold/5 blur-[120px] -z-10" />
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-5 py-2 rounded-full mb-8 text-gold text-xs font-black uppercase tracking-widest animate-pulse">
            <GraduationCap size={16}/> V-Productions Academy
        </div>
        <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
          Master the <span className="text-gold italic">Tech of Tomorrow</span> <br/>
          with V-Productions Academy
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
          We don't just teach; we mentor. Get hands-on training from industry experts who provide full focus and real-world expertise.
        </p>
        <div className="mt-10">
            <Button className="bg-gold text-black font-black px-10 py-7 rounded-2xl text-lg hover:shadow-2xl shadow-gold/20 transition-all hover:scale-105 active:scale-95">JOIN NOW <ArrowRight className="ml-2"/></Button>
        </div>
      </section>

      <section className="py-24 bg-[#0d0d1a]/30 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter text-white">The V-Training <span className="text-gold">Philosophy</span></h2>
            <p className="text-gray-500 font-medium">Core training pillars that set our academy apart.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((p, i) => (
              <div key={i} className="bg-[#0d0d1a] p-8 rounded-[2.5rem] border border-white/5 hover:border-gold/30 hover:scale-[1.03] transition-all duration-500 group shadow-xl">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <p.icon className="text-white" size={28}/>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-gold transition-colors">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
        Training <span className="text-gold">Programs</span>
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Choose from our comprehensive range of industry-focused training programs
      </p>
    </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((prog) => (
              <div key={prog.id} className="group cursor-pointer transition-all duration-700"
        >
          <div className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">

           
            <div
              className={`${
                headerThemes[prog.header_color] || "bg-purple-700"
              } py-6 px-6 transition-all duration-300 group-hover:shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Code className="h-8 w-8 text-white" />

                  <h3 className="text-xl font-bold text-white">
                    {prog.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 text-white/80">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {prog.duration}
                </span>
              </div>
            </div>

            
            <div className="bg-[#1a1a2e] p-6 border-x border-b border-white/10"> 
              <h4 className="text-sm font-semibold text-gold mb-4 uppercase tracking-wider">
                What You Will Learn
              </h4>

              <ul className="space-y-3 mb-6 min-h-[220px]">
                {prog.topics?.map((topic: string) => (
                  <li
                    key={topic}
                    className="flex items-start gap-3 text-gray-300 text-sm"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-gold" />
                    </div>

                    <span>{topic}</span>
                  </li>
                ))}
              </ul>

              <a
                href={prog.syllabus_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="
                    w-full
                    bg-gold
                    text-black
                    hover:bg-yellow-400
                    font-semibold
                    transition-all
                    duration-300
                    group-hover:shadow-lg
                    group-hover:shadow-gold/20
                  "
                >
                  View Full Syllabus

                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>

            
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border-2 border-gold/30"></div>

          </div>
        </div>
      ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#060610] border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 italic text-white">Certified <span className="text-blue-400 font-normal">Trainers</span></h2>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-xs">Recently successful students working in the industry</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {students.slice(0, 8).map((stu) => (
              <div key={stu.id} className="group flex flex-col bg-[#0d0d1a] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-500 shadow-2xl h-full">
                
                <div className="relative h-56 w-full overflow-hidden bg-black/20">
                    <img 
                        src={stu.work_image} 
                        className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" 
                        alt="Work Sample"
                        onError={(e:any)=>e.target.style.display='none'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-transparent to-transparent" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border-4 border-white/10 p-1 shadow-2xl overflow-hidden bg-[#060610] group-hover:scale-110 group-hover:border-gold transition-all duration-500">
                            <img 
                                src={stu.student_image} 
                                className="w-full h-full rounded-full object-cover" 
                                alt={stu.name}
                                onError={(e:any)=>e.target.src="https://api.dicebear.com/7.x/avataaars/svg"}
                            />
                        </div>
                    </div>
                </div>

                <div className="p-8 flex flex-col items-center text-center flex-grow">
                    <h4 className="text-xl font-black text-white leading-tight mb-1">{stu.name}</h4>
                    <p className="text-gold text-[10px] font-black uppercase tracking-[0.2em] mb-6">{stu.course_taken}</p>
                    
                    <a 
                      href={stu.portfolio_link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="mt-auto inline-flex w-full bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all items-center justify-center gap-2 shadow-lg"
                    >
                      VIEW PORTFOLIO <ExternalLink size={14}/>
                    </a>
                </div>
              </div>
            ))}
          </div>

          {students.length > 8 && (
            <div className="mt-16 text-center">
                <Link href="/training/graduates">
                    <Button size="lg" variant="outline" className="border-gold/30 text-gold hover:bg-gold hover:text-black font-black px-12 py-7 rounded-2xl tracking-widest uppercase text-xs shadow-xl transition-all hover:scale-105 active:scale-95">
                        Meet All Trainers <ArrowRight className="ml-2" size={16}/>
                    </Button>
                </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-32 container mx-auto px-4 max-w-5xl">
        <div className="bg-[#0d0d1a] p-10 md:p-20 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter italic text-white">Start Your <span className="text-gold">Journey</span></h2>
            <p className="text-gray-400 font-medium mb-12">Join the next generation of digital innovators.</p>
            <form onSubmit={handleEnrollment} className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-2"><Label className="text-gold text-xs font-bold uppercase ml-1">Full Name</Label><Input name="name" required className="bg-white/5 border-white/10 p-7 rounded-2xl focus:border-gold text-white" /></div>
              <div className="space-y-2"><Label className="text-gold text-xs font-bold uppercase ml-1">Email</Label><Input name="email" type="email" required className="bg-white/5 border-white/10 p-7 rounded-2xl focus:border-gold text-white" /></div>
              <div className="space-y-2"><Label className="text-gold text-xs font-bold uppercase ml-1">WhatsApp</Label><Input name="whatsapp" required className="bg-white/5 border-white/10 p-7 rounded-2xl focus:border-gold text-white" /></div>
              <div className="space-y-2">
                <Label className="text-gold text-xs font-bold uppercase ml-1">Course</Label>
                <select name="course" className="w-full h-[60px] bg-[#16162d] border border-white/10 px-6 rounded-2xl outline-none focus:border-gold font-medium text-white">
                  {programs.map(p => <option key={p.id} value={p.title}>{p.title}</option>)}
                </select>
              </div>
              <Button disabled={isSubmitting} className="md:col-span-2 py-9 bg-gold text-black font-black text-xl rounded-[2.5rem] mt-8 shadow-xl hover:brightness-110 active:scale-95 transition-all">
                {isSubmitting ? <Loader2 className="animate-spin mx-auto"/> : "SUBMIT ENROLLMENT REQUEST"}
              </Button>
            </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}