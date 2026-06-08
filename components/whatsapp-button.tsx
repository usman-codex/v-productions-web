"use client";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = "923001234567"; 

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-all active:scale-95 group"
    >
      <MessageCircle size={32} />
      <span className="absolute right-20 bg-black/80 text-white px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with Experts
      </span>
    </a>
  );
}