import ProductCard from "@/components/ProductCard";
import ShippingCalculator from "@/components/ShippingCalculator";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <section>
        <h1>Innovación que impulsa tus ideas</h1>
        <p className="text-neutral-400 text-lg mb-10">
          Tecnología confiable, al alcance de todos. Todo nuevo y con garantía.
        </p>
      </section>

      <section className="mb-10">
        <h2>Calculá tu costo de envío 🚚</h2>
        <ShippingCalculator />
      </section>

      <section id="productos" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard
          title="Taladro Eléctrico Percutor Black & Decker 13mm 550W"
          description="Velocidad variable, mango ergonómico y diseño duradero."
          price="130.000"
          image="/img/taladro.jpg"
        />
        <ProductCard
          title="Notebook Celeron 14.1'' 4GB 128GB SSD Philco"
          description="Liviana y eficiente, ideal para estudio y trabajo (Windows 11)."
          price="350.000"
          image="/img/notebook.jpg"
        />
      </section>

      <footer id="contacto">
        © 2025 SOLtech — Innovación que impulsa tus ideas. <br />
        Tecnología nueva con garantía. Argentina.
      </footer>
    </main>
  );
}
