"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, Image as ImageIcon, Loader2, UploadCloud, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function HeroCMS() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => { fetchImages(); }, []);

  async function fetchImages() {
    setLoading(true);
    const { data } = await supabase.from('hero_images').select('*').order('created_at', { ascending: false });
    if (data) setImages(data);
    setLoading(false);
  }

  // IMAGE UPLOAD LOGIC
  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select an image first!");
    setIsUploading(true);

    try {
      // 1. Upload to Supabase Storage
      const fileName = `${Date.now()}-${selectedFile.name}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from('hero_slider') // Bucket name
        .upload(fileName, selectedFile);

      if (storageError) throw storageError;

      // 2. Get Public URL
      const { data: urlData } = supabase.storage
        .from('hero_slider')
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;

      // 3. Save URL to Database table
      const { error: dbError } = await supabase
        .from('hero_images')
        .insert([{ url: publicUrl }]);

      if (dbError) throw dbError;

      alert("🎉 Image uploaded successfully!");
      setSelectedFile(null);
      fetchImages();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  async function deleteImage(id: number, url: string) {
    if (!confirm("Delete this image?")) return;
    
    // Extract file name from URL to delete from storage too
    const fileName = url.split('/').pop();
    
    try {
      await supabase.storage.from('hero_slider').remove([fileName!]);
      const { error } = await supabase.from('hero_images').delete().eq('id', id);
      if (!error) fetchImages();
    } catch (err) {
      alert("Error deleting image");
    }
  }

  return (
    <div className="p-4 md:p-10 space-y-10 bg-[#060610] min-h-screen text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-[#0d0d1a] p-8 rounded-[2.5rem] border border-white/5 gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="bg-gold/10 p-4 rounded-2xl">
            <ImageIcon className="text-gold" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Hero <span className="text-gold">Upload CMS</span></h1>
            <p className="text-gray-500 text-sm">Upload and manage homepage background images</p>
          </div>
        </div>
        <Link href="/admin" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={18} /> Back
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* UPLOAD SECTION */}
        <div className="lg:col-span-1">
          <div className="bg-[#0d0d1a] p-8 rounded-[3rem] border border-white/5 space-y-6 sticky top-10">
            <h2 className="text-xl font-bold flex items-center gap-2 text-gold">
              <UploadCloud size={20} /> Upload Image
            </h2>
            
            <div className="space-y-4">
              <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                accept="image/*"
                onChange={(e: any) => setSelectedFile(e.target.files[0])}
              />
              <label 
                htmlFor="file-upload" 
                className="group p-10 border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center gap-4 cursor-pointer hover:border-gold/50 bg-white/5 transition-all"
              >
                {selectedFile ? (
                  <div className="text-center">
                    <CheckCircle className="text-green-400 mx-auto mb-2" size={40} />
                    <p className="text-sm font-bold truncate max-w-[150px]">{selectedFile.name}</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-gold/10 p-4 rounded-full group-hover:scale-110 transition-transform">
                      <UploadCloud className="text-gold" size={30} />
                    </div>
                    <p className="text-xs text-gray-500 text-center font-medium">Click to browse or <br/> drag and drop</p>
                  </>
                )}
              </label>

              <button 
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="w-full bg-gold text-black font-black py-5 rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-xl disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isUploading ? <><Loader2 className="animate-spin" /> Uploading...</> : "Publish Image"}
              </button>
            </div>

            <p className="text-[10px] text-gray-500 leading-relaxed italic text-center">
              * Recommended size: 1920x1080 (JPG/PNG).
            </p>
          </div>
        </div>

        {/* LIST SECTION */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 px-2">
            <ImageIcon className="text-blue-400" size={20} /> Slider Gallery ({images.length})
          </h2>
          
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gold" size={40}/></div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {images.map((img) => (
                <div key={img.id} className="group relative bg-[#0d0d1a] rounded-[2.5rem] border border-white/5 overflow-hidden transition-all hover:border-gold/30">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={img.url} 
                      alt="hero-preview" 
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => deleteImage(img.id, img.url)}
                        className="bg-red-500 text-white px-8 py-3 rounded-2xl flex items-center gap-2 font-black shadow-2xl hover:scale-105 transition-all"
                      >
                        <Trash2 size={20} /> REMOVE
                      </button>
                    </div>
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