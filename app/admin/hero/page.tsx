"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Image as ImageIcon, Link as LinkIcon, Loader2, Save } from "lucide-react";

export default function HeroCMS() {
  const [images, setImages] = useState<any[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    setLoading(true);
    const { data } = await supabase.from('hero_images').select('*').order('created_at', { ascending: false });
    if (data) setImages(data);
    setLoading(false);
  }

  async function addImage() {
    if (!newUrl) return alert("Please enter image URL");
    setIsAdding(true);
    const { error } = await supabase.from('hero_images').insert([{ url: newUrl }]);
    if (!error) {
      setNewUrl("");
      fetchImages();
    }
    setIsAdding(false);
  }

  async function deleteImage(id: number) {
    if (!confirm("Delete this image from slider?")) return;
    const { error } = await supabase.from('hero_images').delete().eq('id', id);
    if (!error) fetchImages();
  }

  return (
    <div className="p-4 md:p-10 space-y-10 bg-[#060610] min-h-screen text-white">
      <div className="flex items-center gap-4 bg-[#0d0d1a] p-8 rounded-[2.5rem] border border-white/5">
        <div className="bg-gold/10 p-4 rounded-2xl">
          <ImageIcon className="text-gold" size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Hero <span className="text-gold">Slider CMS</span></h1>
          <p className="text-gray-500 text-sm">Update your homepage background images</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* ADD NEW IMAGE */}
        <div className="lg:col-span-1">
          <div className="bg-[#0d0d1a] p-8 rounded-[2.5rem] border border-white/5 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Plus className="text-gold" size={20} /> Add New Image
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="Paste Image URL here..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-gold transition-all"
                />
              </div>
              <button 
                onClick={addImage}
                disabled={isAdding}
                className="w-full bg-gold text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
              >
                {isAdding ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                Save to Slider
              </button>
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed italic">
              * Recommended: Use high-resolution landscape images (1920x1080).
            </p>
          </div>
        </div>

        {/* CURRENT IMAGES LIST */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 px-2">
            <ImageIcon className="text-blue-400" size={20} /> Current Backgrounds ({images.length})
          </h2>
          
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gold" size={40}/></div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {images.map((img) => (
                <div key={img.id} className="group relative bg-[#0d0d1a] rounded-[2rem] border border-white/5 overflow-hidden transition-all hover:border-red-500/50">
                  <div className="aspect-video relative">
                    <img src={img.url} alt="hero" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    <button 
                      onClick={() => deleteImage(img.id)}
                      className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="p-4 bg-black/40 backdrop-blur-md">
                    <p className="text-[10px] text-gray-400 truncate">{img.url}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}