"use client";

import { useState } from "react";
import { Code, Palette, Database, Bot, BarChart3, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Code,
    title: "Web Development",
    shortDesc: "Modern web applications",
    fullDesc: "Build scalable, responsive web applications using the latest technologies. From single-page apps to complex enterprise platforms, we deliver high-performance solutions.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    shortDesc: "User-centered design",
    fullDesc: "Create intuitive, beautiful interfaces that delight users. Our design process focuses on user research, prototyping, and iterative refinement for optimal experiences.",
  },
  {
    icon: Database,
    title: "Database Solutions",
    shortDesc: "Robust data management",
    fullDesc: "Design and implement efficient database architectures. We handle data modeling, optimization, migration, and maintenance for all major database systems.",
  },
  {
    icon: Bot,
    title: "AI Integration",
    shortDesc: "Intelligent automation",
    fullDesc: "Integrate AI and machine learning into your applications. From chatbots to predictive analytics, we harness AI to solve complex business problems.",
  },
  {
    icon: BarChart3,
    title: "Digital Marketing",
    shortDesc: "Growth-driven strategies",
    fullDesc: "Develop comprehensive digital marketing strategies that drive results. SEO, content marketing, social media, and paid advertising all under one roof.",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    shortDesc: "Scalable infrastructure",
    fullDesc: "Deploy and manage cloud infrastructure on AWS, Azure, or GCP. We handle migration, optimization, security, and ongoing maintenance of your cloud environment.",
  },
];

export function TrainingServices() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="training" className="py-24 bg-card relative overflow-hidden">
   
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-electric/10 rounded-full blur-3xl" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-purple-deep/15 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="text-blue-electric">Services</span> & Training
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive services and training programs to elevate your business
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={cn(
                "group relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer",
                hoveredCard === index ? "scale-105" : ""
              )}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              
              <div
                className={cn(
                  "glass p-8 h-48 transition-all duration-500",
                  hoveredCard === index ? "opacity-0" : "opacity-100"
                )}
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <service.icon className="h-7 w-7 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.shortDesc}</p>
              </div>

             
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br from-purple-deep to-blue-electric p-8 flex flex-col justify-between transition-all duration-500",
                  hoveredCard === index ? "opacity-100" : "opacity-0"
                )}
              >
                <div>
                  <service.icon className="h-8 w-8 text-gold mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {service.fullDesc}
                  </p>
                </div>
                <button className="w-full py-3 bg-gold text-accent-foreground rounded-xl font-semibold hover:bg-gold-light transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
