// components/ProductCard.js
import { useState } from "react"

const texts = {
  es: {
    buy: "Comprar",
    noPrice: "Precio no disponible",
    errorStart: "No se pudo iniciar el pago.",
    errorGeneric: "Ocurrió un error iniciando el pago.",
    loading: "Redirigiendo...",
  },
  en: {
    buy: "Buy",
    noPrice: "Price not available",
    errorStart: "Could not start payment.",
    errorGeneric: "An error occurred while starting payment.",
    loading: "Redirecting...",
  },
}

export default function ProductCard({ id, title, title_en, description, description_en, price, image, lang = "es" }) {
  const [loading, setLoading] = useState(false)
  const t = texts[lang] || texts.es

  const displayTitle = lang === "en" ? (title_en || title) : title
  const displayDescription =
    lang === "en" ? (description_en || description) : description

  const handleBuy = async () => {
    if (!price) return alert(t.noPrice)

    try {
      setLoading(true)
      const response = await fetch("/api/checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: product.title,
    quantity: 1,
    price: product.price,
  }),
});


      const data = await res.json()
      if (!res.ok || !data.init_point) {
        console.error(data)
        alert(t.errorStart)
        return
      }

      // Redirige al checkout de Mercado Pago
      window.location.href = data.init_point
    } catch (error) {
      console.error(error)
      alert(t.errorGeneric)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-dark/80 border border-light/10 shadow-soft rounded-2xl p-4 hover:scale-[1.02] transition w-80 text-center">
      <img
        src={image || "/images/notebook.jpg"}
        alt={displayTitle}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-bold text-brand mb-2">{displayTitle}</h3>
      <p className="text-sm text-light/70 mb-3">{displayDescription}</p>
      <p className="text-sm font-semibold text-light mb-4">
        {price ? `$${price.toLocaleString("es-AR")}` : t.noPrice}
      </p>
      <button onClick={handleBuy} disabled={loading}>
        {loading ? t.loading : t.buy}
      </button>
    </div>
  )
}
