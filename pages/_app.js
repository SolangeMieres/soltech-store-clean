import "@/styles/globals.css";
import { CartProvider } from "@/context/CartContext";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      {/* 🌐 Sitio completo */}
      <Component {...pageProps} />

      {/* 💬 Burbuja flotante tech-cyan animada */}
      <a
        href="https://wa.me/5491132905944?text=Hola%20SOLtech!%20Quiero%20consultar%20por%20un%20producto."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full p-4 shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-110 border border-cyan-300/40 animate-pulse"
        title="Chateá con SOLtech por WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]"
        >
          <path d="M13.601 2.326A7.926 7.926 0 008.003 0C3.584 0 .02 3.564.02 7.983c0 1.407.372 2.78 1.076 3.992L0 16l4.128-1.075a7.958 7.958 0 003.872.985h.003c4.419 0 7.983-3.564 7.983-7.983a7.926 7.926 0 00-2.385-5.601zm-5.598 12.77a6.54 6.54 0 01-3.334-.913l-.24-.143-2.451.639.655-2.39-.156-.246a6.528 6.528 0 01-1.013-3.493C1.464 4.37 4.349 1.485 8.003 1.485a6.52 6.52 0 014.63 1.915 6.52 6.52 0 011.916 4.63c0 3.654-2.885 6.54-6.546 6.54z" />
          <path d="M11.605 9.418c-.197-.099-1.166-.575-1.348-.64-.181-.066-.314-.099-.447.099-.132.197-.513.64-.629.772-.115.132-.231.148-.428.05-.197-.099-.83-.306-1.58-.975-.583-.52-.975-1.166-1.09-1.363-.115-.198-.012-.305.087-.403.089-.089.198-.231.296-.347.099-.115.132-.198.198-.33.066-.132.033-.247-.017-.347-.05-.099-.447-1.08-.613-1.479-.16-.386-.323-.333-.447-.339-.115-.006-.247-.007-.38-.007s-.347.05-.53.247c-.181.197-.697.681-.697 1.66s.715 1.927.814 2.06c.099.132 1.407 2.148 3.413 3.01.478.206.85.329 1.14.421.479.153.915.131 1.26.08.385-.057 1.166-.476 1.331-.937.165-.462.165-.857.115-.937-.05-.082-.182-.132-.38-.231z" />
        </svg>

        {/* 🔘 Anillo brillante animado */}
        <span className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping"></span>
      </a>

      {/* 📈 Google Analytics */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `,
        }}
      />
    </CartProvider>
  );
}
