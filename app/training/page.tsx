"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Rocket,
  BookOpen,
  Briefcase,
  Code,
  Brain,
  Megaphone,
  Smartphone,
  Palette,
  Clock,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Target,
  Lightbulb,
  Award,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Training Philosophy Pillars
const trainingPillars = [
  {
    icon: Users,
    title: "Full Focus & Guidance",
    description: "1-on-1 mentorship and small batch sizes ensure personalized attention for every learner.",
    color: "from-purple-deep to-purple-light",
  },
  {
    icon: Rocket,
    title: "Live Project Experience",
    description: "Work on real agency projects, not just theory. Gain practical experience that employers value.",
    color: "from-blue-electric to-blue-light",
  },
  {
    icon: BookOpen,
    title: "Industry-Standard Curriculum",
    description: "Learn the latest tools including AI, Next.js, Cloud platforms, and modern development practices.",
    color: "from-gold to-gold-light",
  },
  {
    icon: Briefcase,
    title: "Job Placement Support",
    description: "Get guidance on portfolio building, interview preparation, and direct placement assistance.",
    color: "from-green-500 to-emerald-400",
  },
];

// Training Programs
const trainingPrograms = [
  {
    icon: Code,
    title: "Full Stack Web Development",
    duration: "3 Months",
    headerColor: "bg-purple-deep",
    glowColor: "shadow-purple-deep/50",
    topics: [
      "HTML, CSS & JavaScript Fundamentals",
      "React.js & Next.js Framework",
      "Node.js & Express Backend",
      "Database Design (MongoDB, PostgreSQL)",
      "API Development & Integration",
      "Deployment & DevOps Basics",
    ],
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    duration: "4 Months",
    headerColor: "bg-gold",
    glowColor: "shadow-gold/50",
    topics: [
      "Python for Data Science",
      "Machine Learning Algorithms",
      "Deep Learning with TensorFlow",
      "Natural Language Processing",
      "Computer Vision Projects",
      "AI Product Development",
    ],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing Mastery",
    duration: "2 Months",
    headerColor: "bg-blue-electric",
    glowColor: "shadow-blue-electric/50",
    topics: [
      "Social Media Marketing Strategy",
      "Google Ads & Meta Ads",
      "SEO & Content Marketing",
      "Email Marketing Automation",
      "Analytics & Data-Driven Decisions",
      "Brand Building & Growth Hacking",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    duration: "3 Months",
    headerColor: "bg-gradient-to-r from-purple-deep to-blue-electric",
    glowColor: "shadow-purple-deep/50",
    topics: [
      "React Native Fundamentals",
      "Flutter & Dart Programming",
      "Mobile UI/UX Best Practices",
      "State Management Solutions",
      "Native Device Features",
      "App Store Publishing",
    ],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    duration: "2.5 Months",
    headerColor: "bg-gradient-to-r from-gold to-purple-light",
    glowColor: "shadow-gold/50",
    topics: [
      "Design Thinking Process",
      "Figma & Adobe XD Mastery",
      "User Research & Personas",
      "Wireframing & Prototyping",
      "Design Systems & Components",
      "Usability Testing Methods",
    ],
  },
];

// Learning Path Steps
const learningPath = [
  {
    step: 1,
    title: "Fundamental Concepts",
    description: "Master the core concepts and foundational knowledge in your chosen field.",
    icon: Lightbulb,
  },
  {
    step: 2,
    title: "Tool Mastery",
    description: "Learn industry-standard tools and technologies used by professionals.",
    icon: Zap,
  },
  {
    step: 3,
    title: "Mini Projects",
    description: "Apply your skills to build real-world mini projects for your portfolio.",
    icon: Target,
  },
  {
    step: 4,
    title: "Live Agency Internship",
    description: "Work on actual client projects under expert mentorship.",
    icon: Rocket,
  },
  {
    step: 5,
    title: "Certification & Graduation",
    description: "Receive your certificate and launch your career with our support.",
    icon: Award,
  },
];

export default function TrainingPage() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute("data-index") || "0");
          const type = entry.target.getAttribute("data-type");
          if (type === "card") {
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          } else if (type === "step") {
            setVisibleSteps((prev) => [...new Set([...prev, index])]);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    });

    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    stepRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your interest! We will contact you shortly.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep/30 via-background to-blue-electric/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Floating Elements */}
        <div className="absolute top-40 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-gold/20 to-transparent blur-3xl animate-float" />
        <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-blue-electric/20 to-transparent blur-3xl animate-float" style={{ animationDelay: "1s" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <GraduationCap className="h-5 w-5 text-gold" />
              <span className="text-sm text-foreground/80">V-Productions Academy</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Master the{" "}
              <span className="gradient-text">Tech of Tomorrow</span>
              <br />
              with V-Productions Academy
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {"We don't just teach; we mentor. Get hands-on training from industry experts who provide full focus and real-world expertise."}
            </p>

            <Button 
              size="lg" 
              className="bg-gold text-accent-foreground hover:bg-gold-light font-bold text-lg px-10 py-6 animate-pulse-glow"
            >
              Join Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Decorative Icons */}
        <div className="absolute top-1/3 left-10 text-gold/20">
          <Code className="h-16 w-16" />
        </div>
        <div className="absolute bottom-1/3 right-10 text-blue-electric/20">
          <Brain className="h-20 w-20" />
        </div>
      </section>

      {/* Training Philosophy Section */}
      <section className="py-20 bg-purple-deep/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The V-Training Philosophy
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Why choose V-Productions Academy? Here are our core training pillars that set us apart.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainingPillars.map((pillar, index) => (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                data-index={index}
                data-type="card"
                className={cn(
                  "group relative p-6 rounded-2xl glass border border-foreground/10 transition-all duration-700",
                  "hover:border-gold/50 hover:scale-105 hover:shadow-xl hover:shadow-gold/10",
                  visibleCards.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <pillar.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Training Programs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive range of industry-focused training programs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingPrograms.map((program, index) => (
              <div
                key={index}
                ref={(el) => { cardRefs.current[trainingPillars.length + index] = el; }}
                data-index={trainingPillars.length + index}
                data-type="card"
                className={cn(
                  "group cursor-pointer transition-all duration-700",
                  visibleCards.includes(trainingPillars.length + index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                  {/* Header */}
                  <div className={`${program.headerColor} py-6 px-6 transition-all duration-300 group-hover:shadow-lg ${program.glowColor}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <program.icon className="h-8 w-8 text-white" />
                        <h3 className="text-xl font-bold text-white">{program.title}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-white/80">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">{program.duration}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="bg-[#1a1a2e] p-6 border-x border-b border-foreground/10">
                    <h4 className="text-sm font-semibold text-gold mb-4 uppercase tracking-wider">
                      What You Will Learn
                    </h4>
                    <ul className="space-y-3 mb-6">
                      {program.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start gap-3 text-foreground/80 text-sm">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center mt-0.5">
                            <CheckCircle2 className="h-3 w-3 text-gold" />
                          </div>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full bg-gold text-accent-foreground hover:bg-gold-light font-semibold group-hover:shadow-lg group-hover:shadow-gold/20 transition-all">
                      View Full Syllabus
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border-2 border-gold/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-20 bg-gradient-to-b from-purple-deep/20 to-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Learning Path
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your journey from beginner to industry-ready professional
            </p>
          </div>

          {/* Desktop Horizontal Timeline */}
          <div className="hidden lg:block relative">
            {/* Connection Line */}
            <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-purple-deep via-blue-electric to-gold" />

            <div className="flex justify-between items-start">
              {learningPath.map((step, index) => (
                <div
                  key={index}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  data-index={index}
                  data-type="step"
                  className={cn(
                    "relative flex flex-col items-center w-1/5 transition-all duration-700",
                    visibleSteps.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Glowing Node */}
                  <div className={cn(
                    "relative z-10 w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500",
                    visibleSteps.includes(index) ? "animate-pulse-glow" : ""
                  )}>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/30 to-purple-deep/30 blur-xl" />
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-card to-background border-2 border-gold/50 flex items-center justify-center">
                      <step.icon className="h-10 w-10 text-gold" />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold text-accent-foreground font-bold flex items-center justify-center text-sm">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-6 text-center px-2">
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Vertical Timeline */}
          <div className="lg:hidden relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-deep via-blue-electric to-gold" />

            <div className="space-y-12">
              {learningPath.map((step, index) => (
                <div
                  key={index}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  data-index={index}
                  data-type="step"
                  className={cn(
                    "relative flex items-start gap-6 pl-4 transition-all duration-700",
                    visibleSteps.includes(index)
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-10"
                  )}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-card to-background border-2 border-gold/50 flex items-center justify-center">
                      <step.icon className="h-7 w-7 text-gold" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gold text-accent-foreground font-bold flex items-center justify-center text-xs">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-2">
                    <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Start Your Journey Today
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and our team will reach out to guide you through the enrollment process.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 border border-foreground/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="bg-input border-foreground/20 focus:border-gold"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="bg-input border-foreground/20 focus:border-gold"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="course" className="text-foreground">Course Interest</Label>
                    <Select required>
                      <SelectTrigger className="bg-input border-foreground/20 focus:border-gold">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-dev">Full Stack Web Development</SelectItem>
                        <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                        <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                        <SelectItem value="mobile-dev">Mobile App Development</SelectItem>
                        <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skill-level" className="text-foreground">Current Skill Level</Label>
                    <Select required>
                      <SelectTrigger className="bg-input border-foreground/20 focus:border-gold">
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner - New to Tech</SelectItem>
                        <SelectItem value="intermediate">Intermediate - Some Experience</SelectItem>
                        <SelectItem value="advanced">Advanced - Looking to Specialize</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-foreground">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="+1 (234) 567-890"
                    className="bg-input border-foreground/20 focus:border-gold"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full bg-gold text-accent-foreground hover:bg-gold-light font-bold text-lg py-6"
                >
                  Submit Enrollment Request
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  By submitting, you agree to our terms and privacy policy. We will never spam you.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
