import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

export default function Home() {
  const products = [
    {
      title: "Auriculares Inalámbricos Pro",
      description: "Sonido envolvente, cancelación activa y 40h de batería.",
      image: "https://placehold.co/400x250/1E2329/00B4D8?text=Smart+Headphones"
    },
    {
      title: "Smartwatch Active 2",
      description: "Monitoreo de salud, resistencia al agua y diseño elegante.",
      image: "https://placehold.co/400x250/1E2329/00B4D8?text=Smart+Watch"
    },
    {
      title: "Teclado Mecánico Wireless",
      description: "Retroiluminado RGB, conexión dual y switches silenciosos.",
      image: "https://placehold.co/400x250/1E2329/00B4D8?text=Wireless+Keyboard"
    }
  ]

  return (
    <div className="bg-dark min-h-screen text-light">
      <Navbar />

      {/* HERO con animación */}
      <motion.section
        className="text-center py-20 px-6 bg-gradient-to-b from-gray to-dark"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-brand mb-4">
          Tecnología con estilo
        </h2>
        <p className="text-light/80 max-w-xl mx-auto mb-8">
          Equipos, accesorios y soluciones tech diseñadas para simplificar tu vida digital.  
          Innovación, diseño y potencia — todo en un solo lugar.
        </p>
        <motion.button
          className="bg-brand text-white px-6 py-3 rounded-lg shadow-soft hover:bg-accent hover:shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🚀 Ver productos
        </motion.button>
      </motion.section>

      {/* PRODUCTOS con animación en cascada */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid gap-8 md:grid-cols-3">
        {products.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3, duration: 0.8 }}
          >
            <ProductCard {...p} />
          </motion.div>
        ))}
      </section>

      <Footer />
    </div>
  )
}
