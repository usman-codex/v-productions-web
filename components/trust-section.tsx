"use client";

import { Shield, HeadphonesIcon, Zap, Clock, Lock, Sparkles, Target, Heart } from "lucide-react";

const trustStats = [
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "24/7", label: "Support Available" },
  { value: "500+", label: "Integrations" },
  { value: "100%", label: "Data Security" },
];

const valueCards = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is encrypted and protected with enterprise-grade security measures",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Round-the-clock technical support from our expert team whenever you need it",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance ensuring your applications run at peak efficiency",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "We pride ourselves on delivering projects within agreed timelines",
  },
  {
    icon: Lock,
    title: "Secure Solutions",
    description: "Industry-standard security practices protect your digital assets",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Cutting-edge technologies and modern approaches to solve complex problems",
  },
  {
    icon: Target,
    title: "Result Oriented",
    description: "Focused on delivering measurable results that impact your bottom line",
  },
  {
    icon: Heart,
    title: "Client Focused",
    description: "Your success is our success - we build lasting partnerships",
  },
];

export function TrustSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Why Trust Us */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Description */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why <span className="gradient-text">Trust Us</span>?
            </h2>
            <p className="text-lg text-muted-foreground">
              With years of experience in delivering digital solutions, we have built a reputation for excellence, reliability, and innovation. Our team of experts is dedicated to understanding your unique challenges and crafting solutions that drive real business value.
            </p>
            <p className="text-muted-foreground">
              We combine technical expertise with strategic thinking to ensure every project we undertake exceeds expectations. From startups to enterprises, we have helped businesses across industries achieve their digital transformation goals.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 rounded-full bg-gold/10 text-gold border border-gold/20 text-sm font-medium">
                ISO Certified
              </span>
              <span className="px-4 py-2 rounded-full bg-blue-electric/10 text-blue-electric border border-blue-electric/20 text-sm font-medium">
                GDPR Compliant
              </span>
              <span className="px-4 py-2 rounded-full bg-purple-light/10 text-purple-light border border-purple-light/20 text-sm font-medium">
                SOC 2 Type II
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {trustStats.map((stat, index) => (
              <div
                key={index}
                className="glass-strong rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why <span className="text-blue-electric">Choose</span> V-Productions?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We deliver more than just code - we deliver success
          </p>
        </div>

        {/* Value Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueCards.map((card, index) => (
            <div
              key={index}
              className="group glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 golden-glow-hover cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <card.icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-gold transition-colors">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
