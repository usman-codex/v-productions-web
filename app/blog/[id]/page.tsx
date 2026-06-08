"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Calendar, User, Clock, ArrowLeft, Loader2, Share2, Bookmark } from "lucide-react";
import Link from "next/link";

export default function BlogDetail({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      const { data } = await supabase.from('blogs').select('*').eq('id', params.id).single();
      if (data) setBlog(data);
      setLoading(false);
    }
    fetchBlog();
    window.scrollTo(0, 0); 
  }, [params.id]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#060610]">
      <Loader2 className="animate-spin text-gold" size={50} />
    </div>
  );

  if (!blog) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#060610] text-white">
      <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
      <Link href="/blog" className="text-gold underline">Back to Blog</Link>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#060610] text-white pt-32 pb-20">
      <Header />
      
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="flex justify-between items-center mb-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-gold transition-all font-bold group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Insights
          </Link>
          <div className="flex gap-4">
             <button className="p-2 bg-white/5 rounded-full hover:text-gold transition-colors"><Share2 size={18}/></button>
             <button className="p-2 bg-white/5 rounded-full hover:text-gold transition-colors"><Bookmark size={18}/></button>
          </div>
        </div>

        
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
            {blog.category}
          </span>
          <div className="h-px flex-1 bg-white/5"></div>
          <span className="text-xs text-gray-500 font-bold uppercase tracking-tighter flex items-center gap-2">
            <Calendar size={14} className="text-gold" /> {new Date(blog.created_at).toLocaleDateString()}
          </span>
        </div>

        
        <h1 className="text-4xl md:text-7xl font-black mb-10 leading-[1.1] tracking-tighter italic">
          {blog.title}
        </h1>

        
        <div className="flex items-center gap-6 mb-12 p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
          <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center text-gold font-black">
             {blog.author?.charAt(0) || 'V'}
          </div>
          <div className="flex-1">
             <p className="text-xs text-gray-500 uppercase font-black tracking-widest">Written By</p>
             <p className="text-lg font-bold text-white">{blog.author || "Admin"}</p>
          </div>
          <div className="text-right">
             <p className="text-xs text-gray-500 uppercase font-black tracking-widest flex items-center justify-end gap-1">
                <Clock size={12}/> Est. Read
             </p>
             <p className="text-lg font-bold text-gold">{blog.read_time || "5 min"}</p>
          </div>
        </div>

        
        <div className="relative rounded-[3rem] overflow-hidden border border-white/10 mb-16 shadow-2xl shadow-blue-500/10">
          <img 
            src={blog.image_url} 
            className="w-full h-auto max-h-[600px] object-cover" 
            alt={blog.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060610]/40 to-transparent pointer-events-none" />
        </div>

       
        <div className="relative">
            
            <p className="text-2xl text-gold font-bold italic mb-12 border-l-4 border-gold pl-8 leading-relaxed opacity-90">
                {blog.excerpt}
            </p>

            
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 text-xl leading-[1.8] space-y-8 whitespace-pre-wrap font-medium selection:bg-gold selection:text-black">
                {blog.content}
              </div>
            </div>
        </div>

       
        <div className="mt-20 pt-10 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm mb-6">Enjoyed this article? Share it with your network!</p>
             <Link href="/blog">
                <button className="bg-white/5 border border-white/10 px-10 py-4 rounded-full font-bold hover:bg-gold hover:text-black transition-all shadow-xl active:scale-95">
                    Explore More Articles
                </button>
            </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}