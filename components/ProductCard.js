"use client";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ id, title, description, price, image, lang }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id,
      title,
      description,
      price,
      image,
    });
  };

  return (
    <div className="bg-dark/60 border border-cyan-700/30 rounded-2xl p-4 w-72 text-center shadow-lg">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold text-cyan-400">{title}</h3>
      <p className="text-light/60 text-sm">{description}</p>
      <p className="mt-3 text-white font-bold">${price.toLocaleString()}</p>

      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={handleAdd}
          className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-lg transition"
        >
          🛒 Agregar al carrito
        </button>

        <a
          href="https://wa.me/5491132905944?text=Hola%20SOLtech!%20Quiero%20consultar%20por%20este%20producto."
          target="_blank"
          rel="noreferrer"
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
        >
          Comprar ahora
        </a>
      </div>
    </div>
  );
}
