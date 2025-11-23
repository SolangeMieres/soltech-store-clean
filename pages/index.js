"use client";
import { useState, useMemo, useEffect } from "react";
import Head from 'next/head'; 
import { Home as HomeIcon, ShoppingCart, User, Plus, Trash2, Smartphone, Download, Share, Search, Filter, X } from 'lucide-react';

// Importamos tus componentes (Si alguno falla, avísame)
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ShippingCalculator from "@/components/ShippingCalculator";

const texts = {
  es: {
    heroTitle: "Tecnología con estilo",
    heroSubtitle1: "Equipos, accesorios y soluciones tech diseñadas para simplificar tu vida digital.",
    heroSubtitle2: "Innovación, diseño y potencia — todo en un solo lugar.",
    cta: "Ver productos",
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

// 🟦 LISTA DE PRODUCTOS (Asegúrate que las imágenes estén en public/images/)
const productos = [
  { id: 1, title: "Headset Gamer Aimzone negro microfono desmontable", description: "Audio Premium: Drivers de 50 mm...", price: 30000, image: "/images/auriculares.jpg", category: "Audio" },
  { id: 2, title: "Notebook Celeron 14.1\" 4GB 128 GB SSD Philco N14P4020", description: "Rendimiento Rápido...", price: 370000, image: "/images/notebook.jpg", category: "Computación" },
  { id: 3, title: "Taladro Percutor 750w Daewoo DAID750BX", description: "Versátil...", price: 78000, image: "/images/taladro.jpg", category: "Herramientas" },
  { id: 4, title: "Smart TV Led 32 Philips", description: "Control por Voz...", price: 300000, image: "/images/ledphilips.jpg", category: "TV" },
  { id: 5, title: "Freidora de Aire Peabody PE-AFW520N 5,2Lts", description: "Gran Capacidad...", price: 110000, image: "/images/freidorapeabody.jpg", category: "Cocina" },
  { id: 6, title: "Mopa Plana Trapeador Lampazo", description: "Limpieza Sencilla...", price: 40000, image: "/images/mops.jpg", category: "Hogar" },
  { id: 7, title: "Termo Wanderlust Verde 1300ml", description: "Capacidad...", price: 47000, image: "/images/termo.jpg", category: "Hogar" },
  { id: 8, title: "Desmalezadora Motoguadaña Naftera 52cc", description: "Motor...", price: 150000, image: "/images/desmalezadora.jpg", category: "Herramientas" },
  { id: 9, title: "Aire Acondicionado Sansei Split", description: "Climatización Total...", price: 700000, image: "/images/airesensei.jpg", category: "Climatización" },
  { id: 10, title: "Celular Tecno Spark 30C 128GB Orbit Black", description: "Desempeño...", price: 220000, image: "/images/celutekno.jpg", category: "Celulares" },
  { id: 11, title: "Playstation 5 PS5 Digital Bundle", description: "Modelo...", price: 1550000, image: "/images/play5.jpg", category: "Consolas" },
  { id: 12, title: "Lavarropas Semiautomático 6 kg Wanke", description: "Capacidad...", price: 195000, image: "/images/lavafranke.jpg", category: "Lavarropas" },
  { id: 13, title: "Secadora Por Calor Kanjihome 4kg", description: "Capacidad...", price: 420000, image: "/images/secakanji.jpg", category: "Secarropas" },
  { id: 14, title: "Lavarropas Philco 5.5 Kg", description: "Capacidad...", price: 345000, image: "/images/lavaphilco.jpg", category: "Lavarropas" },
  { id: 15, title: "Heladera Bajo Mesada Hisense 126L", description: "Capacidad...", price: 420000, image: "/images/helahisense.jpg", category: "Heladeras" },
  { id: 16, title: "Heladera Cíclica Admiral 208 Lts", description: "Capacidad...", price: 450000, image: "/images/helaadmiral.jpg", category: "Heladeras" },
  { id: 17, title: "Celular Samsung Galaxy A06 128GB", description: "Rendimiento...", price: 265000, image: "/images/samsunga06.jpg", category: "Celulares" },
  { id: 18, title: "iPhone 12 Mini 64GB reacondicionado", description: "Estado...", price: 470000, image: "/images/iphone12.jpg", category: "Celulares" },
  { id: 19, title: "Cafetera de Filtro Peabody", description: "Capacidad...", price: 60000, image: "/images/cafepea.jpg", category: "Cocina" },
  { id: 20, title: "Ventilador de Techo Telefunken", description: "Aspas Retráctiles...", price: 150000, image: "/images/ventitecho.jpg", category: "Climatización" },
  { id: 21, title: "Celular Samsung Galaxy A16 4G", description: "Pantalla...", price: 450000, image: "/images/samsunga16.jpg", category: "Celulares" },
  { id: 22, title: "Celular Motorola G15 4GB 128GB", description: "Rendimiento...", price: 340000, image: "/images/motorolag15.jpg", category: "Celulares" },
  { id: 23, title: "Celular ZTE Blade A35 64GB", description: "Almacenamiento...", price: 130000, image: "/images/ztea35.jpg", category: "Celulares" },
  { id: 24, title: "Smart TV Samsung 50” UHD 4K", description: "Imagen...", price: 695000, image: "/images/samsungDU7000.jpg", category: "TV" },
  { id: 25, title: "Bicicleta MTB Rydetech 300 R29", description: "Cuadro...", price: 290000, image: "/images/bici.jpg", category: "Bicicletas" },
  { id: 26, title: "Bicicleta Infantil Nathor R16", description: "Edad...", price: 200000, image: "/images/bici1.jpg", category: "Bicicletas" },
  { id: 27, title: "Auriculares Admiral AD-F9 Negro", description: "Conexión...", price: 15000, image: "/images/auriadm.jpg", category: "Audio" },
  { id: 28, title: "Auricular Aiwa TWA-80B Blanco", description: "Conectividad...", price: 20000, image: "/images/auriaiwa.jpg", category: "Audio" },
  { id: 29, title: "Aspiradora Robot Sansei", description: "Doble Función...", price: 240000, image: "/images/aspisansei.jpg", category: "Hogar" },
  { id: 30, title: "Pizarra Mágica 12", description: "Pantalla...", price: 9500, image: "/images/pizzarra.jpg", category: "Juguetes" },
  { id: 31, title: "Cuatriciclo Stark Naranja 6V", description: "Edad...", price: 110000, image: "/images/cuatri.jpg", category: "Juguetes" },
  { id: 32, title: "Cuatriciclo Stark Blanco 6V", description: "Edad...", price: 110000, image: "/images/cuatrib.jpg", category: "Juguetes" },
  { id: 33, title: "Mesa Didáctica Unicornio", description: "Función...", price: 30000, image: "/images/mesauni.jpg", category: "Juguetes" },
  { id: 34, title: "Mesa Didáctica Dinosaurio", description: "Función...", price: 30000, image: "/images/mesadino.jpg", category: "Juguetes" },
  { id: 35, title: "Pestañas Magneticas", description: "Contenido...", price: 20000, image: "/images/pestañas.jpg", category: "Belleza" },
  { id: 36, title: "Nebulizador Ultrasónico", description: "Tecnología...", price: 27000, image: "/images/nebu.jpg", category: "Salud" },
  { id: 37, title: "Vaporera Eléctrica 2 niveles", description: "Capacidad...", price: 43000, image: "/images/vaporera.jpg", category: "Cocina" },
  { id: 38, title: "Reloj Retro", description: "Funciones...", price: 20000, image: "/images/reloj.jpg", category: "Accesorios" },
  { id: 39, title: "Máquina Cortapelo Vintage T9", description: "Funcionalidad...", price: 25000, image: "/images/cortacabello.jpg", category: "Belleza" },
  { id: 40, title: "Caja Impermeable Baño Celular", description: "Uso...", price: 22000, image: "/images/cajaducha.jpg", category: "Hogar" },
  { id: 41, title: "Lámpara De Medusas Led Rgb", description: "Diseño...", price: 25000, image: "/images/medusa.jpg", category: "Hogar" },
  { id: 42, title: "Mini Pistola Masajeadora", description: "Uso...", price: 25000, image: "/images/masaje.jpg", category: "Hogar" },
  { id: 43, title: "Trapeador Escurridor Ajustable", description: "Funcionalidad...", price: 35000, image: "/images/trapeaescurri.jpg", category: "Hogar" },
  { id: 44, title: "Organizador De Remeras", description: "Función...", price: 4000, image: "/images/organiza.jpg", category: "Hogar" },
  { id: 45, title: "Aire Acondicionado Inverter Admiral", description: "Tecnología...", price: 700000, image: "/images/aireadmiral.jpg", category: "Climatización" },
  { id: 46, title: "Ventilador Kanjihome 18", description: "Tipo...", price: 70000, image: "/images/ventitele.jpg", category: "Climatización" },
  { id: 47, title: "Ventilador de Pie Admiral", description: "Tipo...", price: 75000, image: "/images/ventiadmiral.jpg", category: "Climatización" },
  { id: 48, title: "Ventilador Ken Brown", description: "Funcionalidad...", price: 105000, image: "/images/ventiken.jpg", category: "Climatización" },
  { id: 49, title: "Extractor Saca Cera Oreja", description: "Diseño...", price: 12000, image: "/images/removedor.jpg", category: "Salud" },
  { id: 50, title: "Adaptador Hub Usb 3 Puertos", description: "Puertos...", price: 10000, image: "/images/adaptador.jpg", category: "Accesorios" },
  { id: 51, title: "Hub Usb 3.0 7 Puertos", description: "Puertos...", price: 25000, image: "/images/adaptador1.jpg", category: "Accesorios" },
  { id: 52, title: "Lupa Tarjeta De Credito", description: "Aumento...", price: 20000, image: "/images/leetarjeta.jpg", category: "Accesorios" },
];

export default function Home() {
  const [lang, setLang] = useState("es");
  const t = texts[lang];

  // 🟦 ESTADOS DE LA APP
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // 🟩 ESTADOS PWA
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('SW Listo'))
        .catch(err => console.log('SW Error', err));
    }
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    }
  };

  // 🟧 FILTROS (Tu lógica original)
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [sort, setSort] = useState("none");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = ["Todas", ...new Set(productos.map((p) => p.category))];

  const addToCart = (product) => {
    setCart([...cart, product]);
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
  };

  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));
  const calculateTotal = () => cart.reduce((total, item) => total + item.price, 0).toLocaleString();

  const productosFiltrados = useMemo(() => {
    let result = [...productos];
    if (search.trim() !== "") result = result.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    if (selectedCategory !== "Todas") result = result.filter((p) => p.category === selectedCategory);
    if (minPrice !== "") result = result.filter((p) => p.price >= Number(minPrice));
    if (maxPrice !== "") result = result.filter((p) => p.price <= Number(maxPrice));
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    return result;
  }, [search, selectedCategory, sort, minPrice, maxPrice]);

  const resetFilters = () => {
    setSearch(""); setSelectedCategory("Todas"); setSort("none"); setMinPrice(""); setMaxPrice("");
  };

  // --- VISTAS ---

  const renderHome = () => (
    <>
      <Navbar lang={lang} onChangeLang={setLang} />

      <main className="min-h-screen px-4 md:px-12 pt-8 pb-32 relative bg-gray-900 text-white">
        
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#2563eb" />
          <link rel="apple-touch-icon" href="/images/icon-192.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
        </Head>

        {/* Botón Instalar */}
        {deferredPrompt && (
          <div className="fixed top-24 right-4 z-50 animate-bounce">
            <button onClick={handleInstallClick} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white">
              <Download size={20} /> <span className="hidden md:inline">Instalar App</span>
            </button>
          </div>
        )}

        {/* Banner Hero */}
        <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand mb-4 text-cyan-400 drop-shadow-md">
            {t.heroTitle}
            </h1>
            <p className="text-gray-300 text-center max-w-2xl mx-auto text-sm md:text-base">
            {t.heroSubtitle1}<br className="hidden md:block" />{t.heroSubtitle2}
            </p>
        </div>

        <ShippingCalculator lang={lang} />

        {/* Filtros Móvil */}
        <button 
            className="md:hidden w-full mb-4 flex items-center justify-center gap-2 bg-gray-800 py-3 rounded-lg border border-gray-700 text-white"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
            <Filter size={18} /> {showMobileFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </button>

        <div className="flex flex-col md:flex-row mt-8 gap-10">
          
          {/* 🟪 SIDEBAR FILTROS (Recuperada) */}
          <aside className={`${showMobileFilters ? 'block' : 'hidden'} md:block w-full md:w-64 bg-gray-800/50 border border-cyan-700/20 rounded-xl p-5 h-fit md:sticky md:top-24`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-cyan-400 font-semibold text-lg">{t.filters}</h3>
                {showMobileFilters && <button onClick={() => setShowMobileFilters(false)}><X size={20}/></button>}
            </div>

            <input type="text" placeholder={t.search} value={search} onChange={(e) => setSearch(e.target.value)} 
              className="w-full bg-gray-900 border border-cyan-700/30 text-white px-3 py-2 rounded-lg mb-4" />
            
            <div className="mb-4">
               <label className="text-gray-400 text-sm block mb-2">{t.categories}</label>
               <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} 
                 className="w-full bg-gray-900 border border-cyan-700/30 text-white px-3 py-2 rounded-lg">
                 {categories.map((c) => <option key={c}>{c}</option>)}
               </select>
            </div>

            <label className="text-gray-400 text-sm">{t.priceRange}</label>
            <div className="flex gap-2 mb-4">
                <input type="number" placeholder={t.min} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-1/2 bg-gray-900 border border-cyan-700/30 text-white px-3 py-2 rounded-lg" />
                <input type="number" placeholder={t.max} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-1/2 bg-gray-900 border border-cyan-700/30 text-white px-3 py-2 rounded-lg" />
            </div>
            
            <label className="text-gray-400 text-sm">{t.orderBy}</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full bg-gray-900 border border-cyan-700/30 text-white px-3 py-2 rounded-lg mb-4">
                <option value="none">{t.none}</option>
                <option value="price-asc">{t.asc}</option>
                <option value="price-desc">{t.desc}</option>
            </select>
            
            <button onClick={resetFilters} className="w-full mt-2 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg">{t.clear}</button>
          </aside>

          {/* PRODUCTOS */}
          <section id="productos" className="flex flex-wrap justify-center gap-6 flex-1">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((p) => (
                <div key={p.id} className="relative group">
                  <ProductCard id={p.id} title={p.title} price={p.price} image={p.image} description={p.description} lang={lang} />
                  <button onClick={() => addToCart(p)} className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full shadow-lg z-10 flex items-center gap-2 px-4 font-bold text-sm md:hidden">
                    <Plus size={16} /> Agregar
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center w-full py-20 text-gray-500">
                  <p className="text-xl">No se encontraron productos</p>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );

  const renderCart = () => (
    <div className="px-4 pt-8 pb-32 min-h-screen bg-white text-black">
      <h2 className="text-3xl font-bold mb-6">Tu Carrito</h2>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
          <ShoppingCart size={64} className="mb-4 opacity-20" />
          <p>Tu carrito está vacío</p>
          <button onClick={() => setActiveTab('home')} className="mt-4 text-blue-600 font-semibold">Ir a comprar</button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex gap-4 items-center">
                 <div className="w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-100 p-1">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                 </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-gray-800 line-clamp-2">{item.title}</p>
                  <p className="text-blue-600 font-bold">${item.price.toLocaleString()}</p>
                </div>
              </div>
              <button onClick={() => removeFromCart(index)} className="text-red-500 bg-red-50 p-2 rounded-full hover:bg-red-100">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <div className="fixed bottom-20 left-0 w-full bg-white border-t p-4 px-6 shadow-xl">
            <div className="flex justify-between items-center mb-4 text-lg">
              <span className="text-gray-500">Total</span>
              <span className="font-bold text-2xl">${calculateTotal()}</span>
            </div>
            <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg">Pagar Ahora</button>
          </div>
        </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="p-6 pt-12 min-h-screen bg-gray-50 text-black">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <User size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Hola, Cliente</h2>
          <p className="text-gray-500">Bienvenido</p>
        </div>
      </div>
      <div className="space-y-3">
        {['Mis Pedidos', 'Direcciones', 'Soporte', 'Cerrar Sesión'].map((item) => (
          <button key={item} className="w-full text-left p-4 bg-white border border-gray-200 rounded-xl font-medium shadow-sm flex justify-between">
            {item} <span>›</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen font-sans">
      {activeTab === 'home' && renderHome()}
      {activeTab === 'cart' && renderCart()}
      {activeTab === 'profile' && renderProfile()}

      {/* MENÚ ABAJO */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around py-3 z-50 md:hidden text-gray-500 pb-safe shadow-xl">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-600' : ''}`}>
          <HomeIcon size={24} />
          <span className="text-[10px] font-medium">Inicio</span>
        </button>
        <button onClick={() => setActiveTab('cart')} className={`flex flex-col items-center gap-1 relative ${activeTab === 'cart' ? 'text-blue-600' : ''}`}>
          <div className="relative">
            <ShoppingCart size={24} />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{cart.length}</span>}
          </div>
          <span className="text-[10px] font-medium">Carrito</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-blue-600' : ''}`}>
          <User size={24} />
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </nav>
      <style jsx global>{`.pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }`}</style>
    </div>
  );
}