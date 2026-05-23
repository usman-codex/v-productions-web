"use client";
import { useState } from "react";
import { Search, Download, Trash2, Eye, CheckCircle2, Clock } from "lucide-react";

// Mock Data (Ye baad mein database se connect hoga)
const initialLeads = [
  { id: 1, name: "Ali Raza", email: "ali@example.com", phone: "03001234567", service: "Web Dev", status: "Pending", date: "2024-05-21" },
  { id: 2, name: "Sara Khan", email: "sara@test.com", phone: "03219876543", service: "AI Training", status: "Responded", date: "2024-05-20" },
];

export default function LeadsInbox() {
  const [leads, setLeads] = useState(initialLeads);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inquiry <span className="text-gold">Inbox</span></h1>
        <button className="bg-gold text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gold-light transition-all">
          <Download size={18}/> Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl border-gold/20">
          <p className="text-muted-foreground text-sm">Total Inquiries</p>
          <p className="text-3xl font-bold">{leads.length}</p>
        </div>
        <div className="glass p-6 rounded-2xl border-blue-500/20">
          <p className="text-muted-foreground text-sm">Pending Action</p>
          <p className="text-3xl font-bold text-blue-400">1</p>
        </div>
        <div className="glass p-6 rounded-2xl border-green-500/20">
          <p className="text-muted-foreground text-sm">Conversion Rate</p>
          <p className="text-3xl font-bold text-green-400">45%</p>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-3xl overflow-hidden border-white/5">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gold text-sm uppercase">
            <tr>
              <th className="p-4">Client Name</th>
              <th className="p-4">Service</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <p className="font-bold">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.email}</p>
                </td>
                <td className="p-4"><span className="bg-blue-electric/10 text-blue-400 px-3 py-1 rounded-full text-xs">{lead.service}</span></td>
                <td className="p-4 text-sm text-muted-foreground">{lead.date}</td>
                <td className="p-4">
                  <span className={`flex items-center gap-2 text-xs ${lead.status === 'Pending' ? 'text-orange-400' : 'text-green-400'}`}>
                    {lead.status === 'Pending' ? <Clock size={14}/> : <CheckCircle2 size={14}/>}
                    {lead.status}
                  </span>
                </td>
                <td className="p-4 flex justify-center gap-3">
                  <button className="text-gold hover:scale-110 transition-transform"><Eye size={18}/></button>
                  <button className="text-red-400 hover:scale-110 transition-transform"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}