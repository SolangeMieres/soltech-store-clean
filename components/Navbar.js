// components/Navbar.js
const labels = {
  es: {
    store: 'SOLtech Store',
    home: 'Inicio',
    products: 'Productos',
    contact: 'Contacto',
    es: 'ES',
    en: 'EN',
  },
  en: {
    store: 'SOLtech Store',
    home: 'Home',
    products: 'Products',
    contact: 'Contact',
    es: 'ES',
    en: 'EN',
  },
}

export default function Navbar({ lang = 'es', onChangeLang }) {
  const t = labels[lang]

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[var(--color-dark)] shadow-soft sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img
          src="/images/soltech-logo.png"
          alt="SOLtech Logo"
          className="w-10 h-10 rounded-full border border-brand shadow-soft"
        />
        <h1 className="text-[var(--color-brand)] text-xl font-bold tracking-tight">
          {t.store}
        </h1>
      </div>

      <div className="flex items-center gap-6 text-[var(--color-light)]/80 text-sm">
        <a href="#" className="hover:text-[var(--color-brand)] transition">{t.home}</a>
        <a href="#productos" className="hover:text-[var(--color-brand)] transition">{t.products}</a>
        <a href="#contacto" className="hover:text-[var(--color-brand)] transition">{t.contact}</a>

        {/* Toggle idioma */}
        <div className="flex items-center gap-1 border border-light/20 rounded-full px-2 py-1 text-xs">
          <button
            onClick={() => onChangeLang && onChangeLang('es')}
            className={`px-2 py-0.5 rounded-full ${
              lang === 'es' ? 'bg-[var(--color-brand)] text-dark' : 'text-[var(--color-light)]/70'
            }`}
          >
            {t.es}
          </button>
          <button
            onClick={() => onChangeLang && onChangeLang('en')}
            className={`px-2 py-0.5 rounded-full ${
              lang === 'en' ? 'bg-[var(--color-brand)] text-dark' : 'text-[var(--color-light)]/70'
            }`}
          >
            {t.en}
          </button>
        </div>
      </div>
    </nav>
  )
}
