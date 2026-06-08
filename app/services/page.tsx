"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Code,
  Smartphone,
  Cloud,
  BarChart3,
  Palette,
  Search,
  LineChart,
  Database,
  Cpu,
  Stethoscope,
  FileText,
  Globe,
  ShoppingCart,
  Building2,
  HeartPulse,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const serviceCategories = [
  {
    title: "Data Science & AI",
    color: "from-blue-electric to-blue-light",
    borderColor: "border-blue-electric/50",
    services: [
      {
        icon: BarChart3,
        title: "Business Intelligence",
        description: "Transform raw data into actionable insights with advanced BI solutions and dashboards.",
        slug: "business-intelligence",
      },
      {
        icon: Brain,
        title: "Machine Learning",
        description: "Custom ML models for predictive analytics, NLP, and computer vision applications.",
        slug: "machine-learning",
      },
      {
        icon: Stethoscope,
        title: "Clinical Data Analytics",
        description: "Healthcare data solutions compliant with HIPAA and industry standards.",
        slug: "clinical-data-analytics",
      },
      {
        icon: Database,
        title: "Data Engineering",
        description: "Build robust data pipelines and warehouses for scalable data infrastructure.",
        slug: "data-engineering",
      },
    ],
  },
  {
    title: "Software & App Development",
    color: "from-purple-light to-purple-deep",
    borderColor: "border-purple-light/50",
    services: [
      {
        icon: Globe,
        title: "Web Development",
        description: "Full-stack web applications with modern frameworks and responsive designs.",
        slug: "web-development",
      },
      {
        icon: Smartphone,
        title: "Mobile Apps",
        description: "Native and cross-platform mobile applications for iOS and Android.",
        slug: "mobile-apps",
      },
      {
        icon: Code,
        title: "Custom Software",
        description: "Tailored software solutions designed to meet your unique business needs.",
        slug: "custom-software",
      },
      {
        icon: Cpu,
        title: "Legacy Modernization",
        description: "Upgrade outdated systems to modern architectures without disrupting operations.",
        slug: "legacy-modernization",
      },
    ],
  },
  {
    title: "Digital Marketing & Design",
    color: "from-gold to-gold-light",
    borderColor: "border-gold/50",
    services: [
      {
        icon: Search,
        title: "SEO Optimization",
        description: "Boost your online visibility with data-driven SEO strategies and audits.",
        slug: "seo-optimization",
      },
      {
        icon: Palette,
        title: "UI/UX Design",
        description: "Create intuitive, beautiful interfaces that users love to interact with.",
        slug: "ui-ux-design",
      },
      {
        icon: LineChart,
        title: "Social Media Marketing",
        description: "Engage your audience with strategic social media campaigns and content.",
        slug: "social-media-marketing",
      },
      {
        icon: FileText,
        title: "Content Strategy",
        description: "Compelling content that drives traffic, engagement, and conversions.",
        slug: "content-strategy",
      },
    ],
  },
];

const techLogos = [
  "React", "Angular", "Vue.js", "Next.js", "Node.js", "Python", "Laravel", "Flutter",
  "Swift", "Kotlin", "TensorFlow", "PyTorch", "AWS", "Azure", "GCP", "Docker",
  "Kubernetes", "MongoDB", "PostgreSQL", "Redis", "GraphQL", "TypeScript",
];

const industryVerticals = [
  {
    icon: HeartPulse,
    title: "Healthcare",
    description: "HIPAA-compliant solutions for hospitals, clinics, and health tech startups. We specialize in EHR integrations, telemedicine platforms, and clinical data analytics.",
    features: ["EHR Integration", "Telemedicine", "Patient Portals", "Clinical Analytics"],
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Cpu,
    title: "Medtech",
    description: "Innovative solutions for medical device companies and diagnostics labs. From IoT-enabled devices to AI-powered diagnostic tools.",
    features: ["IoT Devices", "AI Diagnostics", "Regulatory Compliance", "Data Pipelines"],
    color: "from-blue-electric to-cyan-400",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "End-to-end e-commerce solutions from storefront to fulfillment. We build platforms that convert visitors into loyal customers.",
    features: ["Custom Storefronts", "Payment Integration", "Inventory Management", "Analytics"],
    color: "from-gold to-orange-400",
  },
];

