"use client";

import { useRef, useEffect, useState } from "react";
import { use } from "react";
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
} from "lucide-react";

// Service data configuration
const servicesData: Record<string, ServiceData> = {
  "web-development": {
    title: "Web Development",
    tagline: "Building Digital Experiences That Convert",
    heroImage: "/services/web-dev-hero.jpg",
    introduction: [
      "In today's digital-first world, your website is often the first impression customers have of your business. Our web development services combine cutting-edge technology with stunning design to create websites that not only look amazing but also drive real business results.",
      "From responsive corporate websites to complex web applications, our team of expert developers uses the latest frameworks and best practices to deliver solutions that are fast, secure, and scalable. We focus on user experience, performance optimization, and SEO-friendly architecture to ensure your web presence stands out.",
    ],
    expertise: [
      {
        icon: Palette,
        title: "Responsive Design",
        description: "Pixel-perfect designs that look stunning on every device and screen size.",
      },
      {
        icon: Zap,
        title: "API Integration",
        description: "Seamless integration with third-party services, payment gateways, and CRMs.",
      },
      {
        icon: Globe,
        title: "E-commerce Solutions",
        description: "High-converting online stores with secure checkout and inventory management.",
      },
      {
        icon: Shield,
        title: "Security First",
        description: "Enterprise-grade security with SSL, data encryption, and regular audits.",
      },
    ],
    techStack: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "MongoDB", "AWS"],
    process: [
      { step: "Discovery", description: "Understanding your goals, audience, and requirements" },
      { step: "Design", description: "Creating wireframes and visual mockups for approval" },
      { step: "Development", description: "Building your solution with clean, maintainable code" },
      { step: "QA Testing", description: "Rigorous testing across browsers and devices" },
      { step: "Deployment", description: "Launching with monitoring and support" },
    ],
  },
  "mobile-apps": {
    title: "Mobile Apps",
    tagline: "Native & Cross-Platform Excellence",
    heroImage: "/services/mobile-hero.jpg",
    introduction: [
      "Mobile apps have become essential for businesses looking to engage customers on their preferred devices. Our mobile development team creates intuitive, high-performance applications that users love to use and recommend.",
      "Whether you need a native iOS app, an Android application, or a cross-platform solution, we leverage the latest technologies like Flutter and React Native to deliver apps that feel native while maximizing development efficiency.",
    ],
    expertise: [
      {
        icon: Smartphone,
        title: "Native Development",
        description: "Platform-optimized apps for iOS (Swift) and Android (Kotlin).",
      },
      {
        icon: Layers,
        title: "Cross-Platform",
        description: "Single codebase solutions with Flutter and React Native.",
      },
      {
        icon: Zap,
        title: "Performance",
        description: "Optimized for speed, battery life, and smooth animations.",
      },
      {
        icon: Shield,
        title: "App Security",
        description: "Secure data storage, biometric auth, and encryption.",
      },
    ],
    techStack: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "AWS Amplify", "GraphQL", "REST APIs"],
    process: [
      { step: "Discovery", description: "Defining app features and user journeys" },
      { step: "Design", description: "UI/UX design with interactive prototypes" },
      { step: "Development", description: "Agile development with regular demos" },
      { step: "QA Testing", description: "Device testing and beta programs" },
      { step: "Launch", description: "App store submission and marketing" },
    ],
  },
  "machine-learning": {
    title: "Machine Learning",
    tagline: "Intelligent Solutions for Complex Problems",
    heroImage: "/services/ml-hero.jpg",
    introduction: [
      "Machine learning is revolutionizing how businesses operate, from automating routine tasks to uncovering hidden patterns in data. Our ML engineers build custom models that deliver measurable ROI and competitive advantages.",
      "We specialize in predictive analytics, natural language processing, computer vision, and recommendation systems. Our solutions are designed to integrate seamlessly with your existing systems and scale as your data grows.",
    ],
    expertise: [
      {
        icon: Brain,
        title: "Predictive Analytics",
        description: "Forecast trends, demand, and customer behavior accurately.",
      },
      {
        icon: FileText,
        title: "NLP Solutions",
        description: "Text analysis, chatbots, and sentiment analysis.",
      },
      {
        icon: Layers,
        title: "Computer Vision",
        description: "Image recognition, object detection, and video analysis.",
      },
      {
        icon: BarChart3,
        title: "Recommendation Engines",
        description: "Personalized content and product recommendations.",
      },
    ],
    techStack: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "AWS SageMaker", "MLflow", "Kubernetes", "Docker"],
    process: [
      { step: "Discovery", description: "Identifying ML opportunities and data audit" },
      { step: "Data Prep", description: "Cleaning, labeling, and feature engineering" },
      { step: "Model Dev", description: "Training, tuning, and validation" },
      { step: "Integration", description: "API development and system integration" },
      { step: "Monitoring", description: "Model performance tracking and retraining" },
    ],
  },
  "business-intelligence": {
    title: "Business Intelligence",
    tagline: "Data-Driven Decision Making",
    heroImage: "/services/bi-hero.jpg",
    introduction: [
      "Transform your raw data into actionable insights with our comprehensive business intelligence solutions. We help organizations make smarter decisions faster by visualizing complex data in intuitive dashboards.",
      "Our BI experts work with leading platforms like Power BI, Tableau, and Looker to create custom reporting solutions that provide real-time visibility into your key performance indicators.",
    ],
    expertise: [
      {
        icon: BarChart3,
        title: "Custom Dashboards",
        description: "Interactive visualizations tailored to your KPIs.",
      },
      {
        icon: Database,
        title: "Data Warehousing",
        description: "Centralized data repositories for unified reporting.",
      },
      {
        icon: Zap,
        title: "Real-time Analytics",
        description: "Live data feeds and automated alerts.",
      },
      {
        icon: FileText,
        title: "Automated Reports",
        description: "Scheduled reports delivered to stakeholders.",
      },
    ],
    techStack: ["Power BI", "Tableau", "Looker", "Snowflake", "BigQuery", "dbt", "Airflow", "Python"],
    process: [
      { step: "Discovery", description: "Understanding reporting needs and data sources" },
      { step: "Data Model", description: "Designing dimensional models and ETL" },
      { step: "Development", description: "Building dashboards and reports" },
      { step: "Training", description: "User training and documentation" },
      { step: "Support", description: "Ongoing maintenance and enhancements" },
    ],
  },
  "clinical-data-analytics": {
    title: "Clinical Data Analytics",
    tagline: "Healthcare Intelligence, HIPAA Compliant",
    heroImage: "/services/clinical-hero.jpg",
    introduction: [
      "Healthcare organizations generate massive amounts of data that, when properly analyzed, can improve patient outcomes and operational efficiency. Our clinical data analytics services help you unlock the value in your healthcare data.",
      "We specialize in HIPAA-compliant solutions for hospitals, clinics, and health tech companies. From EHR data integration to predictive health models, we deliver insights that make a real difference in patient care.",
    ],
    expertise: [
      {
        icon: Stethoscope,
        title: "EHR Integration",
        description: "Connect and analyze data from multiple EHR systems.",
      },
      {
        icon: Brain,
        title: "Predictive Health",
        description: "Risk stratification and readmission prediction.",
      },
      {
        icon: Shield,
        title: "HIPAA Compliance",
        description: "Secure, compliant data handling and storage.",
      },
      {
        icon: BarChart3,
        title: "Population Health",
        description: "Community health trends and outcomes analysis.",
      },
    ],
    techStack: ["HL7 FHIR", "Epic", "Cerner", "AWS HealthLake", "Python", "R", "SAS", "Snowflake"],
    process: [
      { step: "Assessment", description: "Data audit and compliance review" },
      { step: "Architecture", description: "Secure infrastructure design" },
      { step: "Development", description: "Building analytics pipelines" },
      { step: "Validation", description: "Clinical validation and testing" },
      { step: "Deployment", description: "Go-live with training and support" },
    ],
  },
  "custom-software": {
    title: "Custom Software",
    tagline: "Tailored Solutions for Unique Challenges",
    heroImage: "/services/custom-hero.jpg",
    introduction: [
      "Off-the-shelf software often falls short when it comes to addressing your unique business processes and requirements. Our custom software development services deliver solutions that fit your workflow perfectly.",
      "We partner with you to understand your challenges deeply, then design and build software that automates processes, improves efficiency, and gives you a competitive edge in your market.",
    ],
    expertise: [
      {
        icon: Code,
        title: "Enterprise Apps",
        description: "Scalable applications for large organizations.",
      },
      {
        icon: Layers,
        title: "System Integration",
        description: "Connect disparate systems into unified workflows.",
      },
      {
        icon: Zap,
        title: "Process Automation",
        description: "Automate repetitive tasks and workflows.",
      },
      {
        icon: Shield,
        title: "Enterprise Security",
        description: "Role-based access, audit trails, and encryption.",
      },
    ],
    techStack: ["Java", "C#", ".NET", "Python", "Microservices", "Docker", "Kubernetes", "Azure"],
    process: [
      { step: "Discovery", description: "Deep dive into your business processes" },
      { step: "Architecture", description: "System design and technology selection" },
      { step: "Development", description: "Agile sprints with continuous feedback" },
      { step: "Testing", description: "Comprehensive QA and UAT" },
      { step: "Deployment", description: "Phased rollout with training" },
    ],
  },
  "data-engineering": {
    title: "Data Engineering",
    tagline: "Building Robust Data Infrastructure",
    heroImage: "/services/data-eng-hero.jpg",
    introduction: [
      "Great data analytics starts with great data infrastructure. Our data engineering services help you build scalable, reliable pipelines that move data from source to insight efficiently.",
      "We design and implement modern data architectures using cloud-native technologies, ensuring your data is always available, accurate, and ready for analysis.",
    ],
    expertise: [
      {
        icon: Database,
        title: "Data Pipelines",
        description: "Automated ETL/ELT workflows for real-time data.",
      },
      {
        icon: Layers,
        title: "Data Warehousing",
        description: "Modern cloud data warehouses optimized for analytics.",
      },
      {
        icon: Zap,
        title: "Stream Processing",
        description: "Real-time data processing with Kafka and Spark.",
      },
      {
        icon: Shield,
        title: "Data Governance",
        description: "Data quality, lineage, and access controls.",
      },
    ],
    techStack: ["Apache Spark", "Kafka", "Airflow", "dbt", "Snowflake", "Databricks", "AWS Glue", "BigQuery"],
    process: [
      { step: "Assessment", description: "Current state analysis and requirements" },
      { step: "Architecture", description: "Data platform design" },
      { step: "Build", description: "Pipeline development and testing" },
      { step: "Migration", description: "Data migration and validation" },
      { step: "Operations", description: "Monitoring and optimization" },
    ],
  },
  "legacy-modernization": {
    title: "Legacy Modernization",
    tagline: "Transform Without Disruption",
    heroImage: "/services/legacy-hero.jpg",
    introduction: [
      "Outdated systems can hold your business back, creating security risks and limiting your ability to innovate. Our legacy modernization services help you upgrade to modern architectures without disrupting operations.",
      "We take a phased approach to modernization, allowing you to realize benefits incrementally while minimizing risk. Whether it is cloud migration, microservices transformation, or complete rewrites, we have the expertise to guide you.",
    ],
    expertise: [
      {
        icon: Cpu,
        title: "Cloud Migration",
        description: "Move legacy systems to AWS, Azure, or GCP.",
      },
      {
        icon: Layers,
        title: "Microservices",
        description: "Break monoliths into scalable microservices.",
      },
      {
        icon: Code,
        title: "Code Refactoring",
        description: "Modernize codebases without full rewrites.",
      },
      {
        icon: Shield,
        title: "Security Updates",
        description: "Patch vulnerabilities and update dependencies.",
      },
    ],
    techStack: ["Kubernetes", "Docker", "AWS", "Azure", "Terraform", "CI/CD", "Microservices", "API Gateway"],
    process: [
      { step: "Assessment", description: "Legacy system analysis and risk evaluation" },
      { step: "Strategy", description: "Modernization roadmap development" },
      { step: "Pilot", description: "Proof of concept with low-risk components" },
      { step: "Migration", description: "Phased modernization execution" },
      { step: "Optimization", description: "Performance tuning and cost optimization" },
    ],
  },
  "seo-optimization": {
    title: "SEO Optimization",
    tagline: "Dominate Search Rankings",
    heroImage: "/services/seo-hero.jpg",
    introduction: [
      "Visibility in search results can make or break your online business. Our SEO optimization services use data-driven strategies to improve your rankings and drive qualified organic traffic to your website.",
      "We go beyond basic keyword optimization to deliver comprehensive SEO that includes technical audits, content strategy, link building, and ongoing performance monitoring.",
    ],
    expertise: [
      {
        icon: Search,
        title: "Technical SEO",
        description: "Site speed, crawlability, and structured data.",
      },
      {
        icon: FileText,
        title: "Content Strategy",
        description: "Keyword research and content optimization.",
      },
      {
        icon: Globe,
        title: "Link Building",
        description: "Quality backlink acquisition strategies.",
      },
      {
        icon: BarChart3,
        title: "Analytics & Reporting",
        description: "Detailed ranking and traffic reports.",
      },
    ],
    techStack: ["Google Analytics", "Search Console", "Ahrefs", "SEMrush", "Screaming Frog", "Schema.org", "Core Web Vitals"],
    process: [
      { step: "Audit", description: "Comprehensive SEO audit and competitor analysis" },
      { step: "Strategy", description: "Custom SEO roadmap development" },
      { step: "On-Page", description: "Content and technical optimizations" },
      { step: "Off-Page", description: "Link building and outreach" },
      { step: "Monitor", description: "Ranking tracking and adjustments" },
    ],
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    tagline: "Designs That Delight Users",
    heroImage: "/services/uiux-hero.jpg",
    introduction: [
      "Great design is not just about aesthetics—it is about creating experiences that users love and that drive business results. Our UI/UX design services blend creativity with user research to deliver interfaces that convert.",
      "From user research and wireframing to high-fidelity prototypes and design systems, we provide end-to-end design services that ensure your digital products are intuitive, accessible, and beautiful.",
    ],
    expertise: [
      {
        icon: Search,
        title: "User Research",
        description: "Interviews, surveys, and usability testing.",
      },
      {
        icon: Palette,
        title: "Visual Design",
        description: "Stunning interfaces that reflect your brand.",
      },
      {
        icon: Layers,
        title: "Prototyping",
        description: "Interactive prototypes for validation.",
      },
      {
        icon: Code,
        title: "Design Systems",
        description: "Scalable component libraries and guidelines.",
      },
    ],
    techStack: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle", "Framer", "Storybook", "Zeplin"],
    process: [
      { step: "Research", description: "User interviews and competitive analysis" },
      { step: "Wireframes", description: "Low-fidelity layouts and flows" },
      { step: "Design", description: "High-fidelity mockups and prototypes" },
      { step: "Testing", description: "Usability testing and iteration" },
      { step: "Handoff", description: "Developer handoff with specs" },
    ],
  },
  "social-media-marketing": {
    title: "Social Media Marketing",
    tagline: "Engage, Grow, Convert",
    heroImage: "/services/smm-hero.jpg",
    introduction: [
      "Social media is where your customers spend their time. Our social media marketing services help you build a strong presence, engage your audience, and turn followers into customers.",
      "We create data-driven social strategies that include content creation, community management, paid advertising, and influencer partnerships. Our goal is to build authentic connections that drive measurable business results.",
    ],
    expertise: [
      {
        icon: Palette,
        title: "Content Creation",
        description: "Engaging posts, stories, and video content.",
      },
      {
        icon: LineChart,
        title: "Paid Advertising",
        description: "Targeted campaigns on all major platforms.",
      },
      {
        icon: Globe,
        title: "Community Management",
        description: "Active engagement and reputation management.",
      },
      {
        icon: BarChart3,
        title: "Analytics",
        description: "Performance tracking and optimization.",
      },
    ],
    techStack: ["Meta Business Suite", "Hootsuite", "Sprout Social", "Canva", "Later", "Google Ads", "TikTok Ads"],
    process: [
      { step: "Audit", description: "Social presence and competitor analysis" },
      { step: "Strategy", description: "Platform selection and content calendar" },
      { step: "Creation", description: "Content production and scheduling" },
      { step: "Engagement", description: "Community management and interaction" },
      { step: "Optimize", description: "Performance analysis and refinement" },
    ],
  },
  "content-strategy": {
    title: "Content Strategy",
    tagline: "Content That Converts",
    heroImage: "/services/content-hero.jpg",
    introduction: [
      "Content is the foundation of modern marketing. Our content strategy services help you create and distribute valuable content that attracts, engages, and converts your target audience.",
      "We develop comprehensive content strategies that align with your business goals, from thought leadership blogs to video marketing and email campaigns. Every piece of content is designed to move prospects through your funnel.",
    ],
    expertise: [
      {
        icon: FileText,
        title: "Content Planning",
        description: "Editorial calendars and topic clusters.",
      },
      {
        icon: Palette,
        title: "Content Creation",
        description: "Blogs, videos, infographics, and more.",
      },
      {
        icon: Search,
        title: "SEO Integration",
        description: "Content optimized for search visibility.",
      },
      {
        icon: BarChart3,
        title: "Performance Analysis",
        description: "Content ROI tracking and optimization.",
      },
    ],
    techStack: ["WordPress", "HubSpot", "Contentful", "Ahrefs", "Grammarly", "Jasper AI", "Canva", "Loom"],
    process: [
      { step: "Audit", description: "Content inventory and gap analysis" },
      { step: "Strategy", description: "Audience personas and content pillars" },
      { step: "Creation", description: "Content production and optimization" },
      { step: "Distribution", description: "Multi-channel publishing" },
      { step: "Measure", description: "Analytics and continuous improvement" },
    ],
  },
};

