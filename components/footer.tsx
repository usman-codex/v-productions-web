"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, MessageCircle } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Careers", href: "#careers" },
];

const services = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "AI Solutions", href: "/services/machine-learning" },
  { label: "Mobile Apps", href: "/services/mobile-apps" },
  { label: "Cloud Services", href: "/services/data-engineering" },
  { label: "Digital Marketing", href: "/services/social-media-marketing" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <>
      <footer className="bg-purple-deep/80 pt-16 pb-8 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* About */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-lg">V</span>
                </div>
                <div>
                  <span className="font-bold text-lg text-foreground">V-Productions</span>
                  <span className="text-gold text-sm block -mt-1">& Marketing</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Transforming businesses through innovative technology solutions. We specialize in AI, web development, and digital marketing to help you succeed in the digital age.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300 group"
                  >
                    <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-foreground mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-gold transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-foreground mb-6 text-lg">Major Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      className="text-muted-foreground hover:text-gold transition-colors text-sm"
                    >
                      {service.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-foreground mb-6 text-lg">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gold mt-0.5" />
                  <span className="text-muted-foreground text-sm">
                    350 Fifth Avenue, Suite 4200<br />
                    New York, NY 10118
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gold" />
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gold" />
                  <a href="mailto:vmarketingsofficial@gmail.com" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                    vmarketingsofficial@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-foreground/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} V-Productions & Marketing. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                  Terms of Service
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-50 animate-pulse-glow"
        aria-label="Chat on WhatsApp"
        style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)' }}
      >
        <MessageCircle className="h-7 w-7 text-white" fill="currentColor" />
      </a>
    </>
  );
}
