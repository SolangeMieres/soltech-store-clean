// pages/index.js
"use client";
import { useState } from "react";
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
  },
  en: {
    heroTitle: "Technology with style",
    heroSubtitle1:
      "Devices, accessories and tech solutions to simplify your digital life.",
    heroSubtitle2: "Innovation, design and power — all in one place.",
    cta: "View products",
  },
};

// ✅ Productos cargados directamente
const productos = [
{
  id: 1,
  title: "Headset Gamer Aimzone negro microfono desmontable AZ709",
  description: "Filtros\nMicrófono\nSí\nTipo de uso\nOver Ear\nConectividad\nBluetooth\nDeportivo\nNo\nDatos tecnicos\nControl de volumen\nSí\nModelo y origen\nModelo\nAZ709\nOrigen\nChina",
  price: 25000,
  image: "/images/auriculares.jpg",
},
  {
    id: 2,
    title: "Notebook Celeron 14.1\" 4GB 128 GB SSD Philco N14P4020",
    description: `La Philco N4020 con Windows 11 Home y batería de 5000 mAh ofrece autonomía ideal para trabajo, estudio o entretenimiento.
Su pantalla LCD 14,1" brinda colores vivos y gran definición.
Cuenta con puertos USB y HDMI para conectar fácilmente otros dispositivos.
Con SSD 128 GB, 4 GB RAM y procesador Celeron PAD, garantiza un rendimiento rápido y estable para tus tareas diarias.`,
    price: 300000,
    image: "/images/notebook.jpg",
  },
  {
    id: 3,
    title: "Taladro Percutor 750w Daewoo DAID750BX 13mm Impacto",
    description: `Mango lateral para un mejor control y estabilidad.Diámetro de mandril de 13 mm, compatible con una amplia variedad de brocas.

Incluye llave de mandril para ajustes firmes y seguros.

Tope de profundidad, permitiendo perforaciones exactas sin exceder el nivel deseado.`,
    price: 70000,
    image: "/images/taladro.jpg"
  }, // <-- comma added here

  {
    id: 4,
    title: "Smart TV Led 32 Philips",
    description: `Controlá tu TV por voz con Alexa, Google o la app Matter Smart Home.
El sistema Titan OS ofrece acceso rápido a tus apps y contenido favorito.
Con Dolby Audio, disfrutá un sonido claro y envolvente en cada escena.`,
    price: 300000,
    image: "/images/ledphilips.jpg"
  }, // <-- comma added here

  {
    id: 5,
    title: "Freidora de Aire Peabody PE-AFW520N 5,2Lts",
    description: `Cociná de forma saludable y sin aceite gracias a su sistema de convección que deja los alimentos crujientes por fuera y tiernos por dentro.
Incluye 8 programas preestablecidos, display LED touch, ventana frontal con luz interna y capacidad de 5,2 L.
Con 1500 W de potencia, temperatura regulable de 60 °C a 200 °C, función mantener caliente, apagar/reanudar automático y recipiente antiadherente, ideal para cocinar fácil, rápido y sin humo.`,
    price: 85000,
    image: "/images/freidorapeabody.jpg"
  }, // <-- comma added here

  {
    id: 6,
    title: "Mopa Plana Trapeador Lampazo con Balde Enjuague y Secado Beige Waggs",
    description: `Mopa con balde de doble ranura para enjuagar y secar sin esfuerzo, ideal para limpieza en húmedo o en seco.
Incluye botón de desagüe, materiales duraderos y diseño práctico para pisos, techos y ventanas.
Medidas: bastón 1,30 m / balde 36 × 19 × 21 cm.`,
    price: 40000,
    image: "/images/mops.jpg"
  },

  {
    id: 7,
    title: "Termo Wanderlust Verde 1300ml Acero Inoxidable c/ Pico Cebador Mate",
    description: `Marca: Wanderlust 
Material: acero,
Capacidad:1.3 litros
mantiene la temperatura por 12 hs 
Incluye Tapón cebador. 
Wander Tip: La tapa es multiuso, podés usarlo como vaso o mate.`,
    price: 45000,
    image: "/images/termo.jpg"
  },

   {
    id: 8,
    title: "Desmalezadora Motoguadaña Naftera 52cc",
    description: `Desmalezadora KLD 52cc con motor 2 tiempos de 1650W, eje recto y transmisión cardánica.
Ofrece ancho de corte de 230 mm, cuchilla de 3 puntas, cabezal doble salida y arnés reforzado.
Ideal para bordes, esquinas y zonas difíciles, con diseño ergonómico y arranque manual con cebador para un uso cómodo y eficiente.`,
    price: 130000,
    image: "/images/desmalezadora.jpg"
  },


 {
    id: 9,
    title: "Aire Acondicionado Sansei Split Frio/calor 2365 Frigorías Blanco",
    description: `Aire acondicionado Split frío/calor de 2365 frigorías, con eficiencia energética clase A y gas R410a.
Ofrece 2750W en frío y 2500W en calor, con bajo nivel de ruido (51 dB) y funciones temporizador y modo sueño.
Diseño compacto, ideal para uso doméstico, con 12 meses de garantía.`,
    price: 750000,
    image: "/images/airesensei.jpg"
  },

 {
    id: 10,
    title: "Celular Tecno Spark 30C 128GB Orbit Black",
    description: `Diseño elegante y liviano, con cámaras traseras circulares y estilo premium.
Pantalla 6,67" con frecuencia de 60 Hz a 120 Hz para una experiencia fluida.
Cámara principal de 50 MP y frontal de 8 MP para fotos y videollamadas de alta calidad.
Batería 5000 mAh con carga rápida de 18 W y sistema HiOS basado en Android 14 con procesador Helio G81 para un rendimiento ágil y eficiente.`,
    price: 190000,
    image: "/images/celutekno.jpg"
  },


];

export default function Home() {
  const [lang, setLang] = useState("es");
  const t = texts[lang] || texts.es;

  return (
    <div>
      <Navbar lang={lang} onChangeLang={setLang} />

      <main className="min-h-screen px-6 md:px-12 text-center pt-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand mb-4">
          {t.heroTitle}
        </h1>

        <p className="text-light/80 max-w-2xl mx-auto">
          {t.heroSubtitle1}
          <br />
          {t.heroSubtitle2}
        </p>

        <a href="#productos" className="inline-block mt-6">
          <button className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-2 rounded-lg shadow-md transition">
            🚀 {t.cta}
          </button>
        </a>

        <ShippingCalculator lang={lang} />

        {/* 🛍️ Sección de productos */}
        <section
          id="productos"
          className="flex flex-wrap justify-center gap-8 mt-12"
        >
          {productos.length > 0 ? (
            productos.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id} // ✅ se pasa el id
                title={p.title}
                price={p.price}
                image={p.image}
                description={p.description}
                lang={lang}
              />
            ))
          ) : (
            <p className="text-gray-500">No hay productos disponibles.</p>
          )}
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
