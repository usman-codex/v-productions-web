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
  // 1. Create a state to track if the component has loaded in the browser
  const [mounted, setMounted] = useState(false);

  // 2. Set mounted to true once the component has loaded
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="gradient-text">Global Presence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Serving clients across the globe from our strategic locations
          </p>
        </div>

        {/* Location Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {locations.map((location, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 golden-glow-hover group"
            >
              {/* City Skyline Placeholder */}
              <div className="h-24 bg-gradient-to-t from-purple-deep/20 to-transparent rounded-xl mb-6 flex items-end justify-center overflow-hidden">
                <div className="flex items-end gap-1 pb-2">
                  {/* 3. ONLY render the random bars if mounted is true */}
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
                  {/* 4. Show fixed empty bars on the server so the layout doesn't jump */}
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

        {/* Strategic Partners */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Partner Info */}
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

          {/* Map Placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <div className="w-full h-full bg-gradient-to-br from-purple-deep/30 to-blue-electric/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gold mx-auto mb-4" />
                  <p className="text-muted-foreground">Interactive Map</p>
                  <p className="text-sm text-muted-foreground/60">Click to explore our locations</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gold rounded-xl p-4 shadow-lg">
              <p className="text-accent-foreground font-bold">3+</p>
              <p className="text-accent-foreground/80 text-xs">Global Offices</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}