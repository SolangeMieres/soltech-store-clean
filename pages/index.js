"use client";
import { useState, useMemo, useEffect } from "react";
import Head from 'next/head'; 
import { Home as HomeIcon, ShoppingCart, User, Download, Share, Filter, X, Plus, HelpCircle } from 'lucide-react';

// Importamos tus componentes originales
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

// 🟦 TUS PRODUCTOS (52 Items)
const productos = [
  { id: 1, title: "Headset Gamer Aimzone negro microfono desmontable", description: "Audio Premium: Drivers de 50 mm con sonido envolvente y cristalino. Micrófono: Desmontable y omnidireccional para comunicación clara.", price: 30000, image: "/images/auriculares.jpg", category: "Audio" },
  { id: 2, title: "Notebook Celeron 14.1\" 4GB 128 GB SSD Philco N14P4020", description: "Rendimiento Rápido: Procesador Celeron, 4 GB de RAM y disco SSD de 128 GB. Autonomía: Batería de 5000 mAh.", price: 370000, image: "/images/notebook.jpg", category: "Computación" },
  { id: 3, title: "Taladro Percutor 750w Daewoo DAID750BX", description: "Versátil: Ideal para perforar concreto, madera y metal con alta eficiencia. Incluye mango lateral.", price: 78000, image: "/images/taladro.jpg", category: "Herramientas" },
  { id: 4, title: "Smart TV Led 32 Philips", description: "Control por Voz: Compatible con Matter Smart Home, Alexa y Google. Sistema Operativo Titan OS.", price: 300000, image: "/images/ledphilips.jpg", category: "TV" },
  { id: 5, title: "Freidora de Aire Peabody PE-AFW520N 5,2Lts", description: "Gran Capacidad: 5.2 Lts y 1500 W de potencia. Fácil de Usar: Panel LED touch con 8 programas preestablecidos.", price: 110000, image: "/images/freidorapeabody.jpg", category: "Cocina" },
  { id: 6, title: "Mopa Plana Trapeador Lampazo", description: "Limpieza Sencilla: Balde con doble ranura para enjuague y secado rápido. Uso Versátil en húmedo o seco.", price: 40000, image: "/images/mops.jpg", category: "Hogar" },
  { id: 7, title: "Termo Wanderlust Verde 1300ml", description: "Capacidad: 1.3 litros. Rendimiento: Mantiene la temperatura hasta por 12 horas. Material: Acero de alta calidad.", price: 47000, image: "/images/termo.jpg", category: "Hogar" },
  { id: 8, title: "Desmalezadora Motoguadaña Naftera 52cc", description: "Motor: 52 cc y 1650 W (6500 rpm) para cortes exigentes. Uso: Ideal para cortar malezas a ras del suelo.", price: 150000, image: "/images/desmalezadora.jpg", category: "Herramientas" },
  { id: 9, title: "Aire Acondicionado Sansei Split", description: "Climatización Total: Frío/Calor con 2365 frigorías. Eficiencia: Tecnología On-Off y Clase A.", price: 700000, image: "/images/airesensei.jpg", category: "Climatización" },
  { id: 10, title: "Celular Tecno Spark 30C 128GB Orbit Black", description: "Desempeño: Procesador MediaTek Helio G81 con 4 GB de RAM. Almacenamiento: 256 GB internos.", price: 220000, image: "/images/celutekno.jpg", category: "Celulares" },
  { id: 11, title: "Playstation 5 PS5 Digital Bundle", description: "Modelo: Diseño Slim, Edición Digital (sin discos). Rendimiento: SSD de 1 TB ultrarrápido.", price: 1550000, image: "/images/play5.jpg", category: "Consolas" },
  { id: 12, title: "Lavarropas Semiautomático 6 kg Wanke", description: "Capacidad y Carga: 6 kg, Carga Superior. Sistema de Lavado: Turbina potente y eficiente.", price: 195000, image: "/images/lavafranke.jpg", category: "Lavarropas" },
  { id: 13, title: "Secadora Por Calor Kanjihome 4kg", description: "Capacidad: 4 kg. Rendimiento: Secado por calor con 1250 W de potencia. Programas: 3 ciclos.", price: 420000, image: "/images/secakanji.jpg", category: "Secarropas" },
  { id: 14, title: "Lavarropas Philco 5.5 Kg", description: "Capacidad: 5.5 kg. Programas: 10 ciclos de lavado. Eficiencia: Clase A de eficiencia energética.", price: 345000, image: "/images/lavaphilco.jpg", category: "Lavarropas" },
  { id: 15, title: "Heladera Bajo Mesada Hisense 126L", description: "Capacidad: 126 litros, ideal como auxiliar o para cocinas pequeñas. Diseño: Negro, compacto.", price: 420000, image: "/images/helahisense.jpg", category: "Heladeras" },
  { id: 16, title: "Heladera Cíclica Admiral 208 Lts", description: "Capacidad: 207 litros netos. Enfriamiento: Sistema cíclico que garantiza frescura constante.", price: 450000, image: "/images/helaadmiral.jpg", category: "Heladeras" },
  { id: 17, title: "Celular Samsung Galaxy A06 128GB", description: "Rendimiento: Procesador MediaTek G85 y 4 GB de RAM. Almacenamiento: 128 GB internos.", price: 265000, image: "/images/samsunga06.jpg", category: "Celulares" },
  { id: 18, title: "iPhone 12 Mini 64GB reacondicionado", description: "Estado: Renovado Grado A. Compatibilidad: Totalmente desbloqueado. Almacenamiento: 64 GB.", price: 470000, image: "/images/iphone12.jpg", category: "Celulares" },
  { id: 19, title: "Cafetera de Filtro Peabody", description: "Capacidad: 1.5 Litros. Función: Mantener Caliente. Comodidad: Filtro permanente.", price: 60000, image: "/images/cafepea.jpg", category: "Cocina" },
  { id: 20, title: "Ventilador de Techo Telefunken", description: "Aspas Retráctiles. Control Total: Incluye Control Remoto. Modo Invierno: Función de recirculación.", price: 150000, image: "/images/ventitecho.jpg", category: "Climatización" },
  { id: 21, title: "Celular Samsung Galaxy A16 4G", description: "Pantalla Superior: Impresionante Super AMOLED de 6.7 pulgadas con resolución FHD+.", price: 450000, image: "/images/samsunga16.jpg", category: "Celulares" },
  { id: 22, title: "Celular Motorola G15 4GB 128GB", description: "Rendimiento y Almacenamiento: 4 GB de RAM y 128 GB internos. Pantalla: 6.72 FHD+.", price: 340000, image: "/images/motorolag15.jpg", category: "Celulares" },
  { id: 23, title: "Celular ZTE Blade A35 64GB", description: "Almacenamiento: 64 GB internos. Pantalla: IPS de 6.75 pulgadas. Batería: 5000 mAh.", price: 130000, image: "/images/ztea35.jpg", category: "Celulares" },
  { id: 24, title: "Smart TV Samsung 50” UHD 4K", description: "Imagen Superior: Pantalla 50 pulgadas con resolución UHD 4K. Tecnología de Color: PurColor.", price: 695000, image: "/images/samsungDU7000.jpg", category: "TV" },
  { id: 25, title: "Bicicleta MTB Rydetech 300 R29", description: "Cuadro: Acero hidroformado robusto. Suspensión: Horquilla de 80 mm. Ruedas: 29x2.10.", price: 290000, image: "/images/bici.jpg", category: "Bicicletas" },
  { id: 26, title: "Bicicleta Infantil Nathor R16", description: "Edad y Altura: Recomendada para niños de 5 años o más. Seguridad: Limitador de giro.", price: 200000, image: "/images/bici1.jpg", category: "Bicicletas" },
  { id: 27, title: "Auriculares Admiral AD-F9 Negro", description: "Conexión: Bluetooth V5.3. Autonomía: Hasta 6 horas de uso continuo.", price: 15000, image: "/images/auriadm.jpg", category: "Audio" },
  { id: 28, title: "Auricular Aiwa TWA-80B Blanco", description: "Conectividad: Bluetooth. Control: Micrófono y Touch multifunción. Diseño In-Ear.", price: 20000, image: "/images/auriaiwa.jpg", category: "Audio" },
  { id: 29, title: "Aspiradora Robot Sansei", description: "Doble Función: Aspira (1400 Pa) y trapea. Filtro: HEPA. Autonomía: 120 min.", price: 240000, image: "/images/aspisansei.jpg", category: "Hogar" },
  { id: 30, title: "Pizarra Mágica 12", description: "Pantalla: LCD de 12.5 pulgadas multicolor. Fácil de Usar: Escribe y borra con un toque.", price: 9500, image: "/images/pizzarra.jpg", category: "Juguetes" },
  { id: 31, title: "Cuatriciclo Stark Naranja 6V", description: "Edad Recomendada: Niños de 2 a 4 años. Rendimiento: Batería de 6 V. Marcha adelante y atrás.", price: 110000, image: "/images/cuatri.jpg", category: "Juguetes" },
  { id: 32, title: "Cuatriciclo Stark Blanco 6V", description: "Edad Recomendada: 2 a 4 años. Rendimiento: Batería de 6 V. Diseño realista.", price: 110000, image: "/images/cuatrib.jpg", category: "Juguetes" },
  { id: 33, title: "Mesa Didáctica Unicornio", description: "Mesa didáctica con proyector temático de Unicornio. Incluye 1 libro, 24 patrones.", price: 30000, image: "/images/mesauni.jpg", category: "Juguetes" },
  { id: 34, title: "Mesa Didáctica Dinosaurio", description: "Mesa didáctica con proyector temático de Dinosaurio. Incluye 1 libro, 24 patrones.", price: 30000, image: "/images/mesadino.jpg", category: "Juguetes" },
  { id: 35, title: "Pestañas Magneticas", description: "El kit incluye 2 pestañas magnéticas con pinza aplicadora y estuche con espejo.", price: 20000, image: "/images/pestañas.jpg", category: "Belleza" },
  { id: 36, title: "Nebulizador Ultrasónico", description: "Tecnología: Ultrasónico. Ventajas: Liviano y silencioso. Ideal para niños.", price: 27000, image: "/images/nebu.jpg", category: "Salud" },
  { id: 37, title: "Vaporera Eléctrica 2 niveles", description: "Capacidad: 2 niveles, hasta 14 huevos y vegetales. Flujo de vapor constante.", price: 43000, image: "/images/vaporera.jpg", category: "Cocina" },
  { id: 38, title: "Reloj Retro", description: "Funciones: Hora, Alarma, Cronómetro y Luz. Estilo: Nostalgia de los 80.", price: 20000, image: "/images/reloj.jpg", category: "Accesorios" },
  { id: 39, title: "Máquina Cortapelo Vintage T9", description: "Funcionalidad: Cortadora y perfiladora de precisión. Inalámbrica y Portátil.", price: 25000, image: "/images/cortacabello.jpg", category: "Belleza" },
  { id: 40, title: "Caja Impermeable Baño Celular", description: "Uso: Soporte diseñado para mantener tu teléfono seguro y seco en la ducha.", price: 22000, image: "/images/cajaducha.jpg", category: "Hogar" },
  { id: 41, title: "Lámpara De Medusas Led Rgb", description: "Diseño Único: Medusa suspendida en base acrílica. Ambiente: Luz suave y relajante.", price: 25000, image: "/images/medusa.jpg", category: "Hogar" },
  { id: 42, title: "Mini Pistola Masajeadora", description: "Uso: Terapia de vibración profunda. Rendimiento: Hasta 2500 RPM.", price: 25000, image: "/images/masaje.jpg", category: "Hogar" },
  { id: 43, title: "Trapeador Escurridor Ajustable", description: "Funcionalidad: Sistema de escurrido manual que elimina el exceso de agua.", price: 35000, image: "/images/trapeaescurri.jpg", category: "Hogar" },
  { id: 44, title: "Organizador De Remeras", description: "Función: Diseñado para clasificar remeras de manera eficiente.", price: 4000, image: "/images/organiza.jpg", category: "Hogar" },
  { id: 45, title: "Aire Acondicionado Inverter Admiral", description: "Tecnología Clave: Inverter. Capacidad: Frío/Calor. Potencia de 2300 frigorías.", price: 700000, image: "/images/aireadmiral.jpg", category: "Climatización" },
  { id: 46, title: "Ventilador Kanjihome 18", description: "Tipo: De Pie, con altura regulable. Rendimiento: 18 pulgadas.", price: 70000, image: "/images/ventitele.jpg", category: "Climatización" },
  { id: 47, title: "Ventilador de Pie Admiral", description: "Tipo: De Pie, con barral telescópico metálico. Diámetro 18 pulgadas.", price: 75000, image: "/images/ventiadmiral.jpg", category: "Climatización" },
  { id: 48, title: "Ventilador Ken Brown", description: "Funcionalidad: Modelo 3 en 1. Potencia: 100 Watts. 5 aspas metálicas.", price: 105000, image: "/images/ventiken.jpg", category: "Climatización" },
  { id: 49, title: "Extractor Saca Cera Oreja", description: "Diseño Seguro: Fabricado con silicona suave. Incluye 16 puntas.", price: 12000, image: "/images/removedor.jpg", category: "Salud" },
  { id: 50, title: "Adaptador Hub Usb 3 Puertos", description: "Puertos: Adaptador Hub con 3 puertos USB 2.0. Diseño de cabezal giratorio.", price: 10000, image: "/images/adaptador.jpg", category: "Accesorios" },
  { id: 51, title: "Hub Usb 3.0 7 Puertos", description: "Puertos: 7 puertos USB para conexión simultánea. Transferencia 5 Gbps.", price: 25000, image: "/images/adaptador1.jpg", category: "Accesorios" },
  { id: 52, title: "Lupa Tarjeta De Credito", description: "Aumento: Doble aumento (3x y 6x). Diseño tipo tarjeta con Luz LED.", price: 20000, image: "/images/leetarjeta.jpg", category: "Accesorios" },
];

