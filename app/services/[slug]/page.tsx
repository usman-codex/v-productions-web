"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Code,
  Palette,
  Shield,
  Zap,
  Search,
  Layers,
  Rocket,
  TestTube,
  Globe,
  Smartphone,
  Brain,
  BarChart3,
  Database,
  Cpu,
  Stethoscope,
  FileText,
  LineChart,
  Server,
  Terminal,
  Workflow,
  TrendingUp,
  Share2,
  PenTool,
  Users,
  Target,
  Activity,
  CloudCog,
  ShieldCheck,
  Globe2,
  Monitor,
  Component,
  Laptop,
  AppWindow,
  Briefcase,
} from "lucide-react";

// --- INTERFACE ---
interface ServiceData {
  title: string;
  tagline: string;
  visualImage: string;
  introduction: string[];
  expertise: {
    icon: any;
    title: string;
    description: string;
  }[];
  techStack: string[];
  process: {
    step: string;
    description: string;
  }[];
}

// --- ALL SERVICES DATA (MUKAMMAL 13 CATEGORIES) ---
const servicesData: Record<string, ServiceData> = {
  "web-development": {
    title: "Web Development",
    tagline: "Building Digital Experiences That Convert",
    visualImage: "/services/web-detail.jpg",
    introduction: [
      "Your website is the digital face of your business. We build high-performance, responsive websites that combine aesthetic appeal with functional excellence.",
      "Using Next.js, React, and modern CSS frameworks, we ensure your site is lightning fast, secure, and SEO optimized from day one.",
      "Our approach focuses on user-centric design, ensuring that every visitor has a seamless experience regardless of the device they use."
    ],
    expertise: [
      { icon: Code, title: "Custom Web Apps", description: "Tailored web applications built for your specific business logic and workflows." },
      { icon: Zap, title: "Performance First", description: "Ultra-fast loading speeds for better user retention and search engine rankings." },
      { icon: Globe, title: "E-commerce", description: "Scalable online stores with seamless payment integrations and inventory systems." },
      { icon: Shield, title: "Secure Architecture", description: "Enterprise-grade security standards to protect your users and data assets." },
    ],
    techStack: ["Next.js", "React", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "MongoDB", "Vercel"],
    process: [
      { step: "Planning", description: "Requirement gathering, competitor analysis, and sitemap design." },
      { step: "UI/UX Design", description: "Creating visual prototypes and user interaction flows." },
      { step: "Development", description: "Agile coding with regular updates and feedback cycles." },
      { step: "QA Testing", description: "Cross-browser and device testing for 100% bug-free delivery." },
      { step: "Deployment", description: "Launching on global edge servers with continuous monitoring." },
    ],
  },

  "mobile-apps": {
    title: "Mobile Apps",
    tagline: "Native & Cross-Platform Excellence",
    visualImage: "/services/mobile-detail.jpg",
    introduction: [
      "In a mobile-first world, we create intuitive apps that provide a seamless user experience across iOS and Android.",
      "Whether it is a native app or a hybrid cross-platform solution, we leverage technologies that ensure high performance.",
      "We focus on creating apps that not only look stunning but are also light on system resources and easy to navigate."
    ],
    expertise: [
      { icon: Smartphone, title: "Native Development", description: "Deeply integrated apps using Swift for iOS and Kotlin for Android." },
      { icon: Palette, title: "Mobile UI/UX", description: "Modern, thumb-friendly interfaces designed specifically for mobile screens." },
      { icon: Zap, title: "Fast Interaction", description: "Optimization for low latency, smooth animations, and high responsiveness." },
      { icon: Shield, title: "Data Security", description: "Biometric authentication and secure local data encryption for app safety." },
    ],
    techStack: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "SQLite", "GraphQL"],
    process: [
      { step: "Ideation", description: "Defining the core features and user personas for the app." },
      { step: "Prototyping", description: "Building interactive wireframes to test the app logic." },
      { step: "App Coding", description: "Modular development focusing on security and speed." },
      { step: "Testing", description: "Beta testing on various physical mobile devices." },
      { step: "Submission", description: "Handling App Store and Play Store guidelines for launch." },
    ],
  },

  "machine-learning": {
    title: "Machine Learning",
    tagline: "Intelligent AI Solutions for Complex Problems",
    visualImage: "/services/ml-detail.jpg",
    introduction: [
      "Unlock the hidden potential of your business data. Our ML engineers build custom models that automate decisions.",
      "We specialize in predictive analytics, natural language processing (NLP), and computer vision for modern startups.",
      "Our models are designed to learn from every interaction, becoming more efficient and accurate over time."
    ],
    expertise: [
      { icon: Brain, title: "Predictive AI", description: "Advanced models that forecast future sales, trends, and customer behavior." },
      { icon: Search, title: "NLP Solutions", description: "Intelligent chatbots, sentiment analysis, and automated document reading." },
      { icon: Cpu, title: "Deep Learning", description: "Neural networks for complex pattern recognition." },
      { icon: BarChart3, title: "Data Insights", description: "Transforming raw numbers into visual stories for strategic decisions." },
    ],
    techStack: ["Python", "TensorFlow", "PyTorch", "Scikit-Learn", "Pandas", "AWS SageMaker", "MLflow"],
    process: [
      { step: "Data Audit", description: "Evaluating existing data quality and sources." },
      { step: "Data Prep", description: "Cleaning, labeling, and feature engineering for accuracy." },
      { step: "Model Train", description: "Running algorithms to find the best fit for your problem." },
      { step: "Validation", description: "Testing models against real-world scenarios." },
      { step: "Integration", description: "Deploying AI models into your live software environment." },
    ],
  },

  "backend-development": {
    title: "Backend Development",
    tagline: "Robust Engines for Digital Power",
    visualImage: "/services/backend-detail.jpg",
    introduction: [
      "The strength of any application lies in its backend. We build secure and scalable architectures for heavy apps.",
      "From complex database optimization to real-time API logic, we ensure stability and data integrity.",
      "Our backends are designed to handle millions of requests without compromising on speed or security."
    ],
    expertise: [
      { icon: Server, title: "API Architecture", description: "Designing high-performance RESTful and GraphQL API ecosystems." },
      { icon: Database, title: "Database Design", description: "Optimized SQL and NoSQL schemas for massive data throughput." },
      { icon: Terminal, title: "Microservices", description: "Breaking down complex apps into manageable, scalable cloud services." },
      { icon: Shield, title: "Access Control", description: "JWT, OAuth, and multi-factor authentication for data protection." },
    ],
    techStack: ["Node.js", "Python", "Go-Lang", "Docker", "Kubernetes", "Redis", "PostgreSQL", "AWS"],
    process: [
      { step: "Arch Planning", description: "Mapping out the server and database infrastructure." },
      { step: "Logic Build", description: "Writing the core business rules and data handlers." },
      { step: "API Design", description: "Building the bridges between frontend and database." },
      { step: "Perf Tuning", description: "Identifying and removing server bottlenecks." },
      { step: "Scaling", description: "Auto-scaling configuration for traffic spikes." },
    ],
  },

  "business-intelligence": {
    title: "Business Intelligence",
    tagline: "Data-Driven Decision Making",
    visualImage: "/services/bi-detail.jpg",
    introduction: [
      "Stop guessing and start knowing. Our BI solutions help you visualize raw data into actionable dashboards.",
      "We help organizations identify trends, spot inefficiencies, and uncover new growth opportunities.",
      "Our dashboards provide real-time visibility into your business KPIs from anywhere in the world."
    ],
    expertise: [
      { icon: BarChart3, title: "Custom Dashboards", description: "Interactive, real-time data visualizations tailored to your needs." },
      { icon: Database, title: "Data Warehousing", description: "Centralizing disparate data sources into a single source of truth." },
      { icon: Zap, title: "ETL Pipelines", description: "Automated cleaning and moving of data from source to storage." },
      { icon: FileText, title: "Reporting", description: "Automated monthly and weekly reports delivered to your inbox." },
    ],
    techStack: ["Power BI", "Tableau", "Snowflake", "BigQuery", "SQL", "Looker", "Python"],
    process: [
      { step: "Discovery", description: "Defining which metrics matter most for your business." },
      { step: "ETL Build", description: "Connecting and automating data extraction." },
      { step: "Visualization", description: "Creating intuitive and beautiful dashboards." },
      { step: "User Training", description: "Teaching your team how to read and use data." },
      { step: "Support", description: "Refining dashboards as your business grows." },
    ],
  },

  "clinical-data-analytics": {
    title: "Clinical Data Analytics",
    tagline: "HIPAA Compliant Healthcare Insights",
    visualImage: "/services/clinical-detail.jpg",
    introduction: [
      "Improve patient outcomes with specialized healthcare data analysis. We provide secure insights for medical teams.",
      "From hospital readmission rates to clinical trial efficacy, our analytics help professionals deliver better care.",
      "We strictly adhere to HIPAA and GDPR standards to ensure patient privacy is always protected."
    ],
    expertise: [
      { icon: Stethoscope, title: "Patient Outcomes", description: "Deep analysis of medical records to identify improvement areas." },
      { icon: Brain, title: "Predictive Health", description: "Risk stratification models to identify high-risk patients early." },
      { icon: ShieldCheck, title: "Compliance Tech", description: "Securing clinical data with high-level encryption and audits." },
      { icon: Activity, title: "EHR Integration", description: "Optimizing and analyzing Electronic Health Record systems." },
    ],
    techStack: ["HL7 FHIR", "AWS HealthLake", "Python", "SQL", "Tableau", "R-Studio"],
    process: [
      { step: "Data Audit", description: "Checking for data accuracy and privacy compliance." },
      { step: "Modeling", description: "Developing algorithms for clinical health metrics." },
      { step: "Validation", description: "Testing results against established medical benchmarks." },
      { step: "Deployment", description: "Integrating analytics into hospital workflows." },
      { step: "Monitoring", description: "Ensuring 24/7 reliability of healthcare data." },
    ],
  },

  "data-engineering": {
    title: "Data Engineering",
    tagline: "Building Robust Data Infrastructures",
    visualImage: "/services/data-detail.jpg",
    introduction: [
      "Great analytics start with great data engineering. We build the pipelines that collect, clean, and store your data.",
      "We design infrastructures that handle petabytes of information with high availability and security.",
      "Our engineering team ensures that your AI and BI teams always have fresh, clean data ready."
    ],
    expertise: [
      { icon: Workflow, title: "ETL Development", description: "Automated workflows to extract and transform complex datasets." },
      { icon: CloudCog, title: "Data Lakes", description: "Scalable storage for massive amounts of structured and raw data." },
      { icon: Zap, title: "Stream Processing", description: "Real-time data ingestion using Kafka, Spark, and Flink." },
      { icon: Shield, title: "Data Governance", description: "Ensuring data lineage, quality control, and access rights." },
    ],
    techStack: ["Apache Spark", "Kafka", "Airflow", "dbt", "Snowflake", "Terraform", "Python"],
    process: [
      { step: "Source Map", description: "Identifying every data origin in your ecosystem." },
      { step: "Architecture", description: "Designing the cloud data platform." },
      { step: "Pipeline", description: "Building the code that moves and cleans data." },
      { step: "Automation", description: "Setting up monitors and self-healing scripts." },
      { step: "Optimizing", description: "Reducing cloud costs and increasing pipeline speed." },
    ],
  },

  "custom-software": {
    title: "Custom Software",
    tagline: "Tailored Solutions for Unique Challenges",
    visualImage: "/services/custom-detail.jpg",
    introduction: [
      "One size does not fit all. We build bespoke software that maps perfectly to your unique business processes.",
      "Whether you need an internal ERP or a customer-facing portal, we build with your specific goals in mind.",
      "Our software is designed to be scalable, allowing you to add features as your company expands."
    ],
    expertise: [
      { icon: Monitor, title: "Enterprise ERP", description: "Comprehensive systems to manage HR, Finance, and Inventory." },
      { icon: Component, title: "Internal Tools", description: "Dashboards and automation scripts for team productivity." },
      { icon: AppWindow, title: "B2B Portals", description: "Secure platforms for client communication and file sharing." },
      { icon: Code, title: "API Development", description: "Building the custom connectors that link all your systems." },
    ],
    techStack: ["Java", "C#", ".NET", "Node.js", "Angular", "React", "SQL Server"],
    process: [
      { step: "Requirement", description: "Detailed analysis of your manual business tasks." },
      { step: "Blueprint", description: "Designing the software architecture and logic flow." },
      { step: "Agile Dev", description: "Coding in two-week sprints with constant demo sessions." },
      { step: "Testing", description: "Rigorous UAT to ensure it fits your team's needs." },
      { step: "Deployment", description: "Installation, training, and ongoing technical support." },
    ],
  },

  "legacy-modernization": {
    title: "Legacy Modernization",
    tagline: "Upgrade Your Tech Without the Risk",
    visualImage: "/services/legacy-detail.jpg",
    introduction: [
      "Old systems hold you back. We help you migrate legacy apps to modern, cloud-native architectures.",
      "We minimize business disruption while upgrading your core tech stack for better security and speed.",
      "Modernization allows you to utilize new features like AI, cloud-scaling, and modern APIs."
    ],
    expertise: [
      { icon: CloudCog, title: "Cloud Migration", description: "Safely moving on-premise servers to AWS, Azure, or GCP." },
      { icon: Laptop, title: "Refactoring", description: "Cleaning old codebases to improve maintenance and speed." },
      { icon: Server, title: "Re-platforming", description: "Moving apps to modern frameworks while keeping data intact." },
      { icon: Shield, title: "Security Patching", description: "Updating outdated libraries to prevent modern cyber threats." },
    ],
    techStack: ["Docker", "Kubernetes", "AWS", "Azure", "Terraform", "CI/CD Pipelines"],
    process: [
      { step: "Audit", description: "Scanning old code for risks and dependencies." },
      { step: "Roadmap", description: "Step-by-step plan to modernize without downtime." },
      { step: "Migration", description: "Phased moving of data and logic to new tech." },
      { step: "Validation", description: "Ensuring the new system works exactly like the old one." },
      { step: "Optimization", description: "Improving the new environment for cost and speed." },
    ],
  },

  "seo-optimization": {
    title: "SEO Optimization",
    tagline: "Dominate Search Engine Rankings",
    visualImage: "/services/seo-detail.jpg",
    introduction: [
      "If they can't find you, they can't buy from you. We help your business reach the top of search results.",
      "Our SEO approach is purely white-hat, focusing on technical health, content, and authority.",
      "We track everything from keyword positions to user behavior to maximize your organic ROI."
    ],
    expertise: [
      { icon: Search, title: "Technical SEO", description: "Optimizing site speed, mobile-friendliness, and indexing." },
      { icon: TrendingUp, title: "Keyword Strategy", description: "Targeting the high-converting terms that your buyers search." },
      { icon: Globe2, title: "On-Page SEO", description: "Structuring content and meta-tags for search engine clarity." },
      { icon: LineChart, title: "Backlink Building", description: "Earning authority through high-quality external citations." },
    ],
    techStack: ["Ahrefs", "SEMrush", "Google Search Console", "Screaming Frog", "PageSpeed Insights"],
    process: [
      { step: "SEO Audit", description: "Finding technical errors that prevent ranking." },
      { step: "Keyword Map", description: "Assigning target terms to specific pages." },
      { step: "Content Fix", description: "Updating site copy to be search friendly." },
      { step: "Off-Page", description: "Building high-quality link profiles." },
      { step: "Review", description: "Monthly ranking and traffic reporting." },
    ],
  },

  "ui-ux-design": {
    title: "UI/UX Design",
    tagline: "Designs That Delight and Convert",
    visualImage: "/services/uiux-detail.jpg",
    introduction: [
      "Visuals catch eyes, but experience wins hearts. We create digital products that are easy and fun to use.",
      "Our design process starts with understanding your users' psychological triggers and needs.",
      "We build design systems that grow with your product, ensuring consistency across all screens."
    ],
    expertise: [
      { icon: PenTool, title: "Visual Design", description: "Stunning, brand-aligned interfaces that leave a lasting impression." },
      { icon: Search, title: "UX Research", description: "Real-world user testing and heatmaps to find pain points." },
      { icon: Layers, title: "Prototyping", description: "Interactive app models to test logic before dev begins." },
      { icon: Code, title: "Design Handoff", description: "Detailed specs and assets for seamless development." },
    ],
    techStack: ["Figma", "Adobe XD", "Sketch", "Framer", "Principle", "Zeplin"],
    process: [
      { step: "User Discovery", description: "Interviewing users to find their frustrations." },
      { step: "Wireframes", description: "Creating the basic structural layout." },
      { step: "High-Fi Design", description: "Adding colors, images, and brand soul." },
      { step: "Prototypes", description: "Linking screens to simulate the real app." },
      { step: "Dev Sync", description: "Reviewing design with engineers for feasibility." },
    ],
  },

  "social-media-marketing": {
    title: "Social Media Marketing",
    tagline: "Building Brands in the Social Era",
    visualImage: "/services/social-detail.jpg",
    introduction: [
      "Social media is the heartbeat of modern marketing. We help you connect directly with your buyers.",
      "From viral content to highly targeted ad campaigns, we manage your entire social presence.",
      "We focus on creating communities around your brand, not just pushing one-way sales."
    ],
    expertise: [
      { icon: Share2, title: "Paid Social", description: "ROI-driven ad campaigns on Meta, LinkedIn, and TikTok." },
      { icon: Palette, title: "Creative Content", description: "High-quality reels, graphics, and stories for engagement." },
      { icon: Users, title: "Community Lead", description: "Responding to comments and managing customer feedback." },
      { icon: TrendingUp, title: "Growth Logic", description: "Organic strategies to increase followers and brand reach." },
    ],
    techStack: ["Meta Business", "Ads Manager", "Canva", "CapCut", "Later", "Hootsuite"],
    process: [
      { step: "Brand Audit", description: "Reviewing your current social media standing." },
      { step: "Strategy", description: "Setting platform goals and content pillars." },
      { step: "Production", description: "Creating and scheduling monthly content." },
      { step: "Ad Setup", description: "Developing target audiences and ad creative." },
      { step: "Analytics", description: "Analyzing data to increase campaign performance." },
    ],
  },

  "content-strategy": {
    title: "Content Strategy",
    tagline: "Words That Tell Stories and Sell Products",
    visualImage: "/services/content-detail.jpg",
    introduction: [
      "Content is the engine of your marketing funnel. We create strategies that convert readers into fans.",
      "From technical whitepapers to persuasive sales copy, we handle all aspects of content production.",
      "Our strategies align your content with user search intent and business milestones."
    ],
    expertise: [
      { icon: FileText, title: "Blog Strategy", description: "Regular, high-value articles that build authority and SEO." },
      { icon: Target, title: "Copywriting", description: "Sales-focused copy for landing pages and email marketing." },
      { icon: Share2, title: "Distribution", description: "Getting your content published on high-traffic industry sites." },
      { icon: BarChart3, title: "Content ROI", description: "Measuring how much revenue each piece of content generates." },
    ],
    techStack: ["WordPress", "HubSpot", "Ahrefs", "Grammarly", "ChatGPT Plus", "Google Docs"],
    process: [
      { step: "Personas", description: "Identifying exactly who we are writing for." },
      { step: "Keyword Map", description: "Finding search terms that drive buyers." },
      { step: "Drafting", description: "Writing unique, high-quality content." },
      { step: "Optimization", description: "Adding SEO elements to every piece." },
      { step: "Promotion", description: "Sharing content across social and email." },
    ],
  },
};

