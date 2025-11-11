"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function Carrito() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🧠 Función para enviar el carrito a MercadoPago
  const handleCheckout = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point; // 🔹 Redirige al checkout oficial de MP
      } else {
        alert("No se pudo generar el link de pago.");
      }
    } catch (error) {
      console.error("❌ Error al procesar el pago:", error);
      alert("Ocurrió un error al procesar el pago.");
    } finally {
      setLoading(false);
    }
  };

  // 🛒 Si el carrito está vacío
  if (cart.length === 0)
    return (
      <div className="text-center mt-20">
        <h2 className="text-cyan-400 text-2xl mb-4">🛒 Tu carrito está vacío</h2>
        <Link href="/">
          <p className="text-gray-400 hover:text-cyan-300 transition">
            Volver a la tienda
          </p>
        </Link>
      </div>
    );

  // 💳 Carrito con productos
  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-gradient-to-b from-[#0e1b25]/80 to-[#0a1218]/80 rounded-xl shadow-md border border-cyan-700/30 backdrop-blur-md">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
        Carrito de compras
      </h1>

      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-dark/40 p-4 rounded-lg border border-cyan-700/20"
          >
            <div className="text-left">
              <p className="text-cyan-300 font-semibold">{item.title}</p>
              <p className="text-gray-400 text-sm">Cantidad: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-300 font-semibold">
                ${item.price.toLocaleString("es-AR")}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 hover:text-red-300 text-sm mt-1"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-cyan-700/30 pt-4 text-right">
        <p className="text-xl font-semibold text-cyan-300">
          Total: ${total.toLocaleString("es-AR")}
        </p>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={clearCart}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition"
          >
            Vaciar carrito
          </button>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`py-2 px-4 rounded-lg text-white font-medium transition-all ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-400 shadow-md shadow-cyan-500/30"
            }`}
          >
            {loading ? "Generando link..." : "Finalizar compra 💳"}
          </button>
        </div>
      </div>
    </div>
  );
}
