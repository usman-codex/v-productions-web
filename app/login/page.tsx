"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("Invalid Credentials: " + error.message);
    } else {
      router.push("/admin");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#060610] flex items-center justify-center p-4">
      <div className="bg-[#0d0d1a] w-full max-w-md p-10 rounded-[3rem] border border-white/5 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gold/20">
            <ShieldCheck className="text-gold" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white italic">V-ADMIN <span className="text-gold">LOGIN</span></h1>
          <p className="text-gray-500 text-sm mt-2 font-medium tracking-wide">Enter your credentials to access system</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="email" required placeholder="Admin Email"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-gold transition-all text-white"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="password" required placeholder="Password"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-gold transition-all text-white"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-gold text-black font-black py-4 rounded-2xl text-lg hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-gold/20 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "ACCESS DASHBOARD"}
          </button>
        </form>
      </div>
    </div>
  );
}