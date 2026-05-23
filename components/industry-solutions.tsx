"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Activity, CreditCard, ShoppingCart, Building2 } from "lucide-react";

const industries = [
  {
    id: "healthcare",
    label: "Healthcare",
    icon: Activity,
    title: "Healthcare Solutions",
    description: "Transform patient care with our comprehensive healthcare technology solutions. From electronic health records to telemedicine platforms, we build HIPAA-compliant systems that improve outcomes and operational efficiency.",
    features: ["Patient Management Systems", "Telemedicine Platforms", "Medical IoT Integration", "Healthcare Analytics"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
  },
  {
    id: "fintech",
    label: "Fintech",
    icon: CreditCard,
    title: "Financial Technology",
    description: "Revolutionize financial services with secure, scalable fintech solutions. We specialize in building payment processing systems, banking applications, and investment platforms that meet regulatory standards.",
    features: ["Payment Gateways", "Banking Applications", "Investment Platforms", "Blockchain Solutions"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
  },
  {
    id: "retail",
    label: "Retail",
    icon: ShoppingCart,
    title: "Retail & E-Commerce",
    description: "Elevate your retail business with cutting-edge e-commerce solutions. Our platforms drive sales, enhance customer experience, and streamline operations from inventory to delivery.",
    features: ["E-Commerce Platforms", "Inventory Management", "Customer Analytics", "Omnichannel Solutions"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  },
  {
    id: "enterprise",
    label: "Enterprise",
    icon: Building2,
    title: "Enterprise Solutions",
    description: "Empower your enterprise with robust, scalable software solutions. We build custom ERP systems, workflow automation tools, and integration platforms that drive digital transformation.",
    features: ["Custom ERP Systems", "Workflow Automation", "System Integration", "Business Intelligence"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
];

export function IndustrySolutions() {
  const [activeTab, setActiveTab] = useState(industries[0].id);
  const activeIndustry = industries.find((i) => i.id === activeTab)!;

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-deep/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Industry <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tailored technology solutions for diverse industries
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setActiveTab(industry.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300",
                activeTab === industry.id
                  ? "bg-gold text-accent-foreground golden-glow"
                  : "glass text-foreground hover:bg-gold/10"
              )}
            >
              <industry.icon className="h-5 w-5" />
              {industry.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-all duration-500"
                style={{ backgroundImage: `url(${activeIndustry.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gold rounded-xl p-4 shadow-lg">
              <activeIndustry.icon className="h-8 w-8 text-accent-foreground" />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              {activeIndustry.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {activeIndustry.description}
            </p>
            <div className="space-y-3">
              {activeIndustry.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
            <button className="px-6 py-3 bg-blue-electric text-white rounded-xl font-semibold hover:bg-blue-light transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
