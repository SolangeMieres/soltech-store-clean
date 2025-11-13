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
  { id: 1, title: "Headset Gamer Aimzone negro microfono desmontable AZ709",
    description: "Filtros\nMicrófono\nSí…",
    price: 25000, image: "/images/auriculares.jpg", category: "Audio" },

  { id: 2, title: "Notebook Celeron 14.1\" 4GB 128 GB SSD Philco N14P4020",
    description: `La Philco N4020…`,
    price: 300000, image: "/images/notebook.jpg", category: "Computación" },

  { id: 3, title: "Taladro Percutor 750w Daewoo DAID750BX",
    description: `Mango lateral…`,
    price: 70000, image: "/images/taladro.jpg", category: "Herramientas" },

  { id: 4, title: "Smart TV Led 32 Philips",
    description: `Controlá tu TV…`,
    price: 300000, image: "/images/ledphilips.jpg", category: "TV" },

  { id: 5, title: "Freidora de Aire Peabody PE-AFW520N 5,2Lts",
    description: `Cociná de forma saludable…`,
    price: 85000, image: "/images/freidorapeabody.jpg", category: "Cocina" },

  { id: 6, title: "Mopa Plana Trapeador Lampazo",
    description: `Mopa con balde…`,
    price: 40000, image: "/images/mops.jpg", category: "Hogar" },

  { id: 7, title: "Termo Wanderlust Verde 1300ml",
    description: `Marca: Wanderlust…`,
    price: 45000, image: "/images/termo.jpg", category: "Hogar" },

  { id: 8, title: "Desmalezadora Motoguadaña Naftera 52cc",
    description: `Desmalezadora KLD…`,
    price: 130000, image: "/images/desmalezadora.jpg", category: "Herramientas" },

  { id: 9, title: "Aire Acondicionado Sansei Split",
    description: `Aire acondicionado…`,
    price: 750000, image: "/images/airesensei.jpg", category: "Climatización" },

  { id: 10, title: "Celular Tecno Spark 30C 128GB Orbit Black",
    description: `Diseño elegante…`,
    price: 190000, image: "/images/celutekno.jpg", category: "Celulares" },

  { id: 11, title: "Playstation 5 PS5 Digital Bundle",
    description: `Incluye PS5 Digital…`,
    price: 1600000, image: "/images/play5.jpg", category: "Consolas" },

  { id: 12, title: "Lavarropas Semiautomático 6 kg Wanke",
    description: `Lavarropas semiautomático…`,
    price: 190000, image: "/images/lavafranke.jpg", category: "Lavarropas" },

  { id: 13, title: "Secadora Por Calor Kanjihome 4kg",
    description: `Secadora por calor…`,
    price: 300000, image: "/images/secakanji.jpg", category: "Secarropas" },

  { id: 14, title: "Lavarropas Philco 5.5 Kg",
    description: `Lavarropas automático…`,
    price: 330000, image: "/images/lavaphilco.jpg", category: "Lavarropas" },

  { id: 15, title: "Heladera Bajo Mesada Hisense 126L",
    description: `Heladera bajo mesada…`,
    price: 360000, image: "/images/helahisense.jpg", category: "Heladeras" },

  { id: 16, title: "Heladera Cíclica Admiral 208 Lts",
    description: `Heladera compacta…`,
    price: 450000, image: "/images/helaadmiral.jpg", category: "Heladeras" },

  { id: 17, title: "Celular Samsung Galaxy A06 128GB",
    description: `Diseño fino…`,
    price: 260000, image: "/images/samsunga06.jpg", category: "Celulares" },

  { id: 18, title: "iPhone 12 Mini 64GB reacondicionado",
    description: `iPhone 12 Mini desbloqueado…`,
    price: 470000, image: "/images/iphone12.jpg", category: "Celulares" },

  { id: 19, title: "Cafetera de Filtro Peabody",
    description: `Cafetera de filtro…`,
    price: 60000, image: "/images/cafepea.jpg", category: "Cocina" },

  { id: 20, title: "Ventilador de Techo Telefunken",
    description: `Ventilador de techo…`,
    price: 150000, image: "/images/ventitecho.jpg", category: "Climatización" },

  { id: 21, title: "Celular Samsung Galaxy A16 4G",
    description: `Celular con pantalla…`,
    price: 400000, image: "/images/samsunga16.jpg", category: "Celulares" },

  { id: 22, title: "Celular Motorola G15 4GB 128GB",
    description: `Rendimiento fluido…`,
    price: 340000, image: "/images/motorolag15.jpg", category: "Celulares" },

  { id: 23, title: "Celular ZTE Blade A35 64GB",
    description: `Batería 5000 mAh…`,
    price: 150000, image: "/images/ztea35.jpg", category: "Celulares" },

  { id: 24, title: "Smart TV Samsung 50” UHD 4K",
    description: `Imagen vibrante…`,
    price: 690000, image: "/images/samsungDU7000.jpg", category: "TV" },

  { id: 25, title: "Bicicleta MTB Rydetech 300 R29",
    description: `Bicicleta robusta…`,
    price: 300000, image: "/images/bici.jpg", category: "Bicicletas" },

  { id: 26, title: "Bicicleta Infantil Nathor R16",
    description: `Bici rodado 16…`,
    price: 200000, image: "/images/bici1.jpg", category: "Bicicletas" },

  { id: 27, title: "Auriculares Admiral AD-F9 Negro",
    description: `Auriculares Bluetooth…`,
    price: 15000, image: "/images/auriadm.jpg", category: "Audio" },

  { id: 28, title: "Auricular Aiwa TWA-80B Blanco",
    description: `Auriculares in-ear…`,
    price: 20000, image: "/images/auriaiwa.jpg", category: "Audio" },

  { id: 29, title: "Aspiradora Robot Sansei",
    description: `Aspiradora robot 2 en 1…`,
    price: 210000, image: "/images/aspisansei.jpg", category: "Hogar" },

  { id: 30, title: "Pizarra Mágica 12\"",
    description: `Pizarra LCD multicolor…`,
    price: 9000, image: "/images/pizzarra.jpg", category: "Juguetes" },

  { id: 31, title: "Cuatriciclo Stark Naranja 6V",
    description: `Cuatri a batería…`,
    price: 120000, image: "/images/cuatri.jpg", category: "Juguetes" },

  { id: 32, title: "Cuatriciclo Stark Blanco 6V",
    description: `Cuatri a batería…`,
    price: 120000, image: "/images/cuatrib.jpg", category: "Juguetes" },

  { id: 33, title: "Mesa Didáctica Unicornio",
    description: `Mesa didáctica unicornio…`,
    price: 40000, image: "/images/mesauni.jpg", category: "Juguetes" },

  { id: 34, title: "Mesa Didáctica Dinosaurio",
    description: `Mesa didáctica dino…`,
    price: 40000, image: "/images/mesadino.jpg", category: "Juguetes" },

  { id: 35, title: "Lavasecarropas Philco 12/8KG",
    description: `Lavasecarropas 2 en 1…`,
    price: 1000000, image: "/images/lavaseca.jpg", category: "Lavarropas" },

  { id: 36, title: "Nebulizador Ultrasónico",
    description: `Nebulizador portátil…`,
    price: 25000, image: "/images/nebu.jpg", category: "Salud" },

  { id: 37, title: "Vaporera Eléctrica 2 niveles",
    description: `Vaporera de 2 niveles…`,
    price: 43000, image: "/images/vaporera.jpg", category: "Cocina" },

  { id: 38, title: "Reloj Retro",
    description: `Reloj estilo retro…`,
    price: 20000, image: "/images/reloj.jpg", category: "Accesorios" },

  { id: 39, title: "Máquina Cortapelo Vintage T9",
    description: `Cortadora inalámbrica…`,
    price: 25000, image: "/images/cortacabello.jpg", category: "Belleza" },

  { id: 40, title: "Caja Impermeable Baño Celular",
    description: `Soporte resistente al agua…`,
    price: 22000, image: "/images/cajaducha.jpg", category: "Hogar" },
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