// Default service data for unknown slugs
const defaultService: ServiceData = {
  title: "Our Service",
  tagline: "Excellence in Every Solution",
  heroImage: "/services/default-hero.jpg",
  introduction: [
    "At V-Productions & Marketing, we deliver exceptional solutions tailored to your unique business needs. Our team of experts combines industry knowledge with cutting-edge technology to drive results.",
    "We work closely with our clients to understand their challenges and develop strategies that create real, measurable value for their organizations.",
  ],
  expertise: [
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Quick turnaround without compromising quality.",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Rigorous testing and quality control processes.",
    },
    {
      icon: Code,
      title: "Modern Technology",
      description: "Built with the latest tools and frameworks.",
    },
    {
      icon: Layers,
      title: "Scalable Solutions",
      description: "Architecture designed to grow with your business.",
    },
  ],
  techStack: ["React", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "MongoDB", "GraphQL"],
  process: [
    { step: "Discovery", description: "Understanding your requirements" },
    { step: "Planning", description: "Detailed project roadmap" },
    { step: "Execution", description: "Agile development process" },
    { step: "Testing", description: "Comprehensive quality assurance" },
    { step: "Delivery", description: "Deployment and support" },
  ],
};

interface ServiceData {
  title: string;
  tagline: string;
  heroImage: string;
  introduction: string[];
  expertise: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }[];
  techStack: string[];
  process: {
    step: string;
    description: string;
  }[];
}

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const service = servicesData[resolvedParams.slug] || defaultService;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const processIcons = [Search, Palette, Code, TestTube, Rocket];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-32 pb-16">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-background to-background" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-electric/10 via-transparent to-gold/10 animate-pulse" />

        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-6"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to Services
            </Link>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              {service.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gold font-medium mb-6">
              {service.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                What We Offer
              </h2>
              {service.introduction.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Decorative visual */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-deep via-blue-electric/20 to-gold/20 p-1">
                <div className="w-full h-full rounded-3xl glass flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mb-4">
                      <Code className="h-12 w-12 text-accent-foreground" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{service.title}</p>
                    <p className="text-muted-foreground">Expert Solutions</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gold/20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-blue-electric/20 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Expertise Grid */}
      <section className="py-16 bg-purple-deep/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Core Expertise
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our specialized capabilities in {service.title.toLowerCase()}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {service.expertise.map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl glass border border-foreground/10 hover:border-gold/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Technology Stack
            </h2>
            <p className="text-muted-foreground">
              The tools and technologies we use for {service.title.toLowerCase()}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {service.techStack.map((tech, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-full glass border border-foreground/10 hover:border-gold/50 hover:bg-gold/5 transition-all duration-300"
              >
                <span className="text-foreground font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Timeline */}
      <section className="py-16 bg-purple-deep/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A proven methodology for delivering successful {service.title.toLowerCase()} projects
            </p>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connection Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-purple-light via-blue-electric to-gold hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {service.process.map((item, index) => {
                const ProcessIcon = processIcons[index] || CheckCircle2;
                return (
                  <div key={index} className="relative text-center">
                    {/* Icon Circle */}
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mb-4 relative z-10 shadow-lg shadow-gold/25">
                      <ProcessIcon className="h-7 w-7 text-accent-foreground" />
                    </div>
                    
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 md:right-1/2 md:translate-x-1/2 w-6 h-6 rounded-full bg-blue-electric flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {item.step}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-deep via-blue-electric/20 to-purple-deep" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to start your{" "}
            <span className="text-gold">{service.title}</span> project?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {"Let's discuss how we can help you achieve your goals. Our experts are ready to create a tailored solution for your needs."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gold text-accent-foreground hover:bg-gold-light font-bold text-lg px-10 py-6 rounded-full shadow-lg shadow-gold/25"
              >
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-gold text-gold hover:bg-gold/10 font-bold text-lg px-10 py-6 rounded-full"
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
