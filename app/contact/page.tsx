"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Phone, Mail, MapPin, Send, Facebook, Linkedin, Instagram, Twitter, Loader2, CheckCircle } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      whatsapp: formData.get("whatsapp"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const { error } = await supabase.from("leads").insert([data]);
      if (error) throw error;
      setSubmitted(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060610] text-white pt-24">
      <Header />
      
     
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic">
            Get in Touch with Our <span className="gradient-text">Experts</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">We're here to help you build the future of your business.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Phone, color: "text-gold", label: "Call Us", value: "0320-4731582" },
            { icon: Mail, color: "text-blue-400", label: "Email Us", value: "vmarketingsofficial@gmail.com" },
            { icon: MapPin, color: "text-purple-500", label: "Visit Us", value: "Office #225, Pace Center, Model Town Link Road, Lahore" }
          ].map((item, i) => (
            <div key={i} className="bg-[#0d0d1a] p-10 rounded-[2.5rem] text-center border border-white/5 hover:border-gold/30 transition-all group shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <item.icon className={`h-8 w-8 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.label}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

     
      <section className="pb-24 container mx-auto px-4 max-w-5xl">
        <div className="bg-[#0d0d1a] p-8 md:p-16 rounded-[3rem] border border-white/5 relative overflow-hidden shadow-2xl">
          {submitted ? (
            <div className="text-center py-10 animate-fade-in">
              <CheckCircle className="text-green-400 h-20 w-20 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-2">Message Sent!</h2>
              <p className="text-gray-400 mb-8">Our team will get back to you on WhatsApp/Email very soon.</p>
              <button onClick={() => setSubmitted(false)} className="text-gold font-bold hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gold uppercase ml-1">Full Name</label>
                <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-gold transition-all" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gold uppercase ml-1">Email Address</label>
                <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-gold transition-all" placeholder="example@gmail.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gold uppercase ml-1">WhatsApp Number</label>
                <input name="whatsapp" required type="tel" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-gold transition-all" placeholder="+92 320 0000000" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gold uppercase ml-1">Service Required</label>
                <select name="service" className="w-full bg-[#16162d] border border-white/10 rounded-2xl p-5 outline-none focus:border-gold transition-all">
                  <option>Web Development</option>
                  <option>AI Automation</option>
                  <option>UI/UX Design</option>
                  <option>Digital Marketing</option>
                  <option>Mobile App Dev</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gold uppercase ml-1">Your Message</label>
                <textarea name="message" required rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-gold transition-all" placeholder="Tell us about your project..."></textarea>
              </div>
              
              <button disabled={isSubmitting} className="md:col-span-2 bg-gold text-black h-20 rounded-[2rem] font-black text-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl">
                {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={24} /> START CONVERSATION</>}
              </button>
            </form>
          )}
        </div>
      </section>

   
      <section className="pb-32 container mx-auto px-4">
        <div className="rounded-[3rem] overflow-hidden h-[500px] border border-white/10 shadow-2xl">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.4428464687593!2d74.3168864753556!3d31.47036508213607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391907dc891efad1%3A0x10745ba01f02e684!2sPace%20Shopping%20Mall!5e0!3m2!1sen!2spk!4v1717500000000!5m2!1sen!2spk" 
            width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} loading="lazy"
          ></iframe>
        </div>
        
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-black mb-10 tracking-tight italic uppercase">Follow Our <span className="text-gold">Journey</span></h3>
          <div className="flex justify-center gap-6">
            <a href="https://www.facebook.com/people/V-Productions-and-Marketing-ltd/61586716478202/" target="_blank" className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 hover:border-gold hover:text-gold transition-all">
                <Facebook size={28} />
            </a>
            <a href="#" className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 hover:border-gold hover:text-gold transition-all text-blue-400">
                <Linkedin size={28} />
            </a>
            <a href="#" className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 hover:border-gold hover:text-gold transition-all text-pink-500">
                <Instagram size={28} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}