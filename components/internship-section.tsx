"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link"; 

const benefits = [
  "Real-world project experience with industry mentors",
  "Hands-on training in cutting-edge technologies",
  "Certificate upon successful completion",
  "Networking opportunities with tech professionals",
  "Potential for full-time employment",
  "Flexible remote work options available",
];

export function InternshipSection() {
  return (
    <section id="internship" className="py-24 relative overflow-hidden">
     
      <div className="absolute inset-0 bg-gradient-to-r from-purple-deep/30 via-background to-blue-electric/20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
       
          <div className="space-y-6">
            <div className="inline-block px-4 py-1 rounded-full bg-gold/10 border border-gold/30">
              <span className="text-gold font-semibold text-sm">Now Accepting Applications</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Launch Your Career with Our{" "}
              <span className="gradient-text">Internship Program</span>
            </h2>

            <p className="text-lg text-muted-foreground">
              Join our intensive internship program and gain practical experience working on real projects. Learn from industry experts and kickstart your tech career with hands-on training.
            </p>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center mt-0.5">
                    <svg
                      className="w-4 h-4 text-gold"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-foreground/90">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              
              <Link href="/internship">
                <Button
                  size="lg"
                  className="bg-gold text-accent-foreground hover:bg-gold-light font-semibold golden-glow-hover w-full sm:w-auto"
                >
                  Apply Now
                </Button>
              </Link>
              
              
            </div>
          </div>

      
          <div className="relative flex items-center justify-center">
           
            <div className="relative w-72 h-72 md:w-96 md:h-96">
             
              <div className="absolute inset-0 animate-rotate-badge">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                    />
                  </defs>
                  <text className="fill-gold text-xs font-bold uppercase tracking-widest">
                    <textPath href="#circlePath">
                      • 100% PRACTICAL HANDS-ON • LEARN BY DOING • REAL PROJECTS •
                    </textPath>
                  </text>
                </svg>
              </div>

             
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex flex-col items-center justify-center golden-glow">
                  <span className="text-5xl md:text-6xl font-bold text-gold">100%</span>
                  <span className="text-foreground font-semibold mt-2">Practical</span>
                  <span className="text-muted-foreground text-sm">Hands-On Training</span>
                </div>
              </div>
            </div>

           
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-electric rounded-full animate-float" />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-light rounded-full animate-float" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-gold rounded-full animate-float" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      </div>
    </section>
  );
}