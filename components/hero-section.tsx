"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const services = ["AI Automation", "Web Development", "Digital Marketing", "Cloud Solutions", "Enterprise Software"];

const heroImages = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&q=80",
];

export function HeroSection() {
  const [currentService, setCurrentService] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const serviceInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentService((prev) => (prev + 1) % services.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(serviceInterval);
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(imageInterval);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentImage ? "opacity-100" : "opacity-0"
          )}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container  mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto ">
          <p className="text-gold  pt-35 font-semibold mb-4 tracking-wider uppercase animate-fade-in-up">
            Welcome to V-Productions & Marketing
          </p>
          <h1 className="text-4xl  sm:text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Transforming Ideas Into
            <span className="block mt-2">
              <span className="gradient-text">Digital Reality</span>
            </span>
          </h1>

          {/* Service Rotator */}
          <div className="h-16 flex items-center justify-center mb-8 overflow-hidden">
            <div className="flex items-center gap-4">
              <span className="text-xl md:text-2xl text-muted-foreground">We specialize in</span>
              <span
                className={cn(
                  "text-2xl md:text-3xl font-bold text-blue-electric transition-all duration-500",
                  isAnimating ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
                )}
              >
                {services[currentService]}
              </span>
            </div>
          </div>

          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Empower your business with cutting-edge technology solutions. From AI automation to enterprise software, we deliver excellence at every step.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gold text-accent-foreground hover:bg-gold-light font-semibold text-lg px-8 py-6 golden-glow-hover transition-all duration-300"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-electric text-blue-electric hover:bg-blue-electric/10 font-semibold text-lg px-8 py-6"
            >
              Our Services
            </Button>
          </div>
        </div>
      </div>

      {/* Image Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <button
          onClick={prevImage}
          className="p-2 rounded-full glass hover:bg-gold/20 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentImage ? "bg-gold w-8" : "bg-foreground/30 hover:bg-foreground/50"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={nextImage}
          className="p-2 rounded-full glass hover:bg-gold/20 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
