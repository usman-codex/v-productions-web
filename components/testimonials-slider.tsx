"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "V-Productions transformed our digital presence completely. Their team delivered an exceptional e-commerce platform that increased our sales by 150% in just six months.",
    name: "Sarah Johnson",
    title: "CEO, TechRetail Inc.",
    company: "TechRetail",
  },
  {
    quote: "The AI automation solutions they built for us have saved countless hours of manual work. Their expertise in machine learning is truly impressive.",
    name: "Michael Chen",
    title: "CTO, DataFlow Systems",
    company: "DataFlow",
  },
  {
    quote: "Working with V-Productions was a game-changer for our startup. They understood our vision and delivered a product that exceeded all expectations.",
    name: "Emily Rodriguez",
    title: "Founder, HealthTech Solutions",
    company: "HealthTech",
  },
  {
    quote: "Their team is incredibly professional and technically skilled. The custom CRM they developed has streamlined our operations significantly.",
    name: "David Kim",
    title: "Operations Director, Global Logistics",
    company: "GlobalLogistics",
  },
];

export function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-deep/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by businesses worldwide to deliver exceptional results
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-strong rounded-3xl p-8 md:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gold flex items-center justify-center">
              <Quote className="h-6 w-6 text-accent-foreground" />
            </div>

            {/* Content */}
            <div className="text-center pt-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={cn(
                    "transition-all duration-500",
                    index === currentIndex
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 absolute inset-0 translate-x-8"
                  )}
                >
                  <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-accent-foreground">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gold">{testimonial.name}</h4>
                    <p className="text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="p-3 rounded-full glass hover:bg-gold/20 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(index);
                    }}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === currentIndex ? "bg-gold w-6" : "bg-foreground/30 hover:bg-foreground/50"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-3 rounded-full glass hover:bg-gold/20 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
