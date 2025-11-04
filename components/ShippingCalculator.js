// components/ShippingCalculator.js
import { useState } from "react"

const texts = {
  es: {
    title: "Calculá tu costo de envío 🚛",
    placeholder: "Código postal",
    button: "Calcular",
    result: "Costo estimado:",
    alert: "Ingresá un código postal válido",
  },
  en: {
    title: "Estimate your shipping cost 🚛",
    placeholder: "ZIP code",
    button: "Calculate",
    result: "Estimated cost:",
    alert: "Please enter a valid ZIP code",
  },
}

export default function ShippingCalculator({ lang = "es" }) {
  const [zip, setZip] = useState("")
  const [cost, setCost] = useState(null)
  const t = texts[lang] || texts.es

  const calculateShipping = () => {
    if (!zip) return alert(t.alert)
    const simulatedCost = Math.floor(Math.random() * 2000) + 500
    setCost(simulatedCost)
  }

  return (
    <div className="bg-dark/70 border border-light/10 shadow-soft rounded-2xl p-6 text-center max-w-md mx-auto mt-8">
      <h2 className="text-lg font-bold text-brand mb-3">{t.title}</h2>
      <input
        type="text"
        placeholder={t.placeholder}
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        className="px-3 py-2 rounded-lg w-40 text-dark mr-2"
      />
      <button onClick={calculateShipping}>{t.button}</button>
      {cost && (
        <p className="mt-3 text-light">
          {t.result}{" "}
          <span className="text-brand">${cost.toLocaleString("es-AR")}</span>
        </p>
      )}
    </div>
  )
}
