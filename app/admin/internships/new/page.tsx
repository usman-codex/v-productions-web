"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Plus, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation"; // 1. Router import kiya
import Link from "next/link";

export default function AdminNewInternship() {
  const router = useRouter(); // 2. Router initialize kiya
  const [isSaving, setIsSaving] = useState(false); // 3. Loading state
  
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("purple");
  const [duration, setDuration] = useState("3 Months");
  const [skills, setSkills] = useState([""]);
  const [eligibility, setEligibility] = useState([""]);
  const [tasks, setTasks] = useState([""]);

  const handlePublish = async () => {
    // Basic Validation
    if (!title) return alert("Position title is required!");
    if (skills[0] === "" && eligibility[0] === "") return alert("Please add at least one skill and eligibility criteria.");

    setIsSaving(true); // Button ko loading state mein le jayein

    try {
      const { error } = await supabase.from('internships').insert([{
        title, 
        color, 
        duration, 
        skills: skills.filter(s => s !== ""), // Khali items remove karein
        eligibility: eligibility.filter(e => e !== ""), 
        tasks: tasks.filter(t => t !== "")
      }]);

      if (error) throw error;

      alert("🚀 Success! Internship Card Added.");
      
      // 4. Auto-back logic: 1 second ke baad redirect
      setTimeout(() => {
        router.push("/admin/internships");
      }, 500);

    } catch (err: any) {
      alert("❌ Error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-12 text-white">
      {/* Top Navigation */}
      <Link href="/admin/internships" className="flex items-center gap-2 text-gold hover:underline w-fit">
        <ArrowLeft size={20}/> Back to Management
      </Link>

      <h1 className="text-4xl font-bold">Add Premium <span className="text-gold">Internship Card</span></h1>
      
      <div className="glass p-8 md:p-12 rounded-[3rem] border-white/5 space-y-10">
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-8">
           <div className="space-y-2">
             <label className="text-xs font-bold text-gold uppercase ml-1">Position Title</label>
             <input 
               value={title} 
               onChange={e => setTitle(e.target.value)} 
               placeholder="e.g. Internship Position" 
               className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-gold transition-all" 
             />
           </div>
           
           <div className="space-y-2">
             <label className="text-xs font-bold text-gold uppercase ml-1">Theme & Duration</label>
             <div className="flex gap-4">
               <select value={color} onChange={e => setColor(e.target.value)} className="bg-[#16162d] border border-white/10 p-5 rounded-2xl outline-none flex-1">
                  <option value="purple">Purple Theme (Modern)</option>
                  <option value="gold">Gold Theme (Luxury)</option>
                  <option value="blue">Blue Theme (Corporate)</option>
                  <option value="green">Green Theme (Marketing)</option>
               </select>
               <input 
                 value={duration} 
                 onChange={e => setDuration(e.target.value)} 
                 className="bg-[#16162d] border border-white/10 p-5 rounded-2xl outline-none w-32 text-center" 
               />
             </div>
           </div>
        </div>

        {/* Dynamic Lists Section */}
        <div className="grid md:grid-cols-3 gap-8">
           <ListInput title="Skills (Tags)" items={skills} setItems={setSkills} color="text-gold" />
           <ListInput title="Eligibility" items={eligibility} setItems={setEligibility} color="text-blue-400" />
           <ListInput title="What You Will Do" items={tasks} setItems={setTasks} color="text-green-400" />
        </div>

        {/* Action Button */}
        <button 
          disabled={isSaving}
          onClick={handlePublish} 
          className={`w-full py-6 bg-gold text-black font-black rounded-[2rem] text-2xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all hover:scale-[1.01] active:scale-95 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSaving ? (
            <><Loader2 className="animate-spin" size={32}/> Publishing...</>
          ) : (
            <><Save size={32}/> Publish to Website</>
          )}
        </button>
      </div>
    </div>
  );
}

// Helper Component for Dynamic Lists
function ListInput({title, items, setItems, color}: any) {
  return (
    <div className="space-y-4">
      <h3 className={`font-bold uppercase text-[10px] tracking-[0.2em] ${color} ml-1`}>{title}</h3>
      <div className="space-y-3">
        {items.map((it:any, i:any) => (
          <div key={i} className="flex gap-2 group">
            <input 
              value={it} 
              onChange={e => {
                const n = [...items]; 
                n[i] = e.target.value; 
                setItems(n);
              }} 
              className="flex-1 bg-white/5 border border-white/5 p-3 rounded-xl text-sm focus:border-white/20 outline-none transition-all" 
            />
            {items.length > 1 && (
              <button 
                onClick={() => setItems(items.filter((_:any,idx:any) => idx !== i))} 
                className="text-red-400/50 hover:text-red-400 transition-colors"
              >
                <Trash2 size={18}/>
              </button>
            )}
          </div>
        ))}
      </div>
      <button 
        onClick={() => setItems([...items, ""])} 
        className="text-[10px] font-bold text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
      >
        <Plus size={12}/> ADD ITEM
      </button>
    </div>
  );
}