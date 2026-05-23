"use client";
import { Save, Globe, Smartphone, Mail, Instagram, Linkedin, Facebook } from "lucide-react";

export default function GlobalSettings() {
  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Global <span className="text-gold">Configuration</span></h1>
        <button className="bg-gold text-black px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 transition-all active:scale-95">
          <Save size={20}/> Save Changes
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="glass p-8 rounded-3xl border-white/5 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2"><Smartphone size={20} className="text-gold"/> Header/Footer Info</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground ml-1">Agency Email</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-gold" defaultValue="info@v-productions.com" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground ml-1">WhatsApp Number (Floating Button)</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-gold" defaultValue="+92 300 1234567" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground ml-1">Office Address</label>
              <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-gold h-20" defaultValue="DHA Phase 6, Lahore"></textarea>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="glass p-8 rounded-3xl border-white/5 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2"><Globe size={20} className="text-blue-400"/> Social Identity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Facebook className="text-blue-600" size={24}/>
              <input type="text" className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-blue-600" placeholder="Facebook URL" />
            </div>
            <div className="flex items-center gap-4">
              <Linkedin className="text-blue-400" size={24}/>
              <input type="text" className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-blue-400" placeholder="LinkedIn URL" />
            </div>
            <div className="flex items-center gap-4">
              <Instagram className="text-pink-500" size={24}/>
              <input type="text" className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-pink-500" placeholder="Instagram URL" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}