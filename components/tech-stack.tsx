"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const techCategories = [
  {
    title: "Backend",
    color: "from-purple-deep to-purple-light",
    technologies: ["Node.js", "Python", "Laravel", "Django", "Express.js", "FastAPI"],
  },
  {
    title: "Frontend",
    color: "from-blue-electric to-blue-light",
    technologies: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "AI & ML",
    color: "from-gold to-gold-light",
    technologies: ["OpenAI", "TensorFlow", "PyTorch", "LangChain", "Computer Vision", "NLP"],
  },
  {
    title: "Cloud & DevOps",
    color: "from-blue-electric to-purple-light",
    technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD"],
  },
];

export function TechStack() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 bg-card relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-deep/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-electric/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="gradient-text">Technology Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We leverage cutting-edge technologies to build scalable, secure, and high-performance solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((category, index) => (
            <div
              key={index}
              className={cn(
                "rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer",
                hoveredCard === index ? "scale-105 golden-glow" : "hover:scale-102"
              )}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Header */}
              <div className={cn("p-4 bg-gradient-to-r", category.color)}>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              {/* Content */}
              <div className="bg-muted p-6 space-y-3">
                {category.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/40 transition-colors">
                      <Check className="w-3 h-3 text-gold" />
                    </div>
                    <span className="text-foreground/80 group-hover:text-gold transition-colors">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
