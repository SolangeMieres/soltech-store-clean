// pages/index.js
"use client";
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
    heroSubtitle2: "Innovación, diseño y potencia — todo en un solo lugar.",
    cta: "Ver productos",
  },
  en: {
    heroTitle: "Technology with style",
    heroSubtitle1:
      "Devices, accessories and tech solutions to simplify your digital life.",
    heroSubtitle2: "Innovation, design and power — all in one place.",
    cta: "View products",
  },
};

// ✅ Productos cargados directamente
const productos = [
{
  id: 1,
  title: "Headset Gamer Aimzone negro microfono desmontable AZ709",
  description: "Filtros\nMicrófono\nSí\nTipo de uso\nOver Ear\nConectividad\nBluetooth\nDeportivo\nNo\nDatos tecnicos\nControl de volumen\nSí\nModelo y origen\nModelo\nAZ709\nOrigen\nChina",
  price: 25000,
  image: "/images/auriculares.jpg",
},
  {
    id: 2,
    title: "Notebook Celeron 14.1\" 4GB 128 GB SSD Philco N14P4020",
    description: `La Philco N4020 con Windows 11 Home y batería de 5000 mAh ofrece autonomía ideal para trabajo, estudio o entretenimiento.
Su pantalla LCD 14,1" brinda colores vivos y gran definición.
Cuenta con puertos USB y HDMI para conectar fácilmente otros dispositivos.
Con SSD 128 GB, 4 GB RAM y procesador Celeron PAD, garantiza un rendimiento rápido y estable para tus tareas diarias.`,
    price: 300000,
    image: "/images/notebook.jpg",
  },
  {
    id: 3,
    title: "Taladro Percutor 750w Daewoo DAID750BX 13mm Impacto",
    description: `Mango lateral para un mejor control y estabilidad.Diámetro de mandril de 13 mm, compatible con una amplia variedad de brocas.

Incluye llave de mandril para ajustes firmes y seguros.

Tope de profundidad, permitiendo perforaciones exactas sin exceder el nivel deseado.`,
    price: 70000,
    image: "/images/taladro.jpg"
  }, // <-- comma added here

  {
    id: 4,
    title: "Smart TV Led 32 Philips",
    description: `Controlá tu TV por voz con Alexa, Google o la app Matter Smart Home.
El sistema Titan OS ofrece acceso rápido a tus apps y contenido favorito.
Con Dolby Audio, disfrutá un sonido claro y envolvente en cada escena.`,
    price: 300000,
    image: "/images/ledphilips.jpg"
  }, // <-- comma added here

  {
    id: 5,
    title: "Freidora de Aire Peabody PE-AFW520N 5,2Lts",
    description: `Cociná de forma saludable y sin aceite gracias a su sistema de convección que deja los alimentos crujientes por fuera y tiernos por dentro.
Incluye 8 programas preestablecidos, display LED touch, ventana frontal con luz interna y capacidad de 5,2 L.
Con 1500 W de potencia, temperatura regulable de 60 °C a 200 °C, función mantener caliente, apagar/reanudar automático y recipiente antiadherente, ideal para cocinar fácil, rápido y sin humo.`,
    price: 85000,
    image: "/images/freidorapeabody.jpg"
  }, // <-- comma added here

  {
    id: 6,
    title: "Mopa Plana Trapeador Lampazo con Balde Enjuague y Secado Beige Waggs",
    description: `Mopa con balde de doble ranura para enjuagar y secar sin esfuerzo, ideal para limpieza en húmedo o en seco.
Incluye botón de desagüe, materiales duraderos y diseño práctico para pisos, techos y ventanas.
Medidas: bastón 1,30 m / balde 36 × 19 × 21 cm.`,
    price: 40000,
    image: "/images/mops.jpg"
  },

  {
    id: 7,
    title: "Termo Wanderlust Verde 1300ml Acero Inoxidable c/ Pico Cebador Mate",
    description: `Marca: Wanderlust 
Material: acero,
Capacidad:1.3 litros
mantiene la temperatura por 12 hs 
Incluye Tapón cebador. 
Wander Tip: La tapa es multiuso, podés usarlo como vaso o mate.`,
    price: 45000,
    image: "/images/termo.jpg"
  },

   {
    id: 8,
    title: "Desmalezadora Motoguadaña Naftera 52cc",
    description: `Desmalezadora KLD 52cc con motor 2 tiempos de 1650W, eje recto y transmisión cardánica.
Ofrece ancho de corte de 230 mm, cuchilla de 3 puntas, cabezal doble salida y arnés reforzado.
Ideal para bordes, esquinas y zonas difíciles, con diseño ergonómico y arranque manual con cebador para un uso cómodo y eficiente.`,
    price: 130000,
    image: "/images/desmalezadora.jpg"
  },


 {
    id: 9,
    title: "Aire Acondicionado Sansei Split Frio/calor 2365 Frigorías Blanco",
    description: `Aire acondicionado Split frío/calor de 2365 frigorías, con eficiencia energética clase A y gas R410a.
Ofrece 2750W en frío y 2500W en calor, con bajo nivel de ruido (51 dB) y funciones temporizador y modo sueño.
Diseño compacto, ideal para uso doméstico, con 12 meses de garantía.`,
    price: 750000,
    image: "/images/airesensei.jpg"
  },

 {
    id: 10,
    title: "Celular Tecno Spark 30C 128GB Orbit Black",
    description: `Diseño elegante y liviano, con cámaras traseras circulares y estilo premium.
Pantalla 6,67" con frecuencia de 60 Hz a 120 Hz para una experiencia fluida.
Cámara principal de 50 MP y frontal de 8 MP para fotos y videollamadas de alta calidad.
Batería 5000 mAh con carga rápida de 18 W y sistema HiOS basado en Android 14 con procesador Helio G81 para un rendimiento ágil y eficiente.`,
    price: 190000,
    image: "/images/celutekno.jpg"
  },

   {
    id: 11,
    title: "Playstation 5 PS5 Digital Bundle 2 Astro+GT7",
    description: `Incluye PS5 Digital Slim 1 TB SSD, control inalámbrico DualSense, cables HDMI/CA/USB, ASTROs Playroom preinstalado y cupones digitales para Gran Turismo 7 y ASTRO BOT.
Diseño compacto y elegante, sin lector de discos, con carga ultrarrápida y rendimiento fluido.
Ofrece gráficos 4K, audio 3D, gatillos adaptativos y retrocompatibilidad con +4000 juegos de PS4 para una experiencia de juego inmersiva y completa.`,
    price: 1600000,
    image: "/images/play5.jpg"
  },

{
    id: 12,
    title: "Lavarropas Semiautomático 6 kg Wanke",
    description: `Lavarropas semiautomático de carga superior con capacidad de 6 kg y motor de 200 W, eficiente y de bajo consumo.
Cuenta con sistema de lavado por turbina, 4 programas, temporizador incorporado y opción de uso con o sin pedestal.
Diseño compacto y liviano (50×85,5×61 cm, 9,4 kg), ideal para espacios reducidos. Fabricado en Brasil.`,
    price: 190000,
    image: "/images/lavafranke.jpg"
  },

{
    id: 13,
    title: "Secadora Por Calor Kanjihome 4kg",
    description: `Secadora por calor de 4 kg con potencia de 1250 W y 3 programas de secado.
Diseño compacto y liviano (42×49×55 cm), ideal para espacios reducidos.
Cuenta con protección IPX4, eficiencia energética D y 12 meses de garantía. Fabricada en Argentina, color blanco.`,
    price: 300000,
    image: "/images/secakanji.jpg"
  },

{
    id: 14,
    title: "Lavarropas Philco 5.5 Kg Carga Superior Gris",
    description: `Lavarropas automático de carga superior con capacidad de 5,5 kg y 10 programas de lavado.
Ofrece centrifugado de 750 RPM, eficiencia energética A y sistema de lavado oriental, que cuida las prendas con suavidad.
Diseño compacto y moderno en color gris, ideal para optimizar espacio y consumo.`,
    price: 330000,
    image: "/images/lavaphilco.jpg"
  },

{
    id: 15,
    title: "Heladera Bajo Mesada 126 Litros Negra Hisense",
    description: `Heladera bajo mesada de 126 litros, ideal para espacios reducidos o como complemento.
Diseño compacto y elegante en color negro, con control mecánico, puerta reversible, almacenamiento para botellas de 2 L, zona fría y bajo nivel de ruido.
Incluye patas ajustables, luz interior y 12 meses de garantía.`,
    price: 360000,
    image: "/images/helahisense.jpg"
  },

  {
    id: 16,
    title: "Heladera Cíclica Admiral AD-HL DF2-285-1 208 Lts Blanca",
    description: `Heladera compacta y elegante en color blanco, ideal para cocina, oficina o dormitorio.
Cuenta con estantes desmontables, cajón para frutas y verduras y anaqueles para botellas.
Ofrece capacidad neta de 207 L y sistema de enfriamiento cíclico que mantiene los alimentos frescos con eficiencia y temperatura constante.`,
    price: 450000,
    image: "/images/helaadmiral.jpg"
  },

    {
    id: 17,
    title: "Celular Samsung Galaxy A06 128GB Negro",
    description: `Diseño fino y elegante (8 mm) con pantalla HD+ de 6,7" para una experiencia visual brillante.
Rendimiento fluido gracias al procesador MediaTek G85, 4 GB RAM y 128 GB de almacenamiento, ampliable hasta 1 TB.
Cámara trasera doble de 50 MP + 2 MP y frontal de 8 MP para fotos nítidas.
Batería 5000 mAh con carga rápida de 25 W, sensor de huella lateral y seguridad avanzada Samsung Knox Vault.`,
    price: 260000,
    image: "/images/samsunga06.jpg"
  },

    {
    id: 18,
    title: "Smartphone reacondicionado Apple iPhone 12 Mini 64GB rojo desbloqueado",
    description: `iPhone 12 Mini desbloqueado, compatible con todas las operadoras GSM y CDMA.
Incluye cable de carga MFi, sin auriculares ni SIM.
Producto reacondicionado Grado A, en excelente estado, con batería al 80 % mínimo.
Entrega estimada: 25 días.`,
    price: 470000,
    image: "/images/iphone12.jpg"
  },

{
    id: 19,
    title: "Cafetera de Filtro Peabody",
    description: `Cafetera de filtro con capacidad de 1,5 L y jarra de vidrio.
Incluye filtro permanente lavable, luz indicadora, y función “Keep Warm” para mantener el café caliente.
Diseño moderno con detalles en acero inoxidable, tanque transparente con medidor de agua y sistema anti-goteo.`,
    price: 60000,
    image: "/images/cafepea.jpg"
  },


{
    id: 20,
    title: "Ventilador de Techo Telefunken",
    description: `Ventilador de techo con aspas retráctiles transparentes y diseño moderno.
Incluye control remoto, timer programable y 6 velocidades.
Ofrece función de recirculación de aire caliente en invierno, ideal para usar todo el año.
Silencioso, eficiente y elegante, brinda máximo confort con estilo.`,
    price: 150000,
    image: "/images/ventitecho.jpg"
  },

{
    id: 21,
    title: "Celular Galaxy A16 4G Blue Black",
    description: `Celular con pantalla Super AMOLED de 6,7" FHD+, que ofrece colores vibrantes y gran definición.
Incluye 128 GB de almacenamiento interno y 4 GB de RAM para un rendimiento ágil y fluido.`,
    price: 400000,
    image: "/images/samsunga16.jpg"
  },

  {
    id: 22,
    title: "Celular Motorola G15 4GB 128GB Gravity Grey",
    description: `Rendimiento fluido con 4 GB de RAM y 128 GB de almacenamiento.
Batería 5200 mAh para usarlo todo el día sin preocupaciones.
Cámara trasera 50 MP + 5 MP y frontal 8 MP para fotos y videos nítidos.
Pantalla 6,72" FHD+, ideal para redes, videos y contenido multimedia con excelente calidad.`,
    price: 340000,
    image: "/images/motorolag15.jpg"
  },

  {
    id: 23,
    title: "Celular ZTE Blade A35 64GB Black",
    description: `Batería 5000 mAh para usarlo todo el día.
Cámara trasera 8 MP + AI con flash y frontal 5 MP para selfies y videollamadas.
Pantalla IPS HD+ de 6,75", con colores nítidos y buenos ángulos de visión.
Incluye 2 GB RAM y 64 GB de almacenamiento, ampliables hasta 1 TB con tarjeta externa.`,
    price: 150000,
    image: "/images/ztea35.jpg"
  },

{
    id: 24,
    title: "Smart TV Samsung 50 LED Crystal UHD 4K ",
    description: `Imagen vibrante con PurColor y procesador Crystal 4K, que mejora colores y contenido hasta resolución 4K.
Sonido más inmersivo gracias a Q-Symphony, que combina TV + barra de sonido sin silenciar parlantes.
Diseño minimalista y prácticamente sin bordes, ideal para un hogar moderno.
Sistema Tizen OS con apps actualizadas, Samsung TV Plus, Gaming Hub, Daily+ y control de dispositivos inteligentes vía SmartThings.`,
    price: 690000,
    image: "/images/samsungDU7000.jpg"
  },

{
    id: 25,
    title: "Bicicleta Mtb Rydetech 300 Mountain Bike R29 21v Talle L Negro/Naranja ",
    description: `Bicicleta robusta y cómoda, con cuadro de acero hidroformado, horquilla con suspensión de 80 mm y llantas de aluminio doble pared.
Equipada con 21 velocidades, piñón SunRun y shifters integrados para cambios suaves.
Cuenta con frenos V-Brake, cubiertas Wanda 29x2.10, asiento MTB con cierre rápido y pedales Neco.
Ideal para aventuras urbanas y off-road, ofreciendo durabilidad, agarre y control en todo tipo de terrenos.`,
    price: 300000,
    image: "/images/bici.jpg"
  },

{
    id: 26,
    title: "Bicicleta Infantil Nathor R16 Apollo",
    description: `Bici rodado 16 con limitador de giro, asiento y manubrio regulables, y freno trasero con maneta amarilla para fácil identificación.
Incluye roditas laterales desmontables, neumáticos con cámara y frenos V-Brake reforzados.
Ideal para peques de 5 años en adelante (110–120 cm), soporta hasta 30 kg y pesa 9,5 kg.
Segura, resistente y perfecta para aprender a andar con confianza.`,
    price: 200000,
    image: "/images/bici1.jpg"
  },

{
    id: 27,
    title: "Auriculares Admiral AD-F9 Negro",
    description: `Auriculares Bluetooth 5.3 con conexión rápida y estable, diseño in-ear cómodo y liviano.
Ofrecen 5–6 horas de reproducción por carga y un estuche de 800 mAh que extiende la autonomía hasta 650 horas en espera.
Alcance de 10–20 metros, carga completa en 1–2 horas y excelente calidad de sonido gracias a su driver de 8 mm.`,
    price: 15000,
    image: "/images/auriadm.jpg"
  },

{
    id: 28,
    title: "Auricular Aiwa TWA-80B Blanco",
    description: `Auriculares in-ear Bluetooth con micrófono, control de volumen, control de canciones y touch multifunción.
Incluyen estuche de carga, cable USB-C y manual.
Modelo TWA-80B, origen China. Ideal para uso diario con conectividad inalámbrica cómoda y práctica.`,
    price: 20000,
    image: "/images/auriaiwa.jpg"
  },


{
    id: 29,
    title: "Aspiradora Trapeadora Robot Sansei Blanco",
    description: `Aspiradora robot 2 en 1 que aspira y trapea con depósito de polvo de 200 ml y tanque de agua de 230 ml.
Incluye filtro HEPA, ideal para reducir alérgenos, y batería de 2000 mAh con autonomía para limpiar hasta 120 m², volviendo sola a su base.
Ofrece 4 modos de limpieza (automático, espiral, esquinas y zig-zag), control remoto, motor de 1400 Pa, sensores anti choque/anti caída y ruedas que superan obstáculos de hasta 15 mm.
Perfecta para hogares con mascotas y múltiples superficies.`,
    price: 210000,
    image: "/images/aspisansei.jpg"
  },

{
    id: 30,
    title: "Pizarra Mágica 12 Color 3852",
    description: `Pizarra LCD multicolor de 12,5", ideal para escribir y dibujar sin tiza ni marcadores.
Permite borrar con un solo toque, es liviana y portátil.
Incluye batería de litio recargable para largas horas de uso.
Perfecta para notas rápidas, creatividad infantil o uso diario.`,
    price: 9000,
    image: "/images/pizzarra.jpg"
  },

 {
    id: 31,
    title: "Cuatriciclo a Batería Stark Naranja",
    description: `Cuatri a batería 6V con diseño realista, luces y sonidos.
Alcanza 3 km/h, soporta hasta 30 kg y ofrece 2 horas de uso aproximado.
Incluye marcha adelante y atrás, ruedas plásticas y baúl trasero para guardar juguetes.
Recomendado para peques de 2 a 4 años.
Medidas: 65 × 45 × 50 cm.`,
    price: 120000,
    image: "/images/cuatri.jpg"
  }, 

{
    id: 32,
    title: "Cuatriciclo a Batería Stark Blanco",
    description: `Cuatri a batería 6V con diseño realista, luces y sonidos.
Alcanza 3 km/h, soporta hasta 30 kg y ofrece 2 horas de uso aproximado.
Incluye marcha adelante y atrás, ruedas plásticas y baúl trasero para guardar juguetes.
Recomendado para peques de 2 a 4 años.
Medidas: 65 × 45 × 50 cm.`,
    price: 120000,
    image: "/images/cuatrib.jpg"
  }, 

{
    id: 33,
    title: "Mesa Didáctica Love Proyector de Unicornio",
    description: `Mesa didáctica con proyector de unicornio, ideal para dibujar y aprender jugando.
Incluye libro, 3 discos de proyección, 24 patrones, 12 lapiceras y paño de limpieza.
Funciona con 3 pilas AA (no incluidas).
No apta para menores de 3 años.`,
    price: 40000,
    image: "/images/mesauni.jpg"
  }, 

{
    id: 34,
    title: "Mesa Didáctica Love Proyector Dinosaurio",
    description: `Mesa didáctica con proyector de dinosaurio, perfecta para dibujar y estimular la creatividad.
Incluye libro, 3 discos de proyección, 24 patrones, 12 lapiceras y paño de limpieza.
Funciona con 3 pilas AA (no incluidas).
No apta para menores de 3 años.`,
    price: 40000,
    image: "/images/mesadino.jpg"
  }, 

{
    id: 35,
    title: "Lavasecarropas Philco 12/8KG Titanium Grey Carga Frontal Inverter Inox",
    description: `Lavasecarropas 2 en 1 con 12 kg de lavado y 8 kg de secado, ideal para ahorrar tiempo y espacio.
Incluye Motor Direct Drive Inverter (más silencioso, menos vibración, 5 años de garantía), lavado a vapor para higiene profunda y reducción de arrugas, y Tecnología One Touch que ajusta automáticamente agua y tiempos.
Cuenta con programa rápido de 15 minutos, diseño Slim Fit, alto rendimiento y cuidado de las prendas.
Garantía: 12 meses.`,
    price: 1000000,
    image: "/images/lavaseca.jpg"
  }, 

  {
    id: 36,
    title: "Inhalador Nebulizador De Malla Inalámbrico Portátil Ultrasónico",
    description: `Nebulizador portátil y ultrasónico, ideal para aliviar afecciones respiratorias con menor ruido y mayor eficacia.
Convierte el medicamento en vapor fino, permitiendo que llegue directo a las zonas afectadas.
Es liviano, silencioso y perfecto para niños y adultos.
Incluye boquilla, máscara para adultos, máscara para niños y cable USB. Ideal para reducir inflamación, mejorar la respiración y usar en cualquier lugar.`,
    price: 25000,
    image: "/images/nebu.jpg"
  }, 


{
    id: 37,
    title: "Vaporera Eléctrica 2 Niveles 14 Huevos",
    description: `Vaporera de 2 niveles con capacidad para 14 huevos y espacio para cocinar vegetales.
Incluye vaso medidor, plato de acero inoxidable y 2 repisas para huevos.
Ofrece un flujo de vapor constante y parejo, ideal para una cocción rápida, saludable y sin complicaciones.`,
    price: 43000,
    image: "/images/vaporera.jpg"
  }, 

{
    id: 38,
    title: "Reloj Retro",
    description: `Reloj estilo retro ochentoso con hora, alarma, cronómetro y luz.
Un clásico nostálgico para llevar en la muñeca todos los días.`,
    price: 20000,
    image: "/images/reloj.jpg"
  }, 

{
    id: 39,
    title: "Maquina Para Cortar Perfilar Cabello Vintage T9 Buda Dorado",
    description: `Cortadora inalámbrica ideal para perfilado y cortes precisos.
Incluye 4 peines, batería recargable y accesorios como cepillos y peine limpiador.
Apta para uso en casa o viaje, con diseño práctico y funcional para lograr el look que quieras.`,
    price: 25000,
    image: "/images/cortacabello.jpg"
  }, 

{
    id: 40,
    title: "Caja Impermeable Baño Celular Ducha 360 Grados Viral Tiktok",
    description: `Soporte resistente al agua, ideal para usar el celular en la ducha sin mojarlo.
Protege contra salpicaduras y vapor, y permite ver, escuchar o responder sin sacarlo del soporte.
Instalación simple y diseño práctico, perfecto para usar en el baño con total comodidad y seguridad.`,
    price: 22000,
    image: "/images/cajaducha.jpg"
  }, 

];

export default function Home() {
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
          <button className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-2 rounded-lg shadow-md transition">
            🚀 {t.cta}
          </button>
        </a>

        <ShippingCalculator lang={lang} />

        {/* 🛍️ Sección de productos */}
        <section
          id="productos"
          className="flex flex-wrap justify-center gap-8 mt-12"
        >
          {productos.length > 0 ? (
            productos.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id} // ✅ se pasa el id
                title={p.title}
                price={p.price}
                image={p.image}
                description={p.description}
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
