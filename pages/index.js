// pages/index.js
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
    heroSubtitle2:
      "Innovación, diseño y potencia — todo en un solo lugar.",
    cta: "Ver productos",
  },
  en: {
    heroTitle: "Technology with style",
    heroSubtitle1:
      "Devices, accessories and tech solutions to simplify your digital life.",
    heroSubtitle2:
      "Innovation, design and power — all in one place.",
    cta: "View products",
  },
};

export default function Home({ products }) {
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
          <button>🚀 {t.cta}</button>
        </a>

        <ShippingCalculator lang={lang} />

<section
  id="productos"
  className="flex flex-wrap justify-center gap-8 mt-12"
>
  {products.length > 0 ? (
    products.map((p) => (
      <ProductCard
        key={p.id}
        title={p.nombre}
        price={p.precio}
        image={p.imagen}
        description={p.descripcion}
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

// 🔄 Leer productos en tiempo real desde el archivo JSON
export async function getServerSideProps() {
  const fs = await import("fs");
  const path = await import("path");

  try {
    const filePath = path.join(process.cwd(), "data", "productos.json");

    if (!fs.existsSync(filePath)) {
      return { props: { products: [] } };
    }

    const fileData = fs.readFileSync(filePath, "utf8") || "[]";
    const products = JSON.parse(fileData);

    return { props: { products } };
  } catch (error) {
    console.error("❌ Error al leer productos:", error);
    return { props: { products: [] } };
  }
}
const productos = [
  {
    id: 1,
    title: "Auriculares Bluetooth",
    description: "Auriculares con cancelación de ruido y micrófono integrado.",
    price: 25000,
    image: "/images/auriculares.jpg",
  },
  {
    id: 2,
    title: "Mouse Gamer RGB",
    description: "Mouse ergonómico con luces RGB y alta precisión.",
    price: 15999,
    image: "/images/mouse.jpg",
  },
  {
    id: 3,
    title: "Teclado Mecánico Retroiluminado",
    description: "Diseño compacto con switches silenciosos y luz ajustable.",
    price: 28999,
    image: "/images/teclado.jpg",
  },
];
export { productos };

// components/Footer.js
import { useState } from "react";
    