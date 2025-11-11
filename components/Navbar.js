"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const labels = {
  es: {
    store: "SOLtech Store",
    home: "Inicio",
    products: "Productos",
    contact: "Contacto",
    cart: "Carrito",
    es: "ES",
    en: "EN",
  },
  en: {
    store: "SOLtech Store",
    home: "Home",
    products: "Products",
    contact: "Contact",
    cart: "Cart",
    es: "ES",
    en: "EN",
  },
};

export default function Navbar({ lang = "es", onChangeLang }) {
  const t = labels[lang];
  const { cart } = useCart(); // 🛒 accede al carrito global
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-dark shadow-soft sticky top-0 z-50">
      {/* 🔹 Logo + título */}
      <div className="flex items-center gap-3">
        <img
          src="/images/soltech-logo.png"
          alt="SOLtech Logo"
          className="w-10 h-10 rounded-full border border-brand shadow-soft"
        />
        <h1 className="text-brand text-xl font-bold tracking-tight">
          {t.store}
        </h1>
      </div>

      {/* 🔹 Links de navegación */}
      <div className="flex items-center gap-6 text-light/80 text-sm">
        <a href="#" className="hover:text-brand transition">
          {t.home}
        </a>
        <a href="#productos" className="hover:text-brand transition">
          {t.products}
        </a>
        <a href="#contacto" className="hover:text-brand transition">
          {t.contact}
        </a>

        {/* 🛒 Link al carrito */}
        <Link href="/carrito" className="relative hover:text-brand transition">
          <span>🛒 {t.cart}</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-cyan-500 text-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        {/* 🌐 Toggle idioma */}
        <div className="flex items-center gap-1 border border-light/20 rounded-full px-2 py-1 text-xs">
          <button
            onClick={() => onChangeLang && onChangeLang("es")}
            className={`px-2 py-0.5 rounded-full ${
              lang === "es" ? "bg-brand text-dark" : "text-light/70"
            }`}
          >
            {t.es}
          </button>
          <button
            onClick={() => onChangeLang && onChangeLang("en")}
            className={`px-2 py-0.5 rounded-full ${
              lang === "en" ? "bg-brand text-dark" : "text-light/70"
            }`}
          >
            {t.en}
          </button>
        </div>
      </div>
    </nav>
  );
}
