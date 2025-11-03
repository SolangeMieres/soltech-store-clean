import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShippingCalculator from "@/components/ShippingCalculator";
import ProductCard from "@/components/ProductCard";
import { productos } from "@/data/productos";
import { useState } from "react";

export default function Home() {
  const [shippingFee, setShippingFee] = useState(0);
  return (
    <>
      <Head>
        <title>SOLtech — Innovación que impulsa tus ideas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Tecnología confiable, al alcance de todos. Todo nuevo y con garantía." />
      </Head>
      <Navbar />
      <main className="container py-10">
        <section className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Innovación que impulsa tus ideas
          </h1>
          <p className="mt-3 text-neutral-300">
            Tecnología confiable, al alcance de todos. Todo nuevo y con garantía.
          </p>
          <a href="#catalogo" className="inline-block mt-6 btn-primary">Ver productos</a>
        </section>

        <ShippingCalculator onFee={setShippingFee} />

        <section id="catalogo" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((p) => (
            <ProductCard key={p.id} product={p} shippingFee={shippingFee} />
          ))}
        </section>
      </main>
      <Footer />

      {/* Botón WhatsApp consultas directas */}
      <a
        href="https://wa.me/541132905944?text=Hola%20SOLtech!%20Quiero%20hacer%20una%20consulta%20sobre%20un%20producto."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-full shadow-lg flex items-center gap-2 transition z-50"
        aria-label="Consultanos por WhatsApp"
      >
        🟢 Consultanos por WhatsApp
      </a>

      {/* Botón WhatsApp canal */}
      <a
        href="https://whatsapp.com/channel/0029Vb5lkh6CBtxApQtoRw1J"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 bg-primary hover:bg-pink-700 text-white font-semibold py-3 px-4 rounded-full shadow-lg flex items-center gap-2 transition z-40"
        aria-label="Canal SOLtech"
      >
        📣 Canal SOLtech
      </a>
    </>
  );
}
