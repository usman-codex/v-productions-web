"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Loader2,
  Mail,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const categories = ["All", "AI", "Web Dev", "Agency News", "Marketing"];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setBlogs(data);
      setLoading(false);
    }
    fetch();
  }, []);


  const featured = blogs.find((b) => b.is_featured) || blogs[0];


  const regularBlogs = blogs.filter((b) => b.id !== featured?.id);

  const filtered = regularBlogs.filter(
    (b) =>
      (activeCategory === "All" || b.category === activeCategory) &&
      b.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#060610]">
        <Loader2 className="animate-spin text-gold" size={50} />
      </div>
    );

  return (
    <main className="min-h-screen bg-[#060610] text-white pt-20">
      <Header />

      
      <section className="py-20 bg-gradient-to-b from-purple-deep/10 to-transparent text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-8 italic tracking-tighter">
            Agency <span className="gradient-text">Insights</span>
          </h1>
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search articles by title..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 outline-none focus:border-gold transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-6 py-2 rounded-xl text-xs font-bold transition-all border ${activeCategory === c ? "bg-gold text-black border-gold shadow-lg shadow-gold/20" : "bg-white/5 border-white/10 text-gray-400 hover:border-gold/50"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      {featured && (
        <section className="container mx-auto px-4 pb-20">
          <div className="bg-[#0d0d1a] rounded-[3rem] overflow-hidden border border-white/5 flex flex-col lg:flex-row group transition-all hover:border-gold/20 shadow-2xl">
            <div className="lg:w-1/2 overflow-hidden aspect-video lg:aspect-auto relative">
              <img
                src={featured.image_url}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                alt="featured"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d1a] via-transparent to-transparent hidden lg:block" />
            </div>
            <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-2">
                <span className="bg-gold text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  LATEST STORY
                </span>
                <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  <Sparkles size={12} /> {featured.category}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-white group-hover:text-gold transition-colors">
                {featured.title}
              </h2>
              <p className="text-gray-400 text-lg line-clamp-3 leading-relaxed font-medium">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-500 font-bold border-t border-white/5 pt-6">
                <span className="flex items-center gap-2">
                  <User size={16} className="text-gold" /> {featured.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-gold" />{" "}
                  {new Date(featured.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

     
      <section className="container mx-auto px-4 pb-32">
        <div className="grid lg:grid-cols-12 gap-12">
         
          <div className="lg:col-span-8 space-y-12">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div className="w-8 h-1 bg-gold rounded-full"></div> More Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              {filtered.map((blog) => (
                <div
                  key={blog.id}
                  className="group bg-[#0d0d1a] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-gold/30 transition-all flex flex-col h-full hover:shadow-2xl"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={blog.image_url}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      {blog.category}
                    </span>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold mb-4 uppercase tracking-tighter">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-gold" />{" "}
                        {blog.read_time || "5 min"} read
                      </span>
                      <span>
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
                      {blog.excerpt}
                    </p>
                    <Link href={`/blog/${blog.id}`} className="mt-auto w-fit">
                      <button className="text-gold font-black text-[10px] uppercase flex items-center gap-2 hover:gap-4 transition-all tracking-widest">
                        Read Full Story <ArrowRight size={14} />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="text-gray-500 italic text-center col-span-full py-20">
                  No matching articles found.
                </p>
              )}
            </div>
          </div>

          
          <aside className="lg:col-span-4 space-y-10">
            
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 p-8 rounded-[2.5rem] border border-blue-500/20 shadow-xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all" />
              <Mail className="text-blue-400 mb-4" size={32} />
              <h3 className="text-2xl font-black mb-3">
                Stay <span className="text-blue-400">Updated</span>
              </h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Get the latest technology insights and agency news delivered
                directly to your inbox every week.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="yourname@email.com"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-blue-400 transition-all text-white"
                />
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-900/40 transition-all active:scale-95">
                  Subscribe Now
                </button>
              </div>
              <p className="text-[9px] text-gray-500 mt-4 text-center">
                No spam, just pure tech value. Promise.
              </p>
            </div>

          
            <div className="sticky top-28 space-y-6">
              <div className="aspect-[4/5] bg-[#0d0d1a] rounded-[2.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center p-8 text-center group hover:border-gold/20 transition-all">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-600 group-hover:text-gold transition-colors">
                  <Sparkles size={32} />
                </div>
                <h4 className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-2">
                  Partner Content
                </h4>
                <p className="text-gray-600 text-sm italic">
                  Advertisement Space Available for Tech Brands
                </p>
              </div>

              
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <h4 className="font-bold text-xs uppercase tracking-widest text-gold mb-4">
                  Quick Links
                </h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      className="bg-black/40 px-4 py-2 rounded-xl text-[10px] font-bold text-gray-400 border border-white/5 hover:text-white transition-colors"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
