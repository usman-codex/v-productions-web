"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Search, Download, Trash2, Eye, CheckCircle2, Clock, 
  Loader2, Mail, Phone, MessageSquare, X 
} from "lucide-react";

export default function LeadsInbox() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<any>(null); // For View Modal

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setLeads(data);
    setLoading(false);
  }

  // Delete Lead
  async function deleteLead(id: number) {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (!error) {
      setLeads(leads.filter(l => l.id !== id));
    }
  }

  // Update Status to Responded
  async function markAsResponded(id: number) {
    const { error } = await supabase
      .from('leads')
      .update({ status: 'responded' })
      .eq('id', id);
    if (!error) fetchLeads();
  }

  // CSV Export Logic
  const exportToCSV = () => {
    const headers = ["Name, Email, WhatsApp, Service, Message, Date\n"];
    const rows = leads.map(l => `${l.name}, ${l.email}, ${l.whatsapp}, ${l.service}, ${l.message.replace(/,/g, ' ')}, ${new Date(l.created_at).toLocaleDateString()}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toLocaleDateString()}.csv`;
    a.click();
  };

  // Filter Logic
  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.service?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = leads.filter(l => l.status === 'new' || l.status === 'pending').length;

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-gold" size={40}/></div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-white">Inquiry <span className="text-gold">Inbox</span></h1>
            <p className="text-gray-500 text-sm mt-1">Manage and respond to your business leads</p>
        </div>
        <button 
            onClick={exportToCSV}
            className="bg-gold text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-gold/20"
        >
          <Download size={18}/> Export Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0d0d1a] p-8 rounded-[2rem] border border-white/5 shadow-xl">
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-2">Total Inquiries</p>
          <p className="text-4xl font-black text-white">{leads.length}</p>
        </div>
        <div className="bg-[#0d0d1a] p-8 rounded-[2rem] border border-white/5 shadow-xl">
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-2">Pending Action</p>
          <p className="text-4xl font-black text-blue-400">{pendingCount}</p>
        </div>
        <div className="bg-[#0d0d1a] p-8 rounded-[2rem] border border-white/5 shadow-xl">
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-2">Response Rate</p>
          <p className="text-4xl font-black text-green-400">
            {leads.length > 0 ? Math.round(((leads.length - pendingCount) / leads.length) * 100) : 0}%
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18}/>
        <input 
            type="text"
            placeholder="Search by name, email or service..."
            className="w-full bg-[#0d0d1a] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-gold outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Leads Table */}
      <div className="bg-[#0d0d1a] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
            <thead className="bg-white/5 text-gold text-[10px] uppercase font-black tracking-widest">
                <tr>
                <th className="p-6">Client Info</th>
                <th className="p-6">Service</th>
                <th className="p-6">Received</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-center">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-6">
                    <p className="font-bold text-white text-lg">{lead.name}</p>
                    <div className="flex gap-4 mt-1 opacity-60">
                        <span className="text-[11px] flex items-center gap-1 font-medium"><Mail size={12}/> {lead.email}</span>
                        <span className="text-[11px] flex items-center gap-1 font-medium text-green-400"><Phone size={12}/> {lead.whatsapp}</span>
                    </div>
                    </td>
                    <td className="p-6">
                        <span className="bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-500/10">
                            {lead.service}
                        </span>
                    </td>
                    <td className="p-6 text-xs font-bold text-gray-500">
                        {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-6">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${lead.status === 'responded' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                        {lead.status === 'responded' ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
                        {lead.status}
                    </span>
                    </td>
                    <td className="p-6">
                        <div className="flex justify-center gap-3">
                            <button onClick={() => setSelectedLead(lead)} className="p-3 bg-white/5 text-gold rounded-xl hover:bg-gold hover:text-black transition-all shadow-lg"><Eye size={18}/></button>
                            <button onClick={() => deleteLead(lead.id)} className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"><Trash2 size={18}/></button>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        {filteredLeads.length === 0 && <p className="p-20 text-center text-gray-500 italic">No inquiries found.</p>}
      </div>

      {/* VIEW MESSAGE MODAL */}
      {selectedLead && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
              <div className="bg-[#0d0d1a] w-full max-w-xl rounded-[3rem] p-10 relative border border-white/10 shadow-2xl">
                <button onClick={() => setSelectedLead(null)} className="absolute top-8 right-8 text-gray-500 hover:text-white"><X size={30}/></button>
                
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center text-3xl font-black text-gold">
                        {selectedLead.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{selectedLead.name}</h2>
                        <p className="text-blue-400 font-bold text-xs tracking-widest uppercase">{selectedLead.service}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                        <p className="text-xs text-gray-500 font-bold uppercase mb-2 tracking-widest">Message:</p>
                        <p className="text-gray-300 leading-relaxed italic">"{selectedLead.message}"</p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Client Contact</p>
                            <p className="text-sm font-bold text-white">{selectedLead.whatsapp}</p>
                        </div>
                        {selectedLead.status !== 'responded' && (
                            <button 
                                onClick={() => { markAsResponded(selectedLead.id); setSelectedLead(null); }}
                                className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-green-500 transition-all"
                            >
                                Mark as Contacted
                            </button>
                        )}
                    </div>
                </div>
              </div>
          </div>
      )}
    </div>
  );
}