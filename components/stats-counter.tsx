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

      // Easing function for smooth animation
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
    <div className="glass rounded-2xl p-6 md:p-8 text-center group hover:scale-105 transition-transform duration-300 golden-glow-hover">
      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
        <Icon className="h-8 w-8 text-gold" />
      </div>
      <div className="flex items-center justify-center gap-1">
        <span className="text-4xl md:text-5xl font-bold text-gold animate-pulse-glow inline-block">
          {count}
        </span>
        <span className="text-3xl md:text-4xl font-bold text-gold">{suffix}</span>
      </div>
      <p className="mt-2 text-muted-foreground font-medium">{label}</p>
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-deep/30 via-background to-blue-electric/20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Numbers that speak for our commitment to excellence and client satisfaction
          </p>
        </div>

        <div className={cn(
          "grid grid-cols-2 lg:grid-cols-4 gap-6",
          inView ? "animate-fade-in-up" : "opacity-0"
        )}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
