"use client";
import Image from "next/image";
import { useState } from "react";
import { Info } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductCard(props) {
  // Asegura compatibilidad con tus campos del JSON
  const id = props.id;
  const title = props.title || props.nombre || "Producto sin nombre";
  const description = props.description || props.descripcion || "Sin descripción";
  const price = props.price || props.precio || null;
  const image = props.image || props.imagen || null;

  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { addToCart } = useCart();

  // 🧮 Formateador de precios
  const formatPrice = (value) => {
    try {
      return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 0,
      }).format(value);
    } catch {
      return `$${value}`;
    }
  };

  // 🛒 Handler para “Comprar ahora”
  const handleBuy = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, quantity: 1, price }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error iniciando el pago");
      if (data.init_point) window.location.href = data.init_point;
      else alert("No se pudo iniciar el pago.");
    } catch (error) {
      console.error(error);
      alert("No se pudo iniciar el pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative bg-gradient-to-b from-[#0e1b25] to-[#0a1218] rounded-2xl shadow-md shadow-cyan-800/30 border border-cyan-700/30 p-5 text-center hover:shadow-cyan-400/40 hover:scale-[1.02] transition-all duration-200 ease-in-out">
        {/* 🖼️ Imagen del producto */}
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-dark/70 flex items-center justify-center">
          {image ? (
            <Image
              src={image}
              alt={title}
              width={300}
              height={200}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 rounded-lg"
            />
          ) : (
            <div className="text-gray-400 text-sm italic">Sin imagen</div>
          )}

          {/* ℹ️ Botón de información */}
          <button
            onClick={() => setShowInfo(true)}
            className="absolute top-2 right-2 bg-cyan-500/80 hover:bg-cyan-400 text-white p-2 rounded-full transition"
            title="Ver descripción"
          >
            <Info size={18} />
          </button>
        </div>

        {/* 🏷️ Info del producto */}
        <h3 className="text-cyan-400 font-semibold text-lg mb-1">{title}</h3>
        <p className="text-gray-400 text-sm mb-3 h-12 overflow-hidden">
          {description.length > 70 ? description.slice(0, 70) + "..." : description}
        </p>

        <p className="text-light font-semibold text-xl mb-4 text-cyan-300">
          {price ? formatPrice(price) : "Precio no disponible"}
        </p>

        {/* 🛍️ Botones de acción */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => addToCart({ id, title, price, image })}
            className="bg-cyan-500 hover:bg-cyan-400 text-white py-2 rounded-lg transition shadow-md shadow-cyan-500/30"
          >
            🛒 Agregar al carrito
          </button>

          <button
            onClick={handleBuy}
            disabled={loading}
            className={`py-2 rounded-lg text-white font-medium transition-all ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-cyan-700 hover:bg-cyan-600 shadow-md shadow-cyan-700/30"
            }`}
          >
            {loading ? "Redirigiendo..." : "Comprar ahora"}
          </button>
        </div>
      </div>

      {/* 🪟 Modal de información */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0f1e28] p-6 rounded-2xl shadow-lg max-w-md mx-4 text-center border border-cyan-700/40">
            <h2 className="text-cyan-400 text-xl font-semibold mb-3">{title}</h2>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              {description}
            </p>
            <button
              onClick={() => setShowInfo(false)}
              className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-lg transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
