"use client";

import { useEffect, useState, useRef } from "react";
import { Users, Briefcase, Award, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { icon: Users, value: 50, suffix: "+", label: "Happy Clients" },
  { icon: Briefcase, value: 100, suffix: "+", label: "Projects Completed" },
  { icon: Award, value: 15, suffix: "+", label: "Industry Awards" },
  { icon: Globe, value: 25, suffix: "+", label: "Countries Served" },
];

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuad = (t: number) => t * (2 - t);
      setCount(Math.floor(easeOutQuad(progress) * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, start]);

  return count;
}

function StatCard({ icon: Icon, value, suffix, label, inView }: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
}) {
  const count = useCountUp(value, 2000, inView);

  return (
    
    <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-[2rem] p-8 text-center group hover:border-gold/30 transition-all duration-500">
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon className="h-8 w-8 text-gold" />
      </div>
      
      
      <div className="flex items-center justify-center gap-1 bg-transparent">
        <span className="text-4xl md:text-5xl font-black text-gold tracking-tighter">
          {count}
        </span>
        <span className="text-3xl md:text-4xl font-bold text-gold">{suffix}</span>
      </div>
      
      <p className="mt-3 text-gray-400 font-medium text-lg uppercase tracking-wide text-xs">
        {label}
      </p>
    </div>
  );
}

export function StatsCounter() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#060610] relative overflow-hidden">
     
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-gold">Achievements</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium opacity-80">
            Numbers that speak for our commitment to excellence and client satisfaction
          </p>
        </div>

        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000",
          inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}