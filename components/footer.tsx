"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, MessageCircle } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
];

const services = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "AI Solutions", href: "/services/machine-learning" },
  { label: "Mobile Apps", href: "/services/mobile-apps" },
  { label: "Cloud Services", href: "/services/data-engineering" },
  { label: "Digital Marketing", href: "/services/social-media-marketing" },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/people/V-Productions-and-Marketing-ltd/61586716478202/", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <>
      <footer className="bg-[#0a0a1a] pt-16 pb-8 relative overflow-hidden border-t border-white/5"> 
        <div className="container mx-auto px-4 relative z-10">
          
      
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          
            <div className="col-span-2 lg:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg">
                  <span className="text-black font-bold text-lg">V</span>
                </div>
                <div>
                  <span className="font-bold text-lg text-white block leading-none">V-Productions</span>
                  <span className="text-gold text-[10px] uppercase font-black tracking-widest">& Marketing</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Transforming businesses through innovative technology solutions. We specialize in AI, Web Dev, and Digital Strategy.
              </p>
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all group"
                  >
                    <social.icon className="h-4 w-4 text-gray-400 group-hover:text-black transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            
            <div className="col-span-1">
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest text-gold">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-gray-400 hover:text-gold transition-colors text-sm font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          
            
            <div className="col-span-1">
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest text-gold">Major Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link href={service.href} className="text-gray-400 hover:text-gold transition-colors text-sm font-medium">
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
           
            <div className="col-span-2 lg:col-span-1">
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest text-gold">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm">
                    Office #225, Pace Center, Model Town link Road, Lahore.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gold shrink-0" />
                  <a href="tel:+923204731582" className="text-gray-400 hover:text-gold transition-colors text-sm font-medium">
                    0320-4731582
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gold shrink-0" />
                  <a href="mailto:vmarketingsofficial@gmail.com" className="text-gray-400 hover:text-gold transition-colors text-sm font-medium break-all">
                    vmarketingsofficial@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          
          <div className="border-t border-white/5 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
              <p className="text-gray-500 text-xs font-medium">
                © {new Date().getFullYear()} V-Productions & Marketing. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link href="#" className="text-gray-500 hover:text-gold text-xs font-bold uppercase tracking-tighter">Privacy Policy</Link>
                <Link href="#" className="text-gray-500 hover:text-gold text-xs font-bold uppercase tracking-tighter">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      
      <a
        href="https://wa.me/923204731582"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all z-50 animate-bounce"
        style={{ boxShadow: '0 0 25px rgba(34, 197, 94, 0.4)' }}
      >
        <MessageCircle className="h-8 w-8 text-white" fill="currentColor" />
      </a>
    </>
  );
}