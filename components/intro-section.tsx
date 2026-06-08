"use client";

import { Button } from "@/components/ui/button";

const products = [
  { name: "Learning Management System (LMS)", description: "Comprehensive online learning platform" },
  { name: "Customer Relationship Management (CRM)", description: "Streamline customer interactions" },
  { name: "Enterprise Resource Planning (ERP)", description: "Integrated business management" },
  { name: "Custom Business Applications", description: "Tailored software solutions" },
];

export function IntroSection() {
  return (
    
    <section className="pt-6 pb-20 bg-card relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-deep/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-electric/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
         
          <div className="relative group">
            <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
              <img 
                src="/about-us.jpg" 
                alt="About V-Productions"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
             
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-deep/40 to-transparent pointer-events-none" />
            </div>
            
           
            <div className="absolute -bottom-4 -left-4 bg-gold w-20 h-20 rounded-2xl -z-10 opacity-50 blur-xl animate-pulse" />
          </div>

          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Business Solutions{" "}
              <span className="text-blue-electric">Catered</span> to Your{" "}
              <span className="gradient-text">Needs</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              We deliver comprehensive digital solutions that drive growth and efficiency. Our team of experts crafts tailored software that transforms the way you do business.
            </p>

            <div className="space-y-4">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl glass border border-white/5 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 group cursor-default"
                >
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center mt-1 group-hover:bg-gold/40 transition-colors">
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
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="bg-gold text-accent-foreground hover:bg-gold-light font-bold px-8 py-6 rounded-2xl shadow-lg shadow-gold/20 transition-all">
              Explore Solutions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}