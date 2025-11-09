"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ title, description, price, image }) {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || "Producto SOLtech",
          unit_price: price || 0,
          quantity: 1,
          picture_url: image || "https://soltech-store-argentina.vercel.app/logo.png",
        }),
      });

      const data = await response.json();

      if (data?.init_point) {
        window.location.href = data.init_point; // redirige al checkout real
      } else {
        alert("No se pudo iniciar el pago.");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al generar el pago 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--color-dark)]/40 backdrop-blur-sm rounded-2xl shadow-lg border border-cyan-700/30 p-4 text-center transition hover:shadow-cyan-400/30 hover:scale-[1.02]">
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-[var(--color-dark)]/70 flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={title}
            width={300}
            height={200}
            className="object-contain"
          />
        ) : (
          <div className="text-gray-400 text-sm">Sin imagen</div>
        )}
      </div>

      <h3 className="text-cyan-400 font-semibold text-lg mb-1">{title}</h3>
      <p className="text-gray-400 text-sm mb-3">{description}</p>
      <p className="text-[var(--color-light)] font-semibold text-base mb-4">
        {price ? `$${price.toLocaleString("es-AR")}` : "Precio no disponible"}
      </p>

      <button
        onClick={handleBuy}
        disabled={loading}
        className={`px-5 py-2 rounded-lg text-white font-medium transition ${
          loading
            ? "bg-[var(--color-gray)]-500 cursor-not-allowed"
            : "bg-cyan-500 hover:bg-cyan-400"
        }`}
      >
        {loading ? "Redirigiendo..." : "Comprar"}
      </button>
    </div>
  );
}
