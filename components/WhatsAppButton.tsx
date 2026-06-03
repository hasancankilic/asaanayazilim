"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = "905556667788"; // Replace with actual number
  const message = encodeURIComponent(
    "Merhaba, yazılım hizmetleriniz hakkında bilgi almak istiyorum."
  );
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl shadow-green-500/30 transition-all duration-300 hover:scale-110 group"
      aria-label="WhatsApp ile iletişime geçin"
    >
      <MessageCircle className="w-7 h-7 fill-white" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        WhatsApp ile yazın
      </span>
    </a>
  );
}
