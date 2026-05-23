"use client";

import { Users, Cog, Sparkles } from "lucide-react";

const models = [
  {
    icon: Users,
    title: "Extended Team",
    description: "Augment your existing team with our skilled professionals. We seamlessly integrate with your workflows, processes, and tools to accelerate your project delivery.",
    features: ["Dedicated Resources", "Flexible Scaling", "Direct Communication", "Skill Matching"],
    color: "purple-deep",
  },
  {
    icon: Cog,
    title: "Managed Team",
    description: "Let us handle the entire project lifecycle. Our managed teams take full ownership from planning to deployment, ensuring quality and timely delivery.",
    features: ["End-to-End Management", "Quality Assurance", "Regular Reporting", "Risk Mitigation"],
    color: "blue-electric",
  },
  {
    icon: Sparkles,
    title: "Custom Solutions",
    description: "Get tailored solutions designed specifically for your unique business challenges. We analyze, design, and build custom software that fits your exact needs.",
    features: ["Bespoke Development", "Scalable Architecture", "Integration Ready", "Ongoing Support"],
    color: "gold",
  },
];

export function EngagementModels() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Engagement <span className="gradient-text">Models</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Flexible engagement models designed to meet your specific requirements
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <div
              key={index}
              className="group glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 golden-glow-hover relative overflow-hidden"
            >
              {/* Background Glow */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-${model.color}/20 rounded-full blur-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100`}
              />

              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-${model.color}/10 flex items-center justify-center mb-6 group-hover:bg-${model.color}/20 transition-colors`}>
                  <model.icon className={`h-8 w-8 text-${model.color}`} />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-gold transition-colors">
                  {model.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {model.description}
                </p>

                <div className="space-y-2">
                  {model.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span className="text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="mt-8 w-full py-3 bg-gold/10 text-gold rounded-xl font-semibold hover:bg-gold hover:text-accent-foreground transition-all duration-300">
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
