"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Save, Image as ImageIcon, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewBlog() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "", category: "AI", author: "Admin", read_time: "5 min", excerpt: "", content: ""
  });

  const handlePublish = async (e: any) => {
    e.preventDefault();
    if (!file) return alert("Please upload an image!");
    setIsSaving(true);

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: stErr } = await supabase.storage.from('blog_images').upload(fileName, file);
      if (stErr) throw stErr;

      const { data: url } = supabase.storage.from('blog_images').getPublicUrl(fileName);

      const { error: dbErr } = await supabase.from('blogs').insert([{
        ...formData, image_url: url.publicUrl
      }]);

      if (dbErr) throw dbErr;
      alert("Blog Published! 🚀");
      router.push("/admin/blogs");
    } catch (err: any) { alert(err.message); } 
    finally { setIsSaving(false); }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-10 text-white">
      <Link href="/admin/blogs" className="flex items-center gap-2 text-gold"><ArrowLeft size={18}/> Back</Link>
      <h1 className="text-4xl font-bold">Write <span className="text-gold">Masterpiece</span></h1>

      <form onSubmit={handlePublish} className="bg-[#0d0d1a] p-10 rounded-[3rem] border border-white/5 space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <input required placeholder="Blog Title" className="bg-white/5 p-4 rounded-xl outline-none focus:border-gold border border-white/10" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <select className="bg-[#16162d] p-4 rounded-xl border border-white/10" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
            <option>AI</option><option>Web Dev</option><option>Marketing</option><option>Agency News</option>
          </select>
          <input placeholder="Author Name" className="bg-white/5 p-4 rounded-xl border border-white/10" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
          <input type="file" accept="image/*" onChange={(e:any) => setFile(e.target.files[0])} className="bg-white/5 p-3 rounded-xl border border-white/10" />
        </div>
        
        <textarea placeholder="Short Excerpt (Summary)" rows={3} className="w-full bg-white/5 p-4 rounded-xl border border-white/10 outline-none" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
        <textarea placeholder="Full Blog Content (Markdown or Text)" rows={10} className="w-full bg-white/5 p-4 rounded-xl border border-white/10 outline-none" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />

        <button disabled={isSaving} className="w-full py-5 bg-gold text-black font-black rounded-2xl text-xl hover:brightness-110">
          {isSaving ? <Loader2 className="animate-spin mx-auto"/> : "Publish to Website"}
        </button>
      </form>
    </div>
  );
}