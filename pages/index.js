// pages/index.js
import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ProductCard from "@/components/ProductCard"
import ShippingCalculator from "@/components/ShippingCalculator"
import products from "@/data/productos"

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
}

export default function Home() {
  const [lang, setLang] = useState("es")
  const t = texts[lang] || texts.es

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
          {products.map((p) => (
            <ProductCard key={p.id} {...p} lang={lang} />
          ))}
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  )
}