// --- FALLBACK ---
const defaultService: ServiceData = {
  title: "Service Category",
  tagline: "Excellence in Digital Solutions",
  visualImage: "/services/default-detail.jpg",
  introduction: ["Innovation drives everything we do. We provide specialized technology services to help you scale."],
  expertise: [
    { icon: Zap, title: "Efficiency", description: "Optimized workflows for fast results." },
    { icon: Shield, title: "Security", description: "Protecting your digital assets." }
  ],
  techStack: ["React", "Python", "Cloud Tech"],
  process: [
    { step: "Planning", description: "Setting project milestones." },
    { step: "Execution", description: "Building with quality." }
  ],
};

// --- MAIN COMPONENT ---
export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = servicesData[params.slug] || defaultService;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0); 
  }, [params.slug]);

  const processIcons = [Search, Palette, Code, TestTube, Rocket];

  return (
    <div className="min-h-screen bg-[#060610] overflow-x-hidden">
      <Header />

      {/* 1. Dynamic Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-background to-background" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-20 right-10 w-64 h-64 bg-gold/10 blur-[100px] rounded-full" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <Link href="/services" className="inline-flex items-center gap-2 text-gray-500 hover:text-gold mb-8 transition-colors font-medium">
              <ArrowRight className="h-4 w-4 rotate-180" /> Back to Services
            </Link>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter uppercase italic break-words leading-tight">
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl text-gold font-bold italic tracking-wide drop-shadow-lg">{service.tagline}</p>
          </div>
        </div>
      </section>

      {/* 2. What We Offer (With Image) */}
      <section className="py-24">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white border-l-4 border-gold pl-6 uppercase tracking-tight">What We Offer</h2>
            {service.introduction.map((text, i) => (
              <p key={i} className="text-gray-400 text-lg leading-relaxed font-medium">{text}</p>
            ))}
          </div>
          
          <div className="relative group">
            <div className="aspect-square rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl relative">
              <img 
                src={service.visualImage} 
                alt={service.title} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060610] via-transparent opacity-70" />
              
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-3xl font-black italic uppercase tracking-tighter">{service.title}</p>
                <p className="text-gold font-bold text-sm uppercase tracking-widest mt-1">Premium Solutions</p>
              </div>
            </div>
            
            <div className="absolute -top-10 -right-10 w-56 h-56 bg-gold/10 blur-[120px] -z-10 rounded-full animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-blue-500/10 blur-[120px] -z-10 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* 3. Core Expertise Grid */}
      <section className="py-24 bg-[#0d0d1a]/50 relative border-y border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 tracking-tight">Core <span className="text-gold">Expertise</span></h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto text-left">
            {service.expertise.map((item, i) => (
              <div key={i} className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-gold/20 hover:bg-white/[0.04] transition-all group">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="p-5 bg-gold/10 rounded-2xl group-hover:scale-110 transition-transform shadow-xl">
                    <item.icon className="h-8 w-8 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-gold transition-colors">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed font-medium">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Technology Stack */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6 uppercase italic">Stack & Tools</h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                {service.techStack.map((tech, i) => (
                    <div key={tech} className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:border-gold transition-all">
                        {tech}
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 5. Our Workflow */}
      <section className="py-24 bg-gradient-to-b from-transparent to-[#0d0d1a]/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-20 tracking-tighter uppercase italic">Our Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 max-w-7xl mx-auto">
            {service.process.map((p, i) => {
              const Icon = processIcons[i] || CheckCircle2;
              return (
                <div key={i} className="text-center group relative">
                  <div className="w-20 h-20 bg-gold/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold/10 group-hover:bg-gold/10 transition-all shadow-2xl relative z-10">
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white w-8 h-8 rounded-full text-[10px] flex items-center justify-center font-black">0{i+1}</span>
                    <Icon className="h-10 w-10 text-gold" />
                  </div>
                  <h5 className="text-lg font-bold text-white mb-3 uppercase tracking-tighter">{p.step}</h5>
                  <p className="text-gray-500 text-xs leading-relaxed font-medium">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-32 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gold/5" />
        <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter uppercase italic leading-none">
                Ready to Ignite your <br/> <span className="text-gold">{service.title}</span> Project?
            </h2>
            <Link href="/contact">
                <Button size="lg" className="bg-gold text-black font-black text-xl px-16 py-8 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95">
                    START YOUR JOURNEY <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
            </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}