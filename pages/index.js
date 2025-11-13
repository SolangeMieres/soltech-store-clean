// pages/index.js
"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ShippingCalculator from "@/components/ShippingCalculator";

const texts = {
  es: {
    heroTitle: "Tecnología con estilo",
    heroSubtitle1:
      "Equipos, accesorios y soluciones tech diseñadas para simplificar tu vida digital.",
    heroSubtitle2: "Innovación, diseño y potencia — todo en un solo lugar.",
    cta: "Ver productos",

    // 🔥 Amazon filters
    filters: "Filtros",
    search: "Buscar producto...",
    categories: "Categorías",
    priceRange: "Rango de precios",
    min: "Mínimo",
    max: "Máximo",
    orderBy: "Ordenar por",
    none: "Sin orden",
    asc: "Precio: menor a mayor",
    desc: "Precio: mayor a menor",
    clear: "Limpiar filtros",
  },
};

// 🟦 Añadimos categoría a tus productos para que puedan filtrarse
const productos = [
  { id: 1, title: "Headset Gamer Aimzone negro…", description: "…", price: 25000, category: "Audio", image: "/images/auriculares.jpg" },
  { id: 2, title: "Notebook Celeron 14.1 Philco", description: "…", price: 300000, category: "Computación", image: "/images/notebook.jpg" },
  { id: 3, title: "Taladro Percutor Daewoo 750w", description: "…", price: 70000, category: "Herramientas", image: "/images/taladro.jpg" },
  { id: 4, title: "Smart TV Led 32 Philips", description: "…", price: 300000, category: "TV", image: "/images/ledphilips.jpg" },
  { id: 5, title: "Freidora Peabody 5.2L", description: "…", price: 85000, category: "Cocina", image: "/images/freidorapeabody.jpg" },
  // … 👇👇👇 el resto de tus productos IGUAL, solo agregando "category"
  // recomendación: categoría simple (Audio / Herramientas / Hogar / Niños / Celulares / etc)
  // …
];

// --------------------------------------------

export default function Home() {
  const [lang, setLang] = useState("es");
  const t = texts[lang];

  // 🟧 ESTADOS DE FILTRO
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [sort, setSort] = useState("none");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 🟦 Categorías automáticas en base a tus productos
  const categories = ["Todas", ...new Set(productos.map((p) => p.category))];

  // 🧠 FILTRADO TOTAL TIPO AMAZON
  const productosFiltrados = useMemo(() => {
    let result = [...productos];

    // 🔍 búsqueda
    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🏷 categoría
    if (selectedCategory !== "Todas") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 💰 precios
    if (minPrice !== "") result = result.filter((p) => p.price >= Number(minPrice));
    if (maxPrice !== "") result = result.filter((p) => p.price <= Number(maxPrice));

    // ↕ ordenamiento
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [search, selectedCategory, sort, minPrice, maxPrice]);

  // 🔄 reset
  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("Todas");
    setSort("none");
    setMinPrice("");
    setMaxPrice("");
  };

  // --------------------------------------------

  return (
    <div>
      <Navbar lang={lang} onChangeLang={setLang} />

      <main className="min-h-screen px-6 md:px-12 pt-12">

        {/* TITULO */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand text-center">
          {t.heroTitle}
        </h1>

        <p className="text-light/80 text-center max-w-2xl mx-auto">
          {t.heroSubtitle1}<br />{t.heroSubtitle2}
        </p>

        <ShippingCalculator lang={lang} />

        {/* LAYOUT AMAZON: SIDEBAR + PRODUCTOS */}
        <div className="flex mt-12 gap-10">

          {/* 🟪 SIDEBAR AMAZON */}
          <aside className="w-64 bg-dark/40 border border-cyan-700/20 rounded-xl p-5 h-fit sticky top-20">
            <h3 className="text-cyan-400 font-semibold text-lg mb-4">{t.filters}</h3>

            {/* 🔍 BUSQUEDA */}
            <input
              type="text"
              placeholder={t.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-dark/60 border border-cyan-700/30 text-white px-3 py-2 rounded-lg mb-4"
            />

            {/* CATEGORIAS */}
            <label className="text-light text-sm">{t.categories}</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-dark/60 border border-cyan-700/30 text-white px-3 py-2 rounded-lg mb-4"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            {/* RANGO DE PRECIOS */}
            <label className="text-light text-sm">{t.priceRange}</label>
            <div className="flex gap-2 mb-4">
              <input
                type="number"
                placeholder={t.min}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 bg-dark/60 border border-cyan-700/30 text-white px-3 py-2 rounded-lg"
              />
              <input
                type="number"
                placeholder={t.max}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 bg-dark/60 border border-cyan-700/30 text-white px-3 py-2 rounded-lg"
              />
            </div>

            {/* ORDEN */}
            <label className="text-light text-sm">{t.orderBy}</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full bg-dark/60 border border-cyan-700/30 text-white px-3 py-2 rounded-lg mb-4"
            >
              <option value="none">{t.none}</option>
              <option value="price-asc">{t.asc}</option>
              <option value="price-desc">{t.desc}</option>
            </select>

            {/* LIMPIAR */}
            <button
              onClick={resetFilters}
              className="w-full mt-2 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg"
            >
              {t.clear}
            </button>
          </aside>

          {/* 🟦 PRODUCTOS */}
          <section id="productos" className="flex flex-wrap justify-center gap-8 flex-1">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  price={p.price}
                  image={p.image}
                  description={p.description}
                  lang={lang}
                />
              ))
            ) : (
              <p className="text-gray-400 text-lg">No se encontraron productos</p>
            )}
          </section>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
