"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Calendar, User, Clock, ArrowLeft, Loader2 } from "lucide-react";
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
  }, [params.id]);

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#060610] text-gold"><Loader2 className="animate-spin" size={40}/></div>;
  if (!blog) return <div className="h-screen flex items-center justify-center bg-[#060610] text-white">Article not found.</div>;

  return (
    <main className="min-h-screen bg-[#060610] text-white pt-32 pb-20">
      <Header />
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold mb-10 transition-all font-bold">
          <ArrowLeft size={18}/> Back to Insights
        </Link>

        {/* Blog Image */}
        <img src={blog.image_url} className="w-full h-[450px] object-cover rounded-[3rem] border border-white/10 mb-10 shadow-2xl" alt={blog.title} />

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8 border-b border-white/5 pb-8 font-bold">
          <span className="bg-blue-600 text-white px-4 py-1 rounded-lg text-[10px] uppercase font-black tracking-widest">{blog.category}</span>
          <span className="flex items-center gap-2 font-medium"><User size={16} className="text-gold"/> {blog.author}</span>
          <span className="flex items-center gap-2 font-medium"><Calendar size={16} className="text-gold"/> {new Date(blog.created_at).toLocaleDateString()}</span>
          <span className="flex items-center gap-2 font-medium"><Clock size={16} className="text-gold"/> {blog.read_time || '5 min'} read</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-black mb-10 leading-tight italic tracking-tighter">{blog.title}</h1>
        
        {/* Full Content */}
        <div className="text-gray-300 text-lg leading-relaxed space-y-6 whitespace-pre-wrap font-medium">
           {blog.content}
        </div>
      </div>
      <Footer />
    </main>
  );
}