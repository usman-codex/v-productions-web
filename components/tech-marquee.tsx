"use client";

import { useEffect, useState } from "react";

const techLogos = [
  { name: "Node.js", color: "#339933" },
  { name: "React", color: "#61DAFB" },
  { name: "OpenAI", color: "#00A67E" },
  { name: "AWS", color: "#FF9900" },
  { name: "Laravel", color: "#FF2D20" },
  { name: "Python", color: "#3776AB" },
  { name: "Next.js", color: "#FFFFFF" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "MongoDB", color: "#47A248" },
  { name: "PostgreSQL", color: "#4169E1" },
  { name: "Docker", color: "#2496ED" },
  { name: "Kubernetes", color: "#326CE5" },
  { name: "Vercel", color: "#FFFFFF" },
  { name: "TensorFlow", color: "#FF6F00" },
  { name: "Azure", color: "#0089D6" },
  { name: "GraphQL", color: "#E10098" },
];

export function TechMarquee() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-16 bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <h3 className="text-lg text-muted-foreground mb-2">Technologies We Work With</h3>
          <p className="text-gold font-semibold">Trusted by Industry Leaders</p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/50 to-transparent z-10" />

        {/* First Row - Left to Right */}
        <div className="flex overflow-hidden mb-6">
          <div className="flex animate-marquee">
            {[...techLogos, ...techLogos].map((logo, index) => (
              <div
                key={`row1-${index}`}
                className="flex items-center gap-2 px-8 py-4 mx-4 glass rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer whitespace-nowrap"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: logo.color }}
                />
                <span className="text-foreground font-medium">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee-reverse">
            {[...techLogos.slice().reverse(), ...techLogos.slice().reverse()].map((logo, index) => (
              <div
                key={`row2-${index}`}
                className="flex items-center gap-2 px-8 py-4 mx-4 glass rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer whitespace-nowrap"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: logo.color }}
                />
                <span className="text-foreground font-medium">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
