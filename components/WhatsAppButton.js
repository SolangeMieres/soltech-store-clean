import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent(
      "¡Hola! 👋 Quisiera hacer una consulta sobre los productos de SOLtech Store."
    );
    window.open(`https://wa.me/5491132905944?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-400 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-300"
      aria-label="Chatear por WhatsApp"
    >
      <FaWhatsapp className="text-3xl" />
    </button>
  );
}
