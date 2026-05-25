"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Plus, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";

export default function AdminNewInternship() {
  const router = useRouter(); 
  const [isSaving, setIsSaving] = useState(false); 
  
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("purple");
  const [duration, setDuration] = useState("3 Months");
  const [skills, setSkills] = useState([""]);
  const [eligibility, setEligibility] = useState([""]);
  const [tasks, setTasks] = useState([""]);
  const [benefits, setBenefits] = useState([""]);

  const handlePublish = async () => {
    if (!title) return alert("Position title is required!");
    setIsSaving(true); 

    try {
      const { error } = await supabase.from('internships').insert([{
        title, color, duration, 
        skills: skills.filter(s => s !== ""), 
        eligibility: eligibility.filter(e => e !== ""), 
        tasks: tasks.filter(t => t !== ""),
        benefits: benefits.filter(b => b !== "")
      }]);

      if (error) throw error;
      alert("🚀 Success! Internship Card Added.");
      router.push("/admin/internships");
    } catch (err: any) {
      alert("❌ Error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-10 space-y-10 text-white min-h-screen">
      <Link href="/admin/internships" className="flex items-center gap-2 text-gold hover:underline w-fit mb-4">
        <ArrowLeft size={18}/> Back to Management
      </Link>

      <h1 className="text-4xl font-bold">Add <span className="text-gold">Internship Card</span></h1>
      
      <div className="bg-[#0d0d1a] p-6 md:p-10 rounded-[2.5rem] border border-white/5 space-y-12 shadow-2xl">
        {/* Top Section: Title & Theme */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-2">
             <label className="text-[10px] font-bold text-gold uppercase ml-1 tracking-widest">Position Title</label>
             <input 
               value={title} 
               onChange={e => setTitle(e.target.value)} 
               placeholder="e.g. Intern Position" 
               className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-gold transition-all text-lg" 
             />
           </div>
           
           <div className="space-y-2">
             <label className="text-[10px] font-bold text-gold uppercase ml-1 tracking-widest">Theme & Duration</label>
             <div className="flex gap-3">
               <select value={color} onChange={e => setColor(e.target.value)} className="bg-[#16162d] border border-white/10 p-5 rounded-2xl outline-none flex-1 text-sm">
                  <option value="purple">Purple Theme</option>
                  <option value="gold">Gold Theme</option>
                  <option value="blue">Blue Theme</option>
                  <option value="green">Green Theme</option>
                  <option value="indigo">Indigo Theme</option>
                  <option value="amber">Amber Theme</option>
               </select>
               <input 
                 value={duration} 
                 onChange={e => setDuration(e.target.value)} 
                 className="bg-[#16162d] border border-white/10 p-5 rounded-2xl outline-none w-28 text-center font-bold text-sm" 
               />
             </div>
           </div>
        </div>

        {/* Dynamic Lists Section: Responsive 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
           <ListInput title="Skills (Tags)" items={skills} setItems={setSkills} color="text-purple-400" placeholder="e.g. " />
           <ListInput title="Eligibility" items={eligibility} setItems={setEligibility} color="text-gold" placeholder="e.g. " />
           <ListInput title="What You Will Do" items={tasks} setItems={setTasks} color="text-blue-400" placeholder="e.g. " />
           <ListInput title="Benefits" items={benefits} setItems={setBenefits} color="text-green-400" placeholder="e.g. " /> 
        </div>

        {/* Publish Button */}
        <div className="pt-6">
          <button 
            disabled={isSaving}
            onClick={handlePublish} 
            className={`w-full py-6 bg-gold text-black font-black rounded-[2rem] text-2xl flex items-center justify-center gap-3 shadow-2xl hover:brightness-110 active:scale-[0.98] transition-all ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSaving ? (
              <><Loader2 className="animate-spin" size={30}/> Publishing...</>
            ) : (
              <><Save size={30}/> Publish to Website</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Fixed Helper Component
function ListInput({title, items, setItems, color, placeholder}: any) {
  return (
    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 flex flex-col h-full">
      <h3 className={`font-bold uppercase text-[10px] tracking-[0.2em] ${color} mb-5 ml-1`}>{title}</h3>
      <div className="space-y-3 flex-grow">
        {items.map((it:any, i:any) => (
          <div key={i} className="flex gap-2 group items-start">
            <textarea 
              rows={1}
              value={it} 
              onChange={e => {
                const n = [...items]; 
                n[i] = e.target.value; 
                setItems(n);
              }} 
              className="flex-1 bg-black/40 border border-white/5 p-3 rounded-xl text-xs focus:border-gold outline-none transition-all resize-none min-h-[45px]" 
              placeholder={placeholder}
            />
            {items.length > 1 && (
              <button 
                onClick={() => setItems(items.filter((_:any,idx:any) => idx !== i))} 
                className="text-red-400/30 hover:text-red-500 transition-colors pt-3"
              >
                <Trash2 size={16}/>
              </button>
            )}
          </div>
        ))}
      </div>
      <button 
        onClick={() => setItems([...items, ""])} 
        className="mt-4 text-[10px] font-bold text-gray-500 hover:text-gold transition-colors flex items-center gap-1 w-fit ml-1"
      >
        <Plus size={14}/> ADD ITEM
      </button>
    </div>
  );
}