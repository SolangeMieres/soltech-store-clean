// components/Footer.js
const texts = {
  es: {
    line1: "© 2025 SOLtech — Innovación que impulsa tus ideas.",
    line2: "Tecnología confiable y con garantía. Argentina 🇦🇷",
    whatsapp: "WhatsApp",
    email: "Email",
  },
  en: {
    line1: "© 2025 SOLtech — Innovation that powers your ideas.",
    line2: "Reliable tech with warranty. Argentina 🇦🇷",
    whatsapp: "WhatsApp",
    email: "Email",
  },
}

export default function Footer({ lang = "es" }) {
  const t = texts[lang] || texts.es

  return (
    <footer
      id="contacto"
      className="mt-12 py-8 text-center text-light/70 text-sm border-t border-light/10"
    >
      <p>{t.line1}</p>
      <p>{t.line2}</p>
      <div className="mt-3 flex justify-center gap-4">
        <a
          href="https://wa.me/5491123456789"
          target="_blank"
          rel="noreferrer"
          className="hover:text-brand transition"
        >
          📲 {t.whatsapp}
        </a>
        <a
          href="mailto:contacto@soltech.com"
          className="hover:text-brand transition"
        >
          ✉️ {t.email}
        </a>
      </div>
    </footer>
  )
}
