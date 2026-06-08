"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AllGraduates() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const { data } = await supabase.from('certified_students').select('*').order('created_at', { ascending: false });
      if (data) setStudents(data);
      setLoading(false);
    }
    fetchAll();
  }, []);

  return (
    <main className="min-h-screen bg-[#060610] text-white pt-32 pb-20">
      <Header />
      <div className="container mx-auto px-4">
        <Link href="/training" className="inline-flex items-center gap-2 text-gray-500 hover:text-gold mb-12 transition-all font-bold group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Academy
        </Link>
        
        <h1 className="text-4xl md:text-7xl font-black mb-20 tracking-tighter uppercase italic">
            All Certified <span className="text-blue-400">Trainers</span>
        </h1>

        {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gold" size={50}/></div>
        ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {students.map((stu) => (
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
        )}
      </div>
      <Footer />
    </main>
  );
}