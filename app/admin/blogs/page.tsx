"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Edit3, FileText, CheckCircle, Star, Search, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminBlogManager() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchBlogs(); }, []);

  async function fetchBlogs() {
    setLoading(true);
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    if (data) setBlogs(data);
    setLoading(false);
  }

  async function deleteBlog(id: number) {
    if(!confirm("Delete this article?")) return;
    await supabase.from('blogs').delete().eq('id', id);
    fetchBlogs();
  }

  async function toggleFeatured(id: number, current: boolean) {
    // Pehle baqi sab ko featured false karo (agar sirf ek featured rakhna ho)
    if (!current) {
        await supabase.from('blogs').update({ is_featured: false }).neq('id', id);
    }
    await supabase.from('blogs').update({ is_featured: !current }).eq('id', id);
    fetchBlogs();
  }

  return (
    <div className="space-y-8 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog <span className="text-gold">Editor</span></h1>
        <Link href="/admin/blogs/new">
          <button className="bg-gold text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all">
            <Plus size={20}/> Write New Blog
          </button>
        </Link>
      </div>

      <div className="grid gap-4">
        {loading ? <Loader2 className="animate-spin mx-auto text-gold" size={40}/> : 
         blogs.map(blog => (
          <div key={blog.id} className="bg-[#0d0d1a] p-6 rounded-[2rem] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6 w-full">
              <img src={blog.image_url} className="w-24 h-24 rounded-2xl object-cover border border-white/10" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                   <span className="text-[10px] font-bold text-gold uppercase tracking-widest">{blog.category}</span>
                   {blog.is_featured && <span className="bg-gold/10 text-gold text-[8px] px-2 py-0.5 rounded-full border border-gold/20 flex items-center gap-1"><Star size={8} fill="currentColor"/> FEATURED</span>}
                </div>
                <h3 className="font-bold text-lg leading-tight">{blog.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{blog.author} • {new Date(blog.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <button onClick={() => toggleFeatured(blog.id, blog.is_featured)} title="Toggle Featured" className={`p-3 rounded-xl transition-all ${blog.is_featured ? 'bg-gold text-black' : 'bg-white/5 text-gray-500 hover:text-gold'}`}><Star size={18}/></button>
              <Link href={`/admin/blogs/edit/${blog.id}`} className="p-3 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all"><Edit3 size={18}/></Link>
              <button onClick={() => deleteBlog(blog.id)} className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}