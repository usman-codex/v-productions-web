"use client";

import { Award, Code, Monitor, Smartphone, Globe, ExternalLink } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const awards = [
  { name: "Top Tech Agency 2024", img: "https://images.unsplash.com/photo-1579913741637-644781e89920?auto=format&fit=crop&q=80&w=300" },
  { name: "Best LMS Solution", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=300" },
  { name: "Innovation Excellence", img: "https://images.unsplash.com/photo-1621508654686-809f23efdaba?auto=format&fit=crop&q=80&w=300" },
  { name: "Global Partner Award", img: "https://images.unsplash.com/photo-1491336477066-31156b5e4f35?auto=format&fit=crop&q=80&w=300" },
];

const projects = [
  { title: "Quantum LMS", type: "LMS Portal", tech: ["React", "Node", "PostgreSQL"], image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1000" },
  { title: "Atlas CRM", type: "Business ERP", tech: ["Next.js", "Python", "AWS"], image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" },
];

const talent = [
  { name: "Zohaib Hassan", role: "Senior Web Dev", skills: ["React", "Next.js", "Node"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zohaib" },
  { name: "Ayesha Khan", role: "AI Intern", project: "Quantum LMS", skills: ["Python", "PyTorch"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayesha" },
  { name: "Hamza Malik", role: "UI/UX Designer", skills: ["Figma", "Tailwind"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hamza" },
  { name: "Sana Ahmed", role: "Marketing Intern", project: "Atlas ERP", skills: ["SEO", "Content"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sana" },
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen pt-20">
      <Header />
      
      {/* 1. Hero */}
      <section className="py-24 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Legacy of <span className="gradient-text">Innovation</span></h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Explore our projects, achievements, and the world-class talent we build at the intersection of technology and creativity.</p>
      </section>

      {/* 2. Excellence Carousel */}
      <section className="pb-24 overflow-hidden">
        <div className="container mx-auto px-4 mb-10"><h2 className="text-3xl font-bold">Company Excellence</h2></div>
        <div className="flex gap-8 animate-scroll-x hover:pause px-4">
          {[...awards, ...awards].map((award, i) => (
            <div key={i} className="min-w-[280px] glass p-6 rounded-2xl border-gold/10 text-center hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-shadow">
              <img src={award.img} className="w-full h-40 object-cover rounded-xl mb-4 grayscale hover:grayscale-0 transition-all duration-500" />
              <Award className="h-6 w-6 text-gold mx-auto mb-2" />
              <p className="font-bold text-sm">{award.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Agency Portfolio */}
      <section className="pb-24 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Major Projects</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <div key={i} className="group relative glass rounded-[2.5rem] overflow-hidden border-white/5">
              <div className="aspect-video overflow-hidden">
                <img src={project.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="text-gold text-sm font-medium">{project.type}</p>
                  </div>
                  <div className="flex gap-2">
                    {project.tech.map((t, index) => <span key={index} className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold border border-white/10 uppercase tracking-widest">{t}</span>)}
                  </div>
                </div>
                <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 font-bold group-hover:bg-gold group-hover:text-black transition-all flex items-center justify-center gap-2">
                  View Case Study <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Talent Hub */}
      <section className="pb-24 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">The Talent Hub</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {talent.map((person, i) => (
            <div key={i} className="glass p-8 rounded-3xl text-center group border-white/5 relative overflow-hidden">
              {person.project && <span className="absolute top-4 right-4 bg-blue-electric/20 text-blue-400 px-3 py-1 rounded-lg text-[10px] font-bold">Project: {person.project}</span>}
              <div className="w-32 h-32 rounded-full border-2 border-gold/30 p-1 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <img src={person.image} className="w-full h-full rounded-full bg-white/5" />
              </div>
              <h3 className="text-xl font-bold">{person.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{person.role}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {person.skills.map((s, idx) => <span key={idx} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] border border-white/10">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}