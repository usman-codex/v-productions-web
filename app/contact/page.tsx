"use client";

import { Phone, Mail, MapPin, Send, Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20">
      <Header />
      
      {/* 1. Contact Info Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Get in Touch with Our <span className="gradient-text">Experts</span>
          </h1>
          <p className="text-muted-foreground">We're here to help you build the future of your business.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Phone, color: "text-gold", label: "Call Us", value: "+92 (300) 123-4567" },
            { icon: Mail, color: "text-blue-electric", label: "Email Us", value: "info@v-productions.com" },
            { icon: MapPin, color: "text-purple-500", label: "Visit Us", value: "DHA Phase 6, Lahore, Pakistan" }
          ].map((item, i) => (
            <div key={i} className="glass p-8 rounded-3xl text-center hover:scale-105 transition-transform group border-white/5">
              <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/10 transition-colors`}>
                <item.icon className={`h-8 w-8 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.label}</h3>
              <p className="text-muted-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Main Contact Form */}
      <section className="pb-20 container mx-auto px-4 max-w-4xl">
        <div className="glass p-8 md:p-12 rounded-[2rem] border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <form className="relative z-10 grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gold/80 ml-1">Full Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-gold transition-all" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gold/80 ml-1">Professional Email</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-gold transition-all" placeholder="john@company.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gold/80 ml-1">WhatsApp / Phone</label>
              <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-gold transition-all" placeholder="+92 300 0000000" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gold/80 ml-1">Service Required</label>
              <select className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl p-4 outline-none focus:border-gold transition-all appearance-none">
                <option>Web Development</option>
                <option>AI Automation</option>
                <option>Digital Marketing</option>
                <option>Corporate Training</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gold/80 ml-1">Your Message</label>
              <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-gold transition-all" placeholder="How can we help you?"></textarea>
            </div>
            
            <button className="md:col-span-2 group relative overflow-hidden bg-gold text-black h-16 rounded-xl font-bold text-lg">
              <span className="absolute inset-0 bg-white translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Send Message <Send className="h-5 w-5" />
              </span>
            </button>
          </form>
        </div>
      </section>

      {/* 3. Map & Socials */}
      <section className="pb-20 container mx-auto px-4">
        <div className="rounded-3xl overflow-hidden h-96 border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108911.38311130638!2d74.303108!3d31.4504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391906967732d847%3A0x6a053c848f02672!2sDHA%20Phase%206%2C%20Lahore!5e0!3m2!1sen!2spk!4v1716298000000" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            loading="lazy"
          ></iframe>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-8">Follow Our Journey</h3>
          <div className="flex justify-center gap-6">
            {[Facebook, Linkedin, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:border-gold hover:text-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all">
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}