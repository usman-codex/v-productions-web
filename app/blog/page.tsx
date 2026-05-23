"use client";

import { useState } from "react";
import { Search, Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const categories = ["All", "AI", "Web Dev", "Agency News", "Marketing"];

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Modern Marketing Agencies",
    category: "AI",
    date: "May 20, 2024",
    author: "Alex Rivera",
    readTime: "5 min",
    excerpt: "Discover how artificial intelligence is transforming the way we create content and target audiences...",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Why Next.js is the King of Web Frameworks in 2024",
    category: "Web Dev",
    date: "May 18, 2024",
    author: "Sarah Chen",
    readTime: "8 min",
    excerpt: "Performance, SEO, and developer experience: why your next project should be built with Next.js...",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "V-Productions Opens New Innovation Hub in Lahore",
    category: "Agency News",
    date: "May 15, 2024",
    author: "Admin",
    readTime: "3 min",
    excerpt: "We are excited to announce our newest office space dedicated to AI research and development...",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <main className="min-h-screen pt-20">
      <Header />
      
      {/* 1. Hero Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-purple-deep/20 to-transparent">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Insights, News & <span className="gradient-text">Tech Trends</span>
          </h1>
          
          <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full bg-card/50 border border-gold/20 rounded-xl py-3 pl-10 pr-4 focus:border-gold outline-none transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat ? 'bg-gold text-black' : 'bg-card border border-white/10 hover:border-gold/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Post */}
      <section className="pb-20 container mx-auto px-4">
        <div className="glass rounded-3xl overflow-hidden flex flex-col lg:flex-row group border-gold/10">
          <div className="lg:w-1/2 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              alt="Featured"
            />
          </div>
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6">
            <span className="bg-gold text-black px-4 py-1 rounded-full text-xs font-bold w-fit">LATEST</span>
            <h2 className="text-3xl md:text-4xl font-bold hover:text-gold transition-colors cursor-pointer">
              Navigating the Cyber Security Landscape in the Era of Generative AI
            </h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><User className="h-4 w-4" /> James Bond</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> May 21, 2024</span>
            </div>
            <p className="text-muted-foreground text-lg">
              The rise of AI has created new challenges for cybersecurity. Explore the latest defense strategies and tools used by top marketing agencies.
            </p>
            <button className="golden-button w-fit px-8 py-3 rounded-xl font-bold flex items-center gap-2">
              Read More <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. News Grid & Sidebar */}
      <section className="pb-20 container mx-auto px-4 grid lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 grid md:grid-cols-2 gap-8 animate-fade-in-up">
          {blogPosts.map(post => (
            <div key={post.id} className="glass rounded-2xl overflow-hidden group border-white/5 hover:border-gold/30 transition-all">
              <div className="h-48 overflow-hidden relative">
                <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase">
                  #{post.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex justify-between text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime} read</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-gold transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                <button className="text-gold font-bold flex items-center gap-1 text-sm hover:translate-x-2 transition-transform">
                  Read Article <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Newsletter */}
          <div className="glass p-6 rounded-2xl border-blue-500/20 bg-blue-900/10">
            <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-6">Get the latest tech news delivered to your inbox weekly.</p>
            <input type="email" placeholder="Email Address" className="w-full bg-black/40 border border-white/10 rounded-xl p-3 mb-4 outline-none focus:border-blue-500" />
            <button className="w-full py-3 bg-blue-electric text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all">
              Subscribe Now
            </button>
          </div>

          {/* Ad Placeholder */}
          <div className="aspect-[4/5] glass rounded-2xl border-white/5 flex flex-col items-center justify-center p-6 text-center italic text-muted-foreground sticky top-24">
            <div className="w-full h-full border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center">
              Advertisement Spot
            </div>
          </div>
        </aside>
      </section>

      {/* Pagination */}
      <div className="container mx-auto px-4 pb-20 flex justify-center gap-4">
        <button className="px-6 py-2 border border-gold/30 text-gold rounded-lg hover:bg-gold/10">Previous</button>
        <button className="px-6 py-2 bg-gold text-black font-bold rounded-lg hover:shadow-lg">1</button>
        <button className="px-6 py-2 border border-gold/30 text-gold rounded-lg hover:bg-gold/10">Next</button>
      </div>

      <Footer />
    </main>
  );
}