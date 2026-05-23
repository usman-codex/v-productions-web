"use client";
import { Users, MessageSquare, TrendingUp, ArrowUpRight } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Dashboard <span className="text-gold">Overview</span></h1>
        <p className="text-muted-foreground">Welcome back, Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Visits", value: "12.5k", icon: Users, trend: "+12%", color: "text-blue-400" },
          { label: "New Leads", value: "48", icon: MessageSquare, trend: "+5%", color: "text-gold" },
          { label: "Active Interns", value: "15", icon: TrendingUp, trend: "+2", color: "text-green-400" },
          { label: "Total Projects", value: "32", icon: ArrowUpRight, trend: "+4", color: "text-purple-400" },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl border-white/5 hover:border-gold/20 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-lg">
                {stat.trend}
              </span>
            </div>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-3xl border-white/5 h-64 flex items-center justify-center text-muted-foreground">
          Chart / Analytics Placeholder
        </div>
        <div className="glass p-8 rounded-3xl border-white/5 h-64 flex items-center justify-center text-muted-foreground">
          Recent Activity Feed
        </div>
      </div>
    </div>
  );
}