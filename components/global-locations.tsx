"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

const locations = [
  {
    city: "New York",
    country: "United States",
    address: "350 Fifth Avenue, Suite 4200",
    phone: "+1 (212) 555-0100",
    email: "newyork@v-productions.com",
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "123 Tech Street, Canary Wharf",
    phone: "+44 20 7946 0958",
    email: "london@v-productions.com",
  },
  {
    city: "Singapore",
    country: "Asia Pacific",
    address: "1 Raffles Place, Tower 2",
    phone: "+65 6123 4567",
    email: "singapore@v-productions.com",
  },
];

const partners = [
  "Microsoft Partner",
  "AWS Partner Network",
  "Google Cloud Partner",
  "Salesforce Partner",
];

export function GlobalLocations() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our <span className="gradient-text">Global Presence</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Serving clients across the globe from our strategic locations
          </p>
        </div>

       
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {locations.map((location, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 golden-glow-hover group"
            >
              <div className="h-24 bg-gradient-to-t from-purple-deep/20 to-transparent rounded-xl mb-6 flex items-end justify-center overflow-hidden">
                <div className="flex items-end gap-1 pb-2">
                  {mounted && [...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-foreground/20 group-hover:bg-gold/30 transition-colors"
                      style={{
                        width: `${8 + Math.random() * 8}px`,
                        height: `${20 + Math.random() * 40}px`,
                      }}
                    />
                  ))}
                  {!mounted && [...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-foreground/20"
                      style={{ width: '10px', height: '30px' }}
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-gold transition-colors">
                {location.city}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">{location.country}</p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-gold mt-0.5" />
                  <span className="text-foreground/80">{location.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-gold" />
                  <span className="text-foreground/80">{location.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-gold" />
                  <span className="text-foreground/80">{location.email}</span>
                </div>
              </div>

              <button className="mt-6 w-full py-2 border border-gold/30 text-gold rounded-lg font-medium hover:bg-gold hover:text-accent-foreground transition-all duration-300 flex items-center justify-center gap-2">
                <span>Get Directions</span>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Strategic <span className="text-blue-electric">Partners</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We collaborate with industry leaders to deliver best-in-class solutions. Our partnerships enable us to leverage cutting-edge technologies and provide comprehensive services to our clients.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-4 text-center hover:bg-gold/5 transition-colors"
                >
                  <span className="text-foreground font-medium text-sm">{partner}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2751.6098772675728!2d74.31278917650147!3d31.4703650832057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391907dc891efad1%3A0x10745ba01f02e684!2sPace%20Shopping%20Mall!5e1!3m2!1sen!2s!4v1780303464668!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}