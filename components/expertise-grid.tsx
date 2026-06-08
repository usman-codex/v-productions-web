"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const expertiseCategories = [
  {
    id: 1,
    title: "Backend Development",
    headerColor: "bg-purple-600",
    glowColor: "shadow-purple-500/50",
    technologies: [
      "Node.js",
      "Python",
      "Java Spring Boot",
      "Django REST",
      "GraphQL",
      "PostgreSQL",
      "MongoDB",
    ],
  },
  {
    id: 2,
    title: "Frontend & UI/UX",
    headerColor: "bg-sky-500",
    glowColor: "shadow-sky-400/50",
    technologies: [
      "React.js",
      "Next.js",
      "Vue.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Figma",
    ],
  },
  {
    id: 3,
    title: "AI & Machine Learning",
    headerColor: "bg-gradient-to-r from-amber-500 to-yellow-400",
    glowColor: "shadow-amber-400/50",
    technologies: [
      "OpenAI GPT",
      "TensorFlow",
      "PyTorch",
      "LangChain",
      "Hugging Face",
      "Computer Vision",
      "NLP Models",
    ],
  },
  {
    id: 4,
    title: "Cloud & DevOps",
    headerColor: "bg-gradient-to-r from-indigo-600 to-violet-600",
    glowColor: "shadow-indigo-500/50",
    technologies: [
      "AWS",
      "Google Cloud",
      "Azure",
      "Docker",
      "Kubernetes",
      "CI/CD Pipelines",
      "Terraform",
    ],
  },
];

export function ExpertiseGrid() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-semibold tracking-wider uppercase text-sm"
          >
            Our Tech Stack
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-foreground mt-3 text-balance"
          >
            Specialized Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-4 max-w-2xl mx-auto text-pretty"
          >
            We leverage cutting-edge technologies across multiple domains to deliver exceptional solutions
          </motion.p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertiseCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="h-full flex flex-col overflow-hidden rounded-xl transition-all duration-300">
               
                <div
                  className={`${category.headerColor} px-5 py-4 rounded-t-xl transition-all duration-300 group-hover:shadow-lg ${category.glowColor}`}
                >
                  <h3 className="text-white font-bold text-lg tracking-tight">
                    {category.title}
                  </h3>
                </div>

               
                <div className="flex-1 bg-zinc-900 px-5 py-6 rounded-b-xl border border-zinc-800 border-t-0 transition-all duration-300 group-hover:border-zinc-700">
                  <ul className="space-y-3">
                    {category.technologies.map((tech, techIndex) => (
                      <motion.li
                        key={tech}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-gold" />
                        </span>
                        <span className="text-white/90 font-medium text-sm">
                          {tech}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