const techExpertise = [
  {
    title: "Backend",
    headerColor: "bg-purple-deep",
    glowColor: "shadow-purple-deep/50",
    slug: "backend-development",
    technologies: [
      "Node.js",
      "Python",
      "Java",
      "Go",
      ".NET Core",
      "PHP/Laravel",
      "Ruby on Rails",
      "GraphQL",
    ],
  },
  {
    title: "Frontend",
    headerColor: "bg-blue-electric",
    glowColor: "shadow-blue-electric/50",
    slug: "frontend-development",
    technologies: [
      "React",
      "Next.js",
      "Angular",
      "Vue.js",
      "TypeScript",
      "Tailwind CSS",
      "Svelte",
      "Redux",
    ],
  },
  {
    title: "AI & ML",
    headerColor: "bg-gold",
    glowColor: "shadow-gold/50",
    slug: "machine-learning",
    technologies: [
      "TensorFlow",
      "PyTorch",
      "OpenAI",
      "Langchain",
      "Scikit-learn",
      "Hugging Face",
      "Computer Vision",
      "NLP",
    ],
  },
  {
    title: "Cloud & DevOps",
    headerColor: "bg-gradient-to-r from-blue-electric to-purple-light",
    glowColor: "shadow-blue-electric/50",
    slug: "data-engineering",
    technologies: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "Terraform",
      "CI/CD",
      "Jenkins",
    ],
  },
];

export default function ServicesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 pb-20"
      >
       
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-background to-background" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-electric/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-light/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-gold text-sm font-medium">Our Services</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Top-notch Software &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">
                Digital Services
              </span>
              <br />
              for Global Success
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              We blend cutting-edge expertise with innovative technology to deliver solutions that 
              transform businesses and drive measurable results across industries.
            </p>

            
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gold text-accent-foreground hover:bg-gold-light font-bold text-lg px-10 py-6 rounded-full shadow-lg shadow-gold/25 hover:shadow-gold/40 transition-all duration-300"
              >
                Book a Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Service Categories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions tailored to your industry and business needs
            </p>
          </div>

          <div className="space-y-16">
            {serviceCategories.map((category, catIndex) => (
              <div key={catIndex}>
               
                <div className="flex items-center gap-4 mb-8">
                  <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${category.color}`} />
                  <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                  <div className={`h-1 flex-1 rounded-full bg-gradient-to-r ${category.color} opacity-30`} />
                </div>

               
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.services.map((service, index) => (
                    <Link
                      key={index}
                      href={`/services/${service.slug}`}
                      className={`group relative p-6 rounded-2xl glass border ${category.borderColor} hover:border-gold/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-gold/10`}
                    >
                     
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-transparent transition-all duration-500" />
                      
                      <div className="relative z-10">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <service.icon className="h-7 w-7 text-white" />
                        </div>
                        
                        <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                          {service.title}
                        </h4>
                        
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {service.description}
                        </p>
                        
                        <span className="inline-flex items-center text-gold font-medium text-sm group-hover:gap-2 transition-all">
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-purple-deep/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Technology Expertise
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our technical prowess spans across the full stack of modern technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techExpertise.map((category, index) => (
              <Link
                key={index}
                href={`/services/${category.slug}`}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                 
                  <div
                    className={`${category.headerColor} h-16 rounded-t-2xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg ${category.glowColor}`}
                  >
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  </div>
                  
                  
                  <div className="bg-[#1a1a2e] rounded-b-2xl p-6 border-x border-b border-foreground/10">
                    <ul className="space-y-3">
                      {category.technologies.map((tech, techIndex) => (
                        <li
                          key={techIndex}
                          className="flex items-center gap-3 text-foreground/80 group-hover:text-foreground transition-colors"
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-gold" />
                          </div>
                          <span className="font-medium">{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border-2 border-gold/30" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-16 bg-purple-deep/30 overflow-hidden">
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-2xl font-bold text-foreground text-center">
            Technologies We Master
          </h2>
        </div>
        
        <div className="relative">
         
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          
          <div className="flex animate-marquee mb-4">
            {[...techLogos, ...techLogos].map((tech, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 px-6 py-3 rounded-full glass border border-foreground/10 hover:border-gold/50 transition-colors"
              >
                <span className="text-foreground/80 font-medium whitespace-nowrap">{tech}</span>
              </div>
            ))}
          </div>
          
         
          <div className="flex animate-marquee-reverse">
            {[...techLogos.slice().reverse(), ...techLogos.slice().reverse()].map((tech, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 px-6 py-3 rounded-full glass border border-foreground/10 hover:border-blue-electric/50 transition-colors"
              >
                <span className="text-foreground/80 font-medium whitespace-nowrap">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Industry Specialization
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Deep expertise in high-growth verticals with proven track records
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {industryVerticals.map((vertical, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl glass border border-foreground/10 hover:border-gold/30 transition-all duration-500 overflow-hidden"
              >
                
                <div className={`absolute inset-0 bg-gradient-to-br ${vertical.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${vertical.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <vertical.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-gold transition-colors">
                    {vertical.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {vertical.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {vertical.features.map((feature, fIndex) => (
                      <span
                        key={fIndex}
                        className="px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-sm text-foreground/80"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-deep via-blue-electric/20 to-purple-deep" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {"Let's discuss how our services can help you achieve your goals. Schedule a free consultation today."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gold text-accent-foreground hover:bg-gold-light font-bold text-lg px-10 py-6 rounded-full"
            >
              Schedule a Call
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gold text-gold hover:bg-gold/10 font-bold text-lg px-10 py-6 rounded-full"
            >
              View Our Portfolio
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