export default function Home() {
  const [lang, setLang] = useState("es");
  const t = texts[lang];

  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
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
      // Si la app está lista para instalar, la instalamos
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    } else {
      // Si NO está lista (falta ícono o es iOS), mostramos la ayuda manual
      setShowInstallHelp(true);
    }
  };

  // Lógica de Filtros
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [sort, setSort] = useState("none");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = ["Todas", ...new Set(productos.map((p) => p.category))];

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

  const addToCart = (product) => {
    setCart([...cart, product]);
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));
  const calculateTotal = () => cart.reduce((total, item) => total + item.price, 0).toLocaleString();

  // --- VISTAS ---

  const renderHome = () => (
    <>
      <Navbar lang={lang} onChangeLang={setLang} />

      <main className="min-h-screen px-6 md:px-12 pt-12 bg-dark text-white pb-32 relative">
        
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#2563eb" />
          <link rel="apple-touch-icon" href="/images/icon-192.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
        </Head>

        {/* --- BOTÓN FLOTANTE PERMANENTE --- */}
        <div className="fixed top-24 right-4 z-50">
            <button 
              onClick={handleInstallClick} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white animate-bounce"
            >
              <Download size={20} /> 
              <span className="hidden md:inline">Instalar App</span>
            </button>
        </div>

        {/* --- MODAL DE AYUDA MANUAL (Si la instalación falla) --- */}
        {showInstallHelp && (
          <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
            <div className="bg-gray-800 p-6 rounded-xl max-w-sm w-full border border-gray-600 relative">
              <button onClick={() => setShowInstallHelp(false)} className="absolute top-2 right-2 text-gray-400"><X size={24}/></button>
              <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2"><Smartphone /> Instalar App Manualmente</h3>
              <p className="text-gray-300 mb-4">Tu navegador no permite instalación automática (o faltan los íconos). Sigue estos pasos:</p>
              
              <div className="space-y-4 text-sm">
                <div className="flex gap-3 items-start">
                  <span className="bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                  <p>Toca el botón de <strong>Opciones</strong> de tu navegador (los 3 puntos o botón Compartir).</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                  <p>Busca la opción <strong>"Agregar a la pantalla de inicio"</strong> o "Instalar Aplicación".</p>
                </div>
              </div>
              
              <button onClick={() => setShowInstallHelp(false)} className="w-full mt-6 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg font-bold">Entendido</button>
            </div>
          </div>
        )}

        {/* Título */}
        <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand mb-4 text-cyan-400 drop-shadow-md">{t.heroTitle}</h1>
            <p className="text-gray-300 text-center max-w-2xl mx-auto text-sm md:text-base">{t.heroSubtitle1}<br />{t.heroSubtitle2}</p>
        </div>

        <ShippingCalculator lang={lang} />

        {/* Botón Filtros Móvil */}
        <button className="md:hidden w-full mb-4 flex items-center justify-center gap-2 bg-gray-800 py-3 rounded-lg border border-gray-700 text-white" onClick={() => setShowMobileFilters(!showMobileFilters)}>
            <Filter size={18} /> {showMobileFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </button>

        <div className="flex flex-col md:flex-row mt-12 gap-10">
          
          {/* Sidebar */}
          <aside className={`${showMobileFilters ? 'block' : 'hidden'} md:block w-full md:w-64 bg-dark/40 border border-cyan-700/20 rounded-xl p-5 h-fit md:sticky md:top-20`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-cyan-400 font-semibold text-lg">{t.filters}</h3>
                {showMobileFilters && <button onClick={() => setShowMobileFilters(false)}><X size={20} className="text-white"/></button>}
            </div>
            <input type="text" placeholder={t.search} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-dark/60 border border-cyan-700/30 text-white px-3 py-2 rounded-lg mb-4" />
            <div className="mb-4">
                <label className="text-light text-sm block mb-2">{t.categories}</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full bg-dark/60 border border-cyan-700/30 text-white px-3 py-2 rounded-lg">{categories.map((c) => <option key={c}>{c}</option>)}</select>
            </div>
            <label className="text-light text-sm">{t.priceRange}</label>
            <div className="flex gap-2 mb-4">
              <input type="number" placeholder={t.min} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-1/2 bg-dark/60 border border-cyan-700/30 text-white px-3 py-2 rounded-lg" />
              <input type="number" placeholder={t.max} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-1/2 bg-dark/60 border border-cyan-700/30 text-white px-3 py-2 rounded-lg" />
            </div>
            <label className="text-light text-sm">{t.orderBy}</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full bg-dark/60 border border-cyan-700/30 text-white px-3 py-2 rounded-lg mb-4">
              <option value="none">{t.none}</option>
              <option value="price-asc">{t.asc}</option>
              <option value="price-desc">{t.desc}</option>
            </select>
            <button onClick={resetFilters} className="w-full mt-2 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg">{t.clear}</button>
          </aside>

          {/* 🟦 PRODUCTOS: Usando tu componente original y corrigiendo la grilla */}
          <section id="productos" className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((p) => (
                <div key={p.id} className="flex flex-col">
                    {/* Usamos tu componente original tal cual */}
                    <ProductCard
                      id={p.id}
                      title={p.title}
                      price={p.price}
                      image={p.image}
                      description={p.description}
                      lang={lang}
                    />
                    {/* Botón extra para conectar con el carrito de la App si el ProductCard no lo hace */}
                    <button onClick={() => addToCart(p)} className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg md:hidden">
                        <Plus size={16} className="inline mr-1"/> Agregar
                    </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-lg w-full text-center py-20 col-span-full">No se encontraron productos</p>
            )}
          </section>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );

  const renderCart = () => (
    <div className="px-4 pt-8 pb-32 min-h-screen bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6">Tu Carrito</h2>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
          <ShoppingCart size={64} className="mb-4 opacity-50" />
          <p>Tu carrito está vacío</p>
          <button onClick={() => setActiveTab('home')} className="mt-4 text-blue-400 font-semibold">Ir a comprar</button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm">
              <div className="flex gap-4 items-center">
                 <div className="w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-600 p-1">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                 </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-white line-clamp-2">{item.title}</p>
                  <p className="text-cyan-400 font-bold">${item.price.toLocaleString()}</p>
                </div>
              </div>
              <button onClick={() => removeFromCart(index)} className="text-red-400 bg-red-900/20 p-2 rounded-full hover:bg-red-900/40">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <div className="fixed bottom-20 left-0 w-full bg-gray-800 border-t border-gray-700 p-4 px-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 text-lg">
              <span className="text-gray-400">Total</span>
              <span className="font-bold text-2xl text-cyan-400">${calculateTotal()}</span>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold text-lg transition-colors">
              Pagar Ahora
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="p-6 pt-12 min-h-screen bg-gray-900 text-white">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-cyan-400">
            <User size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Hola, Cliente</h2>
          <p className="text-gray-400">Bienvenido</p>
        </div>
      </div>
      <div className="space-y-3">
        {['Mis Pedidos', 'Direcciones', 'Soporte', 'Cerrar Sesión'].map((item) => (
          <button key={item} className="w-full text-left p-4 bg-gray-800 border border-gray-700 rounded-xl font-medium shadow-sm flex justify-between hover:bg-gray-700 transition-colors">
            {item} <span>›</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-dark text-white min-h-screen font-sans">
      {activeTab === 'home' && renderHome()}
      {activeTab === 'cart' && renderCart()}
      {activeTab === 'profile' && renderProfile()}

      {/* MENÚ APP (Solo visible en móvil) */}
      <nav className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 flex justify-around py-3 z-50 md:hidden text-gray-400 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.3)]">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-cyan-400 scale-110' : ''} transition-all`}>
          <HomeIcon size={24} strokeWidth={2.5} />
          <span className="text-[10px] font-medium">Inicio</span>
        </button>
        <button onClick={() => setActiveTab('cart')} className={`flex flex-col items-center gap-1 relative ${activeTab === 'cart' ? 'text-cyan-400 scale-110' : ''} transition-all`}>
          <div className="relative">
            <ShoppingCart size={24} strokeWidth={activeTab === 'cart' ? 2.5 : 2} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                {cart.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Carrito</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-cyan-400 scale-110' : ''} transition-all`}>
          <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </nav>
      <style jsx global>{`.pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }`}</style>
    </div>
  );
}