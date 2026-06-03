"use client";

import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Check, Lightbulb, Shield, Target, Eye, Users, Sparkles, Award, Globe2, Rocket, Building2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-electric/20 via-transparent to-transparent" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(oklch(0.75 0.15 85 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.75 0.15 85 / 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
          About <span className="gradient-text">V-Productions</span>
          <br />
          <span className="text-gold">&</span> Marketing
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Lean, Agile, and Data-Driven
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

// Identity & Pillars Section
// Identity & Pillars Section
function IdentitySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const pillars = [
    { icon: Lightbulb, title: "Innovation", description: "Pioneering cutting-edge solutions" },
    { icon: Rocket, title: "Efficiency", description: "Streamlined processes for maximum impact" },
    { icon: Shield, title: "Integrity", description: "Honest, transparent partnerships" },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* TEAM IMAGE BOX - Updated with real Image tag */}
          <div className={cn(
            "relative rounded-3xl overflow-hidden aspect-[4/3] transition-all duration-1000 shadow-2xl border border-white/10",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            {/* Yahan apni image ka path dein jo public folder mein ho */}
            <img 
              src="/team-office.jpg" 
              alt="V-Productions Team" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            
            {/* Subtle Gradient Overlay taaki futuristic look barkarar rahe */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/40 to-transparent pointer-events-none" />
            
            {/* Floating Badge on Image */}
            <div className="absolute bottom-6 left-6 bg-gold/90 backdrop-blur-md px-6 py-2 rounded-xl text-black font-bold text-sm shadow-xl">
              Our Professional Team
            </div>
          </div>

          {/* Content */}
          <div className={cn(
            "transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="text-gold">Identity</span> & Core Pillars
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              At V-Productions & Marketing, we are more than just a tech agency. We are your strategic 
              partner in digital transformation, dedicated to building innovative solutions that drive 
              real business growth. Our team of experts combines technical excellence with creative 
              thinking to deliver results that exceed expectations.
            </p>

            <div className="space-y-4">
              {pillars.map((pillar, index) => (
                <div 
                  key={pillar.title}
                  className={cn(
                    "flex items-start gap-4 p-5 rounded-2xl glass transition-all duration-500 hover:border-gold/30 group",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  )}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Check className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{pillar.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// Mission & Vision Section
function MissionVisionSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, oklch(0.75 0.15 85) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mission & Vision Cards */}
          <div className="space-y-6">
            {/* Mission Card */}
            <div className={cn(
              "glass-strong rounded-2xl p-8 transition-all duration-700 golden-glow-hover",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center animate-pulse-glow">
                  <Target className="h-7 w-7 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses with innovative technology solutions that drive growth, 
                efficiency, and competitive advantage. We are committed to delivering excellence 
                through our lean, agile, and data-driven approach.
              </p>
            </div>

            {/* Vision Card */}
            <div className={cn(
              "glass-strong rounded-2xl p-8 transition-all duration-700 delay-200 golden-glow-hover",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-electric to-blue-light flex items-center justify-center" style={{ boxShadow: '0 0 20px oklch(0.55 0.25 250 / 0.5)' }}>
                  <Eye className="h-7 w-7 text-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To become a global leader in digital transformation, recognized for our innovative 
                solutions, exceptional talent, and unwavering commitment to client success. We envision 
                a future where technology seamlessly enhances every aspect of business operations.
              </p>
            </div>
          </div>

          {/* IMAGE SECTION - Globe ki jagah ab image aayegi */}
          <div className={cn(
            "relative aspect-square max-w-md mx-auto transition-all duration-1000 delay-300",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          )}>
            {/* Futuristic Decorative Background Orbs */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-electric/20 to-purple-deep/30 blur-2xl animate-pulse" />
            
            {/* Real Image Tag */}
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl z-10">
              <img 
                src="/mission-vision.jpg" 
                alt="Our Vision and Mission" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              {/* Overlay Overlay to match theme */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-deep/40 to-transparent pointer-events-none" />
            </div>

            {/* Floating Glow Border */}
            <div className="absolute -inset-4 border border-gold/20 rounded-[3rem] animate-pulse pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
// Timeline Section


// Core Philosophy Section
function PhilosophySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const philosophies = [
    { icon: Users, title: "Customer First", description: "Every decision we make puts our clients at the center, ensuring solutions that truly address their needs." },
    { icon: Sparkles, title: "Innovation", description: "We constantly push boundaries, embracing new technologies and methodologies to deliver cutting-edge solutions." },
    { icon: Award, title: "Quality", description: "Excellence is non-negotiable. We maintain the highest standards in every project we undertake." },
    { icon: Shield, title: "Transparency", description: "Open communication and honest relationships form the foundation of our client partnerships." },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Core <span className="text-gold">Philosophy</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophies.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "relative rounded-2xl p-6 bg-card border-2 border-blue-electric/30 hover:border-gold/50 transition-all duration-500 group",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                style={{ boxShadow: '0 0 30px oklch(0.55 0.25 250 / 0.3)' }} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-electric/20 to-purple-deep/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-7 w-7 text-blue-electric group-hover:text-gold transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-foreground text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Our Story Section
function StorySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-gold">Story</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left Column */}
          <div className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gold mb-3 flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Why Our Story Matters
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Understanding our journey helps you see the depth of experience and commitment 
                  we bring to every project. Our story is one of continuous growth, learning, and 
                  an unwavering dedication to excellence.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gold mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  How We Got Here
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Through strategic decisions, calculated risks, and a relentless pursuit of 
                  innovation, we have evolved from a small startup to an international tech agency. 
                  Every challenge has strengthened us, and every success has motivated us to aim higher.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={cn(
            "transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <div className="space-y-6">
              <div className="border-l-2 border-gold pl-6">
                <h4 className="font-semibold text-foreground text-lg mb-2">Our Beginnings</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Founded in 2018 with a vision to transform how businesses leverage technology. 
                  Starting with ERP and e-commerce solutions, we quickly established ourselves as 
                  reliable partners for digital transformation.
                </p>
              </div>
              <div className="border-l-2 border-blue-electric pl-6">
                <h4 className="font-semibold text-foreground text-lg mb-2">Our Growth</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Expanding into LMS, CRM, and HRMS solutions, we diversified our expertise. 
                  Our international expansion to Saudi Arabia and the US marked significant 
                  milestones in our global journey.
                </p>
              </div>
              <div className="border-l-2 border-purple-light pl-6">
                <h4 className="font-semibold text-foreground text-lg mb-2">Where We Are Now</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Today, we stand as industry leaders with 50+ satisfied clients and 100+ successful 
                  projects. Our team of 20+ experts continues to push boundaries, delivering innovative 
                  solutions across multiple continents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Join Us CTA Section
function JoinUsCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-purple-deep via-background to-background relative overflow-hidden">
      {/* Futuristic Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content (Left Side) */}
          <div className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our <span className="gradient-text">Vision</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Be part of something extraordinary. Whether you are looking to transform your business 
              with our solutions or join our team of innovators, we would love to hear from you. 
              Let us build the future together.
            </p>
            
            {/* CONTACT US Button - Linked to /contact */}
            <Link href="/contact">
              <Button 
                size="lg" 
                className="bg-gold text-black font-black text-lg px-10 py-7 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] transition-all active:scale-95"
              >
                CONTACT US
              </Button>
            </Link>
          </div>

          {/* IMAGE BOX (Right Side) - Updated with real Image */}
          <div className={cn(
            "relative aspect-[4/3] rounded-[2.5rem] overflow-hidden transition-all duration-1000 delay-200 border border-white/10 shadow-2xl",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            {/* Yahan apni picture ka path dein jo public folder mein ho */}
            <img 
              src="/join-vision.jpg" 
              alt="Join V-Productions" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            
            {/* Subtle Overlays taaki futuristic dark theme barkarar rahe */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-blue-electric/10 to-purple-deep/40 pointer-events-none" />
            
            {/* Floating Info Badge on Image */}
            <div className="absolute top-6 left-6 bg-gold/90 backdrop-blur-md px-5 py-2 rounded-xl text-black font-bold text-xs tracking-widest uppercase">
              Now Hiring
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// Main About Page
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <IdentitySection />
      <MissionVisionSection />
      
      <PhilosophySection />
      <StorySection />
      <JoinUsCTA />
      <Footer />
    </main>
  );
}
