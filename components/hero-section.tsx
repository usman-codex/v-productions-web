"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const services = ["AI Automation", "Web Development", "Digital Marketing", "Cloud Solutions", "Enterprise Software"];

export function HeroSection() {
  const [currentService, setCurrentService] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchHeroImages() {
      const { data } = await supabase.from('hero_images').select('url').order('created_at', { ascending: true });
      if (data && data.length > 0) {
        setImages(data.map(img => img.url));
      } else {
        setImages([
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80",
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&q=80"
        ]);
      }
    }
    fetchHeroImages();
  }, []);

  useEffect(() => {
    const serviceInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentService((prev) => (prev + 1) % services.length);
        setIsAnimating(false);
      }, 600);
    }, 3500);
    return () => clearInterval(serviceInterval);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(imageInterval);
  }, [images]);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#060610]">
      
      {/* Background Images Slider - Made Brighter */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-all duration-[1500ms] ease-in-out",
              index === currentImage ? "opacity-100 scale-100" : "opacity-0 scale-110"
            )}
          >
            <div
              className="absolute inset-0 bg-[length:100%_100%] bg-center bg-no-repeat brightness-90" // Increased brightness
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
        ))}
        {/* Lighter Overlays for better visibility */}
        <div className="absolute inset-0 bg-black/30 z-10" /> {/* Reduced from 60 to 30 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060610]/60 via-transparent to-[#060610] z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-8 text-center pt-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          
          <div className="inline-block mb-6 px-4 py-1 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-md">
            <p className="text-gold font-bold tracking-[0.4em] uppercase text-[10px] sm:text-xs">
              Next-Gen Digital Solutions
            </p>
          </div>
          
          <h1 className="text-4xl  sm:text-6xl md:text-[80px] font-black text-white leading-[1] tracking-tight mb-8 drop-shadow-2xl">
            Transforming Ideas Into
            <span className="block mt-3 bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent italic">
              Digital Reality
            </span>
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center  gap-2 md:gap-4 mb-8">
            <span className="text-lg md:text-2xl text-white font-medium tracking-tight drop-shadow-md">
              We specialize in
            </span>
            <div className="h-[40px] md:h-[50px] overflow-hidden">
              <span
                className={cn(
                  "block text-2xl md:text-4xl font-extrabold text-blue-400 transition-all duration-700 ease-in-out",
                  isAnimating ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
                )}
              >
                {services[currentService]}
              </span>
            </div>
          </div>

          <p className="text-sm md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
            Empowering your business with high-performance technology. From AI-driven automation 
            to robust enterprise software, we engineer excellence at every digital touchpoint.
          </p>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-0 right-0 z-30 flex justify-center items-center gap-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className="group py-4 px-2 focus:outline-none"
          >
            <div className={cn(
              "h-1 rounded-full transition-all duration-500",
              index === currentImage 
                ? "w-12 bg-gold shadow-[0_0_20px_rgba(212,175,55,0.6)]" 
                : "w-4 bg-white/40 group-hover:bg-white/60"
            )} />
          </button>
        ))}
      </div>
    </section>
  );
}