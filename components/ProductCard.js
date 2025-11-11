"use client";
import Image from "next/image";
import { useState } from "react";
import { Info } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ id, title, description, price, image }) {
  const { addToCart } = useCart();
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    addToCart({ id, title, description, price, image });
  };

  const handleBuy = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, quantity: 1, price }),
      });
      const data = await response.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("No se pudo iniciar el pago.");
      }
    } catch (err) {
      console.error(err);
      alert("Error al procesar el pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-dark/40 backdrop-blur-sm rounded-2xl shadow-lg border border-cyan-700/30 p-4 text-center transition hover:shadow-cyan-400/30 hover:scale-[1.02] w-72">
      {/* Imagen */}
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-dark/70 flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={title}
            width={300}
            height={200}
            className="object-contain w-full h-full"
          />
        ) : (
          <div className="text-gray-400 text-sm">Sin imagen</div>
        )}
        <button
          onClick={() => setShowInfo(true)}
          className="absolute top-2 right-2 bg-cyan-600/80 hover:bg-cyan-500 text-white p-2 rounded-full shadow-md transition"
          title="Ver detalles"
        >
          <Info size={18} />
        </button>
      </div>

      {/* Info principal */}
      <h3 className="text-cyan-400 font-semibold text-lg mb-1">{title}</h3>
      <p className="text-light font-semibold text-base mb-4">
        {price ? `$${price.toLocaleString("es-AR")}` : "Precio no disponible"}
      </p>

      {/* Botones */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleAdd}
          className="px-5 py-2 rounded-lg text-white font-medium bg-cyan-500 hover:bg-cyan-400 transition"
        >
          🛒 Agregar al carrito
        </button>

        <button
          onClick={handleBuy}
          disabled={loading}
          className={`px-5 py-2 rounded-lg text-white font-medium transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-400"
          }`}
        >
          {loading ? "Procesando..." : "⚡ Comprar ahora"}
        </button>
      </div>

      {/* Modal descripción */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-[#0d1117] p-6 rounded-2xl w-11/12 max-w-md shadow-xl border border-cyan-700/30 relative">
            <h2 className="text-xl text-cyan-400 font-semibold mb-3">{title}</h2>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              {description}
            </p>

            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-cyan-300 text-lg"
              title="Cerrar"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
