import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function ShippingCalculator() {
  const handleClick = () => {
    const message = encodeURIComponent(
      "¡Hola! 👋 Quisiera consultar por el envío de un producto de la tienda SOLtech Store."
    );
    window.open(`https://wa.me/5491132905944?text=${message}`, "_blank");
  };

  return (
    <div className="bg-[var(--color-gray)]-900 text-white p-6 rounded-2xl shadow-lg text-center border border-cyan-500/20">
      <h2 className="text-xl font-semibold mb-3 text-cyan-400">
        ¿Consultas por envíos? 🚚
      </h2>
      <p className="text-gray-300 mb-4">
        Hacé clic abajo para hablar directamente con nosotros por WhatsApp y
        conocer el costo de tu envío.
      </p>
      <button
        onClick={handleClick}
        className="flex items-center justify-center gap-2 mx-auto bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold py-2 px-5 rounded-lg transition-all duration-200 shadow-md hover:shadow-cyan-500/40"
      >
        <FaWhatsapp className="text-xl" />
        Consultar por envío
      </button>
    </div>
  );
}
