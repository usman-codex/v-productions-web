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
    image: "/industries/healthcare.jpg", // Local image path
  },
  {
    id: "fintech",
    label: "Fintech",
    icon: CreditCard,
    title: "Financial Technology",
    description: "Revolutionize financial services with secure, scalable fintech solutions. We specialize in building payment processing systems, banking applications, and investment platforms that meet regulatory standards.",
    features: ["Payment Gateways", "Banking Applications", "Investment Platforms", "Blockchain Solutions"],
    image: "/industries/fintech.jpg", // Local image path
  },
  {
    id: "retail",
    label: "Retail",
    icon: ShoppingCart,
    title: "Retail & E-Commerce",
    description: "Elevate your retail business with cutting-edge e-commerce solutions. Our platforms drive sales, enhance customer experience, and streamline operations from inventory to delivery.",
    features: ["E-Commerce Platforms", "Inventory Management", "Customer Analytics", "Omnichannel Solutions"],
    image: "/industries/retail.jpg", // Local image path
  },
  {
    id: "enterprise",
    label: "Enterprise",
    icon: Building2,
    title: "Enterprise Solutions",
    description: "Empower your enterprise with robust, scalable software solutions. We build custom ERP systems, workflow automation tools, and integration platforms that drive digital transformation.",
    features: ["Custom ERP Systems", "Workflow Automation", "System Integration", "Business Intelligence"],
    image: "/industries/enterprise.jpg", // Local image path
  },
];

export function IndustrySolutions() {
  const [activeTab, setActiveTab] = useState(industries[0].id);
  const activeIndustry = industries.find((i) => i.id === activeTab)!;

  return (
    // Gap kam karne ke liye pt-24 ko pt-12 kar diya gaya hai
    <section className="pt-12 pb-24 bg-card relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-deep/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
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
                  ? "bg-gold text-accent-foreground shadow-lg shadow-gold/20"
                  : "bg-white/5 text-foreground hover:bg-gold/10"
              )}
            >
              <industry.icon className="h-5 w-5" />
              {industry.label}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Local Image (No Video/Watch-time) */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/10">
              <img 
                src={activeIndustry.image} 
                alt={activeIndustry.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Overlay for better blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            
            {/* Industry Icon Badge */}
            <div className="absolute -bottom-4 -right-4 bg-gold rounded-2xl p-5 shadow-2xl">
              <activeIndustry.icon className="h-8 w-8 text-black" />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              {activeIndustry.title}
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {activeIndustry.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeIndustry.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                  <span className="text-foreground text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
              Explore More
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}