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
    description: `Procesador
Procesador
Celeron Pad
Memoria
Disco SSD
128 GB
RAM
4 GB
Tipo de disco
SSD
Sistema Operativo
Sistema operativo
Windows
Imagen
Pantalla
14.1
Pantalla táctil
No
Tecnología de pantalla
LCD
Conectividad
Wi-Fi
Sí
Puertos usb
2 Puertos USB
Puerto HDMI
1 Puerto HDMI
Bluetooth
Sí
Detalles
Camara
Sí
Teclado numérico
No
Teclado retroiluminado
No
Color
Negro
Dimensiones
Medidas
38 x 9,4 x 27,7 cm
Peso
2.12 Kg
Batería
Batería
5000 mAh
Modelo y origen
Modelo
94N14P4020
Origen
China`,
    price: 300000,
    image: "/images/notebook.jpg",
  },
  {
    id: 3,
    title: "Taladro Percutor 750w Daewoo DAID750BX 13mm Impacto",
    description: `Mango lateral para un mejor control y estabilidad.
Diámetro de mandril de 13 mm, compatible con una amplia variedad de brocas.

Incluye llave de mandril para ajustes firmes y seguros.

Tope de profundidad, permitiendo perforaciones exactas sin exceder el nivel deseado.`,
    price: 70000,
    image: "/images/taladro.jpg"
  }
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
