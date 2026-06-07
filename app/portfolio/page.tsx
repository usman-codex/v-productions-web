
"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Award, ExternalLink, Loader2, Users, Briefcase, 
  Code, Palette, Globe, Layers, Search , ArrowRight
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// 1. Static Awards Data (Local Images from public/awards/)
const awards = [
  { name: "Top Tech Agency 2024", img: "/awards/agency-2024.jpg" },
  { name: "Best LMS Solution", img: "/awards/lms-award.jpg" },
  { name: "Innovation Excellence", img: "/awards/innovation.jpg" },
  { name: "Global Partner Award", img: "/awards/global-award.jpg" },
];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [talent, setTalent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      // Fetch Projects from 'portfolio' table
      const { data: projData } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch Talent from 'talent_hub' table
      const { data: talentData } = await supabase
        .from('talent_hub')
        .select('*')
        .order('created_at', { ascending: false });

      if (projData) setProjects(projData);
      if (talentData) setTalent(talentData);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#060610] text-white pt-24 overflow-x-hidden">
      <Header />

      {/* --- 1. HERO SECTION --- */}
       <section className="py-24 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Our Legacy of <span className="gradient-text">Innovation</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
          Explore our projects, achievements, and the world-class talent we build at the intersection of technology and creativity.
        </p>
      </section>



      {/* --- 2. COMPANY EXCELLENCE (Awards Section) --- */}
      <section className="pb-32 container mx-auto px-4">
        <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <h2 className="text-3xl font-bold flex items-center gap-3 whitespace-nowrap">
                <Award className="text-gold" size={28} /> Company Excellence
            </h2>
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, i) => (
            <div key={i} className="group relative bg-[#0d0d1a] rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-700 hover:border-gold/30 shadow-2xl">
              <div className="aspect-[4/5] relative overflow-hidden bg-black/40">
                <img
                  src={award.img}
                  alt={award.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060610] via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-8 left-0 right-0 text-center px-6">
                  <div className="bg-gold/10 backdrop-blur-md w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gold/20 shadow-lg group-hover:scale-110 transition-transform">
                    <Award className="text-gold w-6 h-6" />
                  </div>
                  <p className="font-black text-xs uppercase tracking-[0.2em] text-white leading-tight drop-shadow-md">
                    {award.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


     <section className="pb-32 container mx-auto px-4 border-t border-white/5 pt-20">
        <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Featured <span className="text-gold">Case Studies</span></h2>
            {loading && <Loader2 className="animate-spin text-gold" />}
        </div>

        {/* Grid Update: lg:grid-cols-4 for 4 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group flex flex-col bg-[#0d0d1a] rounded-[2rem] overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-500 shadow-2xl">
              
              {/* Compact Image Area */}
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={project.image_url} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                {/* Subtle dark overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                
                {/* Category Badge on Image */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                   <p className="text-[9px] font-black text-gold uppercase tracking-widest">{project.category}</p>
                </div>
              </div>

              {/* Compact Content Area */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-6 group-hover:text-gold transition-colors truncate">
                  {project.title}
                </h3>
                
                <div className="mt-auto">
                    <a 
                      href={project.project_link || "#"} 
                      target="_blank" 
                      className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-gold hover:text-black transition-all flex items-center justify-center gap-2"
                    >
                      VIEW LIVE <ExternalLink size={14} />
                    </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && projects.length === 0 && (
          <p className="text-center text-gray-600 italic py-20">No projects uploaded yet.</p>
        )}
      </section>


      {/* --- 4. TALENT HUB (Dynamic from Supabase) --- */}
      <section className="pb-40 container mx-auto px-4">
        <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4 italic">The <span className="text-gold">Talent</span> Hub</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Meet the brilliant minds behind our successful digital transformations.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {talent.length > 0 ? talent.map((person, i) => (
            <div key={person.id} className="group bg-[#0d0d1a] p-10 rounded-[2.5rem] text-center border border-white/5 hover:border-gold/30 transition-all relative overflow-hidden shadow-xl">

              
              <div className="w-32 h-32 rounded-full border-2 border-gold/20 p-1.5 mx-auto mb-8 group-hover:scale-110 group-hover:border-gold transition-all duration-500">
                <img 
                    src={person.image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${person.name}`} 
                    className="w-full h-full rounded-full object-cover bg-[#16162d]" 
                />
              </div>
              
              <h3 className="text-2xl font-bold text-white">{person.name}</h3>
              <p className="text-gold font-medium text-xs uppercase tracking-widest mt-2 mb-2">{person.role}</p>
              
             
              
              <div className="flex flex-wrap justify-center gap-2">
                {person.skills?.map((skill: string, idx: number) => (
                  <span key={idx} className="px-3 py-1.5 bg-white/5 rounded-xl text-[9px] font-bold border border-white/10 text-gray-400 group-hover:text-white transition-colors uppercase">
                    {skill}
                  </span>
                ))}
              </div>

               <div className="pt-4 border-t border-white/5">
                <a 
                    href={person.project || "#"} 
                    target="_blank" 
                    className="inline-flex items-center gap-2 text-xs font-black text-gold hover:text-white transition-colors tracking-widest group-hover:translate-x-1 duration-300"
                >
                 VIEW PORTFOLIO <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
            </div>
          )) : (
            !loading && <p className="col-span-4 text-center text-gray-600 italic">Talent records coming soon...</p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}