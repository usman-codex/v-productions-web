"use client";

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  { name: "Learning Management System (LMS)", description: "Comprehensive online learning platform" },
  { name: "Customer Relationship Management (CRM)", description: "Streamline customer interactions" },
  { name: "Enterprise Resource Planning (ERP)", description: "Integrated business management" },
  { name: "Custom Business Applications", description: "Tailored software solutions" },
];

export function IntroSection() {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-deep/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-electric/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Section */}
          <div className="relative group">
            <div className="aspect-video bg-gradient-to-br from-purple-deep to-blue-electric rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80')] bg-cover bg-center opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-deep/60 to-blue-electric/60" />

              {/* Play Button */}
              <button
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gold flex items-center justify-center golden-glow group-hover:scale-110 transition-transform duration-300"
                aria-label="Play video"
              >
                <Play className="h-8 w-8 text-accent-foreground ml-1" fill="currentColor" />
              </button>
            </div>

            {/* Video Caption */}
            <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg px-4 py-2 shadow-lg">
              <p className="text-sm text-muted-foreground">Watch our story</p>
              <p className="text-gold font-semibold">2:30 min</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Business Solutions{" "}
              <span className="text-blue-electric">Catered</span> to Your{" "}
              <span className="gradient-text">Needs</span>
            </h2>

            <p className="text-lg text-muted-foreground">
              We deliver comprehensive digital solutions that drive growth and efficiency. Our team of experts crafts tailored software that transforms the way you do business.
            </p>

            <div className="space-y-4">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl glass hover:bg-gold/5 transition-colors group cursor-pointer"
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

            <Button className="bg-gold text-accent-foreground hover:bg-gold-light font-semibold mt-4">
              Explore Solutions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
