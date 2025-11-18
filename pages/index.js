// pages/index.js
"use client";
import { useState, useMemo } from "react";
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

    // 🔥 Amazon filters
    filters: "Filtros",
    search: "Buscar producto...",
    categories: "Categorías",
    priceRange: "Rango de precios",
    min: "Mínimo",
    max: "Máximo",
    orderBy: "Ordenar por",
    none: "Sin orden",
    asc: "Precio: menor a mayor",
    desc: "Precio: mayor a menor",
    clear: "Limpiar filtros",
  },
};

// 🟦 Añadimos categoría a tus productos para que puedan filtrarse
const productos = [
  { id: 1, title: "Headset Gamer Aimzone negro microfono desmontable",
    description: "Audio Premium: Drivers de 50 mm con sonido envolvente y cristalino. Micrófono: Desmontable y omnidireccional para comunicación clara. Comodidad: Diseño Over-Ear con orejeras de espuma viscoelástica para aislamiento de ruido. Compatibilidad: Universal (PC, Consolas) con doble interfaz USB + Jack 3.5 mm. Extras: Detalles LED y control de volumen integrado.",
    price: 25000, image: "/images/auriculares.jpg", category: "Audio" },

  { id: 2, title: "Notebook Celeron 14.1\" 4GB 128 GB SSD Philco N14P4020",
    description: "Rendimiento Rápido: Procesador Celeron, 4 GB de RAM y disco SSD de 128 GB. Autonomía: Batería de 5000 mAh para toda la jornada. Visualización: Pantalla LCD de 14.1'' con colores nítidos. Lista para usar: Incluye Windows 11 Home. Conectividad: Puertos USB y HDMI.",
    price: 350000, image: "/images/notebook.jpg", category: "Computación" },

  { id: 3, title: "Taladro Percutor 750w Daewoo DAID750BX",
    description: "Versátil: Ideal para perforar concreto, madera y metal con alta eficiencia. Control Total: Incluye mango lateral y tope de profundidad para perforaciones exactas. Mandril: 13 mm, compatible con amplia gama de brocas. Fácil de Usar: Diseño ergonómico y resistente.",
    price: 75000, image: "/images/taladro.jpg", category: "Herramientas" },

  { id: 4, title: "Smart TV Led 32 Philips",
    description: "Control por Voz: Compatible con Matter Smart Home, Alexa y Google. Sistema Operativo Titan OS: Plataforma Smart TV rápida con acceso a todas las apps de streaming. Sonido Dolby Audio: Audio claro y potente, ideal para diálogos, acción y música.",
    price: 300000, image: "/images/ledphilips.jpg", category: "TV" },

  { id: 5, title: "Freidora de Aire Peabody PE-AFW520N 5,2Lts",
    description: "Gran Capacidad: 5.2 Lts y 1500 W de potencia. Fácil de Usar: Panel LED touch con 8 programas preestablecidos y función manual. Control Visual: Ventana frontal y luz interna para monitorear la cocción. Funciones Extra: Precalentar y Mantener Caliente (hasta 1 hr). Limpieza Sencilla: Recipiente antiadherente y rejilla extraíble. Saludable: Cocción por convección (aire caliente) sin aceite.",
    price: 110000, image: "/images/freidorapeabody.jpg", category: "Cocina" },

  { id: 6, title: "Mopa Plana Trapeador Lampazo",
    description: "Limpieza Sencilla: Balde con doble ranura para enjuague y secado rápido. Uso Versátil: Ideal en húmedo (trapear) o seco (desempolvar) pisos, techos y ventanas. Diseño Inteligente: Botón de desagüe en el balde para vaciado fácil. Dimensiones: Bastón de 1.30 m de alto; Balde 36 cm x 19 cm x 21 cm.",
    price: 40000, image: "/images/mops.jpg", category: "Hogar" },

  { id: 7, title: "Termo Wanderlust Verde 1300ml",
    description: "Capacidad: 1.3 litros. Rendimiento: Mantiene la temperatura hasta por 12 horas. Material: Acero de alta calidad. Funcionalidad: Incluye tapón cebador y tapa multiuso (mate o vaso).",
    price: 47000, image: "/images/termo.jpg", category: "Hogar" },

  { id: 8, title: "Desmalezadora Motoguadaña Naftera 52cc",
    description: "Motor: 52 cc y 1650 W (6500 rpm) para cortes exigentes. Uso: Ideal para cortar malezas a ras del suelo y áreas de difícil acceso. Corte Versátil: Incluye cuchilla de 3 puntas (9 pulgadas) y cabezal porta tanza. Comodidad: Diseño ergonómico, manubrio tipo bicicleta y arnés doble reforzado. Transmisión: Eje recto con transmisión cardánica.",
    price: 145000, image: "/images/desmalezadora.jpg", category: "Herramientas" },

  { id: 9, title: "Aire Acondicionado Sansei Split",
    description: "Climatización Total: Frío/Calor con 2365 frigorías (2750 W frío / 2500 W calor). Eficiencia: Tecnología On-Off y Clase A de eficiencia energética. Silencioso: Nivel de ruido bajo (≤51 dB). Funciones: Incluye Temporizador y función Sueño. Refrigerante: Gas ecológico R410a. Garantía: 12 meses.",
    price: 750000, image: "/images/airesensei.jpg", category: "Climatización" },

  { id: 10, title: "Celular Tecno Spark 30C 128GB Orbit Black",
    description: "Desempeño: Procesador MediaTek Helio G81 con 4 GB de RAM. Almacenamiento: 256 GB internos. Pantalla: 6.67 pulgadas con tasa de refresco fluida (60 Hz a 120 Hz). Cámara: Principal de 50 MP y frontal de 8 MP. Batería: 5000 mAh con carga rápida de 18 W.",
    price: 220000, image: "/images/celutekno.jpg", category: "Celulares" },

  { id: 11, title: "Playstation 5 PS5 Digital Bundle",
    description: "Modelo: Diseño Slim, Edición Digital (sin discos). Rendimiento: SSD de 1 TB ultrarrápido. Paquete de Valor: Incluye 2 juegos completos (Gran Turismo 7 y ASTRO BOT). Control Inmersivo: DualSense con retroalimentación háptica. Compatibilidad: Juega más de 4000 títulos de PS4. Accesorios: Cable HDMI, cable de alimentación y pies de soporte.",
    price: 1550000, image: "/images/play5.jpg", category: "Consolas" },

  { id: 12, title: "Lavarropas Semiautomático 6 kg Wanke",
    description: "Capacidad y Carga: 6 kg, Carga Superior. Sistema de Lavado: Turbina potente y eficiente (200 W). Programas: 4 ciclos de lavado. Control: Temporizador incorporado. Flexibilidad: Uso con o sin pedestal. Medidas: 50 cm (Ancho) x 85.5 cm (Alto) x 61 cm (Profundidad).",
    price: 195000, image: "/images/lavafranke.jpg", category: "Lavarropas" },

  { id: 13, title: "Secadora Por Calor Kanjihome 4kg",
    description: "Capacidad: 4 kg. Rendimiento: Secado por calor con 1250 W de potencia. Programas: 3 ciclos de secado. Seguridad: Protección IPX4 (resistente a salpicaduras). Color: Blanco.",
    price: 300000, image: "/images/secakanji.jpg", category: "Secarropas" },

  { id: 14, title: "Lavarropas Philco 5.5 Kg",
    description: "Capacidad: 5.5 kg. Programas: 10 ciclos de lavado. Eficiencia: Clase A de eficiencia energética. Centrifugado: 750 RPM que deja la ropa casi seca. Sistema de Lavado: Oriental, efectivo y delicado. Diseño: Carga superior en color gris, compacto y moderno.",
    price: 345000, image: "/images/lavaphilco.jpg", category: "Lavarropas" },

  { id: 15, title: "Heladera Bajo Mesada Hisense 126L",
    description: "Capacidad: 126 litros, ideal como auxiliar o para cocinas pequeñas. Diseño: Negro, compacto y con puerta reversible. Características: Control mecánico, almacenamiento para botellas de 2 L, zona más fría y bajo ruido. Comodidad: Patas ajustables y luz interior. Garantía: 12 meses.",
    price: 360000, image: "/images/helahisense.jpg", category: "Heladeras" },

  { id: 16, title: "Heladera Cíclica Admiral 208 Lts",
    description: "Capacidad: 207 litros netos. Enfriamiento: Sistema cíclico que garantiza frescura constante. Organización: Estantes desmontables, cajón especial para frutas/verduras y anaqueles para botellas. Diseño: Elegante color blanco, ideal para cocinas u oficinas.",
    price: 450000, image: "/images/helaadmiral.jpg", category: "Heladeras" },

  { id: 17, title: "Celular Samsung Galaxy A06 128GB",
    description: "Rendimiento: Procesador MediaTek G85 y 4 GB de RAM. Almacenamiento: 128 GB internos (expandibles a 1 TB). Cámara Principal: 50 MP + 2 MP (dual trasera) y frontal de 8 MP. Batería: 5000 mAh con carga rápida de 25 W. Pantalla: 6.7 pulgadas con resolución HD+. Seguridad: Sensor de huellas dactilares lateral y Samsung Knox. Diseño: Elegante y delgado (8.0 mm).",
    price: 265000, image: "/images/samsunga06.jpg", category: "Celulares" },

  { id: 18, title: "iPhone 12 Mini 64GB reacondicionado",
    description: "Estado: Renovado Grado A (Excelentes condiciones, mínimas señales de uso). Compatibilidad: Totalmente desbloqueado (compatible con todas las redes GSM y CDMA). Almacenamiento: 64 GB. Batería: Capacidad garantizada mínimo del 80%. Qué incluye: Cable de carga genérico (certificado MFi). Activación: Inserte su SIM y active el servicio.",
    price: 470000, image: "/images/iphone12.jpg", category: "Celulares" },

  { id: 19, title: "Cafetera de Filtro Peabody",
    description: "Capacidad: 1.5 Litros (Jarra de vidrio y tanque de agua). Función: Mantener Caliente (Keep Warm). Comodidad: Filtro permanente, removible y lavable. Uso Fácil: Función anti-goteo, medidor de agua transparente y luz indicadora. Diseño: Moderno, con detalles en acero inoxidable.",
    price: 60000, image: "/images/cafepea.jpg", category: "Cocina" },

  { id: 20, title: "Ventilador de Techo Telefunken",
    description: "Aspas Retráctiles: Aspas transparentes y retráctiles (diseño discreto). Control Total: Incluye Control Remoto para manejar las 6 velocidades y el Timer. Modo Invierno: Función de recirculación de aire caliente. Versatilidad: Excelente distribución de aire en verano y recirculación en invierno.",
    price: 150000, image: "/images/ventitecho.jpg", category: "Climatización" },

  { id: 21, title: "Celular Samsung Galaxy A16 4G",
    description: "Pantalla Superior: Impresionante Super AMOLED de 6.7 pulgadas con resolución FHD+. Memoria y Rendimiento: 128 GB de almacenamiento interno y 4 GB de RAM.",
    price: 400000, image: "/images/samsunga16.jpg", category: "Celulares" },

  { id: 22, title: "Celular Motorola G15 4GB 128GB",
    description: "Rendimiento y Almacenamiento: 4 GB de RAM y 128 GB internos. Pantalla: 6.72'' con resolución FHD+ (1080 x 2400). Cámara Principal: Dual trasera de 50 MP + 5 MP; frontal de 8 MP. Batería: 5200 mAh para usarlo todo el día.",
    price: 340000, image: "/images/motorolag15.jpg", category: "Celulares" },

  { id: 23, title: "Celular ZTE Blade A35 64GB",
    description: "Almacenamiento: 64 GB internos (expandibles a 1 TB) y 2 GB de RAM. Pantalla: IPS de 6.75 pulgadas con resolución HD+. Batería: 5000 mAh para todo el día. Cámara: Trasera principal de 8 MP + AI y frontal de 5 MP.",
    price: 150000, image: "/images/ztea35.jpg", category: "Celulares" },

  { id: 24, title: "Smart TV Samsung 50” UHD 4K",
    description: "Imagen Superior: Pantalla 50 pulgadas con resolución UHD 4K. Tecnología de Color: PurColor y Procesador Crystal 4K. Sonido Inmersivo: Compatible con Q-Symphony. Smart TV: Samsung Tizen OS (con Samsung TV Plus, Gaming Hub y SmartThings). Diseño: Elegante, minimalista y con biseles delgados.",
    price: 695000, image: "/images/samsungDU7000.jpg", category: "TV" },

  { id: 25, title: "Bicicleta MTB Rydetech 300 R29",
    description: "Cuadro: Acero hidroformado robusto. Suspensión: Horquilla de 80 mm para absorber impactos. Ruedas: Llantas de aluminio doble pared con cubiertas Wanda Compass 29x2.10. Transmisión: 21 velocidades con shifters integrados. Frenos: V-Brake potentes. Comodidad: Manubrio doble altura, asiento MTB y portasilla con cierre rápido. Incluye pie de apoyo.",
    price: 300000, image: "/images/bici.jpg", category: "Bicicletas" },

  { id: 26, title: "Bicicleta Infantil Nathor R16",
    description: "Edad y Altura: Recomendada para niños de 5 años o más (110 cm a 120 cm). Seguridad: Limitador de giro de manubrio y rueditas laterales desmontables. Crecimiento: Asiento y manubrio regulables. Frenos: V-Brake con maneta intuitiva (amarilla). Estructura: Cuadro de acero al carbono. Peso Máximo Usuario: 30 kg.",
    price: 200000, image: "/images/bici1.jpg", category: "Bicicletas" },

  { id: 27, title: "Auriculares Admiral AD-F9 Negro",
    description: "Conexión: Bluetooth V5.3 (rápida y estable a 10m - 20m). Autonomía: Hasta 6 horas de uso continuo por carga. Estuche de Carga: 800 mAh, hasta 650 horas en espera. Audio: Drivers de 8 mm y diseño in-ear ergonómico. Carga Rápida: 1 a 2 horas.",
    price: 15000, image: "/images/auriadm.jpg", category: "Audio" },

  { id: 28, title: "Auricular Aiwa TWA-80B Blanco",
    description: "Conectividad: Bluetooth. Control: Micrófono y Touch multifunción para volumen y canciones. Comodidad: Diseño In-Ear. Accesorios: Estuche de carga y cable USB Tipo C.",
    price: 25000, image: "/images/auriaiwa.jpg", category: "Audio" },

  { id: 29, title: "Aspiradora Robot Sansei",
    description: "Doble Función: Aspira (1400 Pa) y trapea en simultáneo (depósito de polvo 200 ml y tanque de agua 230 ml). Filtro: HEPA para capturar alérgenos. Autonomía: Batería de 2000 mAh con 120 min de uso. Regresa automáticamente a la base. Navegación: 4 modos de limpieza y sensores anti-choque/anti-caída. Control: Remoto.",
    price: 210000, image: "/images/aspisansei.jpg", category: "Hogar" },

  { id: 30, title: "Pizarra Mágica 12\"",
    description: "Pantalla: LCD de 12.5 pulgadas multicolor. Fácil de Usar: Escribe, dibuja y borra con un toque (sin tiza ni marcadores). Portabilidad: Diseño compacto y ligero. Energía: Batería de litio recargable.",
    price: 9500, image: "/images/pizzarra.jpg", category: "Juguetes" },

  { id: 31, title: "Cuatriciclo Stark Naranja 6V",
    description: "Edad Recomendada: Niños de 2 a 4 años (capacidad máxima 30 kg). Rendimiento: Batería de 6 V, hasta 2 horas de uso y 3 Km/h. Funcionalidad: Marcha adelante y atrás, con sonidos y luces. Extras: Caja trasera para guardar juguetes. Dimensiones: 65 cm x 45 cm x 50 cm.",
    price: 120000, image: "/images/cuatri.jpg", category: "Juguetes" },

  { id: 32, title: "Cuatriciclo Stark Blanco 6V",
    description: "Edad Recomendada: 2 a 4 años (hasta 30 kg). Rendimiento: Batería de 6 V, ≈ 2 horas de uso y 3 Km/h. Funcionalidad: Marcha adelante y atrás, con sonidos y luces. Extras: Caja trasera para guardar juguetes. Medidas: 65 cm x 45 cm x 50 cm. Diseño realista y seguro.",
    price: 120000, image: "/images/cuatrib.jpg", category: "Juguetes" },

  { id: 33, title: "Mesa Didáctica Unicornio",
    description: "Función Principal: Mesa didáctica con proyector temático de Unicornio. Contenido: 1 libro, 24 patrones proyectables, 12 lapiceras y paño de limpieza. Edad Recomendada: 3 a 5 años. Alimentación: Requiere 3 pilas AA (no incluidas).",
    price: 40000, image: "/images/mesauni.jpg", category: "Juguetes" },

  { id: 34, title: "Mesa Didáctica Dinosaurio",
    description: "Función Principal: Mesa didáctica con proyector temático de Dinosaurio. Contenido: 1 libro, 24 patrones proyectables, 12 lapiceras y paño de limpieza. Edad Recomendada: 3 a 5 años. Alimentación: Requiere 3 pilas AA (no incluidas).",
    price: 40000, image: "/images/mesadino.jpg", category: "Juguetes" },

  { id: 35, title: "Lavasecarropas Philco 12/8KG",
    description: "Capacidad: 12 kg lavado / 8 kg secado. Motor Inverter: Direct Drive (silencioso, menor desgaste). Funciones Avanzadas: Lavado a Vapor (higieniza), One Touch (autoajuste de ciclo), Lavado Rápido (15 minutos). Rendimiento: 1400 RPM de centrifugado. Diseño: Carga Frontal, Titanium Grey. Dimensiones: 60 cm x 84.7 cm x 64 cm.",
    price: 1000000, image: "/images/lavaseca.jpg", category: "Lavarropas" },

  { id: 36, title: "Nebulizador Ultrasónico",
    description: "Tecnología: Ultrasónico (vapor fino para mayor eficacia). Ventajas: Liviano y silencioso, ideal para niños. Aplicación: Para afecciones respiratorias, reduce inflamación y facilita la respiración. Accesorios: Boquilla, máscaras para adultos/niños y cable USB.",
    price: 27000, image: "/images/nebu.jpg", category: "Salud" },

  { id: 37, title: "Vaporera Eléctrica 2 niveles",
    description: "Capacidad: 2 niveles, hasta 14 huevos y vegetales. Rendimiento: Flujo de vapor constante y estable. Accesorios: Vaso medidor, plato de acero inoxidable y 2 repisas para huevos.",
    price: 43000, image: "/images/vaporera.jpg", category: "Cocina" },

  { id: 38, title: "Reloj Retro",
    description: "Funciones: Hora, Alarma, Cronómetro y Luz. Estilo:Nostalgia de los 80.",
    price: 20000, image: "/images/reloj.jpg", category: "Accesorios" },

  { id: 39, title: "Máquina Cortapelo Vintage T9",
    description: "Funcionalidad: Cortadora y perfiladora de precisión. Inalámbrica y Portátil: Funciona con batería recargable, ideal para viaje. Accesorios: Incluye 4 peines guía y accesorios de limpieza. Modelo: T9 Buda.",
    price: 25000, image: "/images/cortacabello.jpg", category: "Belleza" },

  { id: 40, title: "Caja Impermeable Baño Celular",
    description: "Uso: Soporte diseñado para mantener tu teléfono seguro y seco en la ducha/baño. Material: Resistente al agua y al vapor. Funcionalidad: Permite escuchar música o ver videos sin riesgo. Instalación: Fácil y práctica.",
    price: 22000, image: "/images/cajaducha.jpg", category: "Hogar" },

  { id: 41, title: "Lámpara De Medusas Led Rgb Nocturna Flotante Recargable Usb Rgb",
    description: "Diseño Único: Medusa suspendida en base acrílica. Ambiente: Luz suave y relajante, ideal para decorar. Estilo: Combina arte y funcionalidad, con toque moderno.",
    price: 25000, image: "/images/medusa.jpg", category: "Hogar" },

  { id: 42, title: "Mini Pistola Masajeadora Lesiones Musculares Rehabilitación",
    description: "Uso: Terapia de vibración profunda (rehabilitación/dolor muscular). Rendimiento: Hasta 2500 RPM. Ajustes: 3 velocidades. Batería: 800 mAh, 60 minutos de uso con 2 horas de carga. Portabilidad: Ultra pequeña y ligera. Incluye: 1 cabeza de masaje y Cable USB.",
    price: 25000, image: "/images/masaje.jpg", category: "Hogar" },

  { id: 43, title: "Trapeador Escurridor Ajustable Mopa Esponja Hogar Compacta",
    description: "Funcionalidad: Sistema de escurrido manual que elimina el exceso de agua fácilmente. Beneficio: Deja el piso seco y limpio rápidamente. Comodidad: Diseño ergonómico y duradero para uso diario.",
    price: 40000, image: "/images/trapeaescurri.jpg", category: "Hogar" },

  { id: 44, title: "Organizador De Remeras Y Ropa Premium Rigido",
    description: "Función: Diseñado para clasificar remeras/ropa de manera eficiente, manteniéndolas a la vista. Beneficio: Ahorra tiempo y optimiza el espacio en armarios/cajones. Calidad: Materiales rígidos y duraderos. Nota: Color sujeto a disponibilidad.",
    price: 4000, image: "/images/organiza.jpg", category: "Hogar" },

  { id: 45, title: "Aire Acondicionado Inverter Admiral",
    description: "Tecnología Clave: Inverter (ahorro de energía y bajo ruido). Capacidad: Frío/Calor. Potencia de 2300 frigorías (2700 W). Funciones: Control Remoto, Deflectores Móviles, Timer y funciones Automática/Ventilación. Beneficio: Enfría o calienta rápido. Dimensiones (Int.): 72.9 cm x 29.2 cm x 20 cm.",
    price: 700000, image: "/images/aireadmiral.jpg", category: "Climatización" },

  { id: 46, title: "Ventilador Kanjihome 18 Kjh-fh1311 De Pie",
    description: "Tipo: De Pie, con altura regulable (1.50 m). Rendimiento: 18 pulgadas (45.72 cm) y 90 W. Aspas: 3 aspas de metal. Control: 3 niveles de intensidad. Color: Negro.",
    price: 70000, image: "/images/ventitele.jpg", category: "Climatización" },

  { id: 47, title: "Ventilador de Pie Admiral",
    description: "Tipo: De Pie, con barral telescópico metálico. Diámetro y Potencia: 18 pulgadas y 75 watts. Aspas: Metálicas. Control: 3 velocidades ajustables. Funcionalidad: Cabezal oscilante y regulable. Color: Negro.",
    price: 75000, image: "/images/ventiadmiral.jpg", category: "Climatización" },

  { id: 48, title: "Ventilador de Pie-Turbo-Pared Ken Brown",
    description: "Funcionalidad: Modelo 3 en 1 (Pie, Turbo/Piso, Pared), Potencia: 100 Watts con motor de alta revolución, 100% bobinado en cobre. Aspas: 5 aspas metálicas para máximo caudal de aire. Movimiento: Oscilatorio y 3 velocidades ajustables.Base volante para gran estabilidad. Altura regulable hasta 1.7 metros. Diámetro: 21 pulgadas. Origen: China.",
    price: 105000, image: "/images/ventiken.jpg", category: "Climatización" },


];


// --------------------------------------------

export default function Home() {
  const [lang, setLang] = useState("es");
  const t = texts[lang];

  // 🟧 ESTADOS DE FILTRO
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [sort, setSort] = useState("none");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 🟦 Categorías automáticas en base a tus productos
  const categories = ["Todas", ...new Set(productos.map((p) => p.category))];

  // 🧠 FILTRADO TOTAL TIPO AMAZON
  const productosFiltrados = useMemo(() => {
    let result = [...productos];

    // 🔍 búsqueda
    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🏷 categoría
    if (selectedCategory !== "Todas") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 💰 precios
    if (minPrice !== "") result = result.filter((p) => p.price >= Number(minPrice));
    if (maxPrice !== "") result = result.filter((p) => p.price <= Number(maxPrice));

    // ↕ ordenamiento
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [search, selectedCategory, sort, minPrice, maxPrice]);

  // 🔄 reset
  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("Todas");
    setSort("none");
    setMinPrice("");
    setMaxPrice("");
  };

  // --------------------------------------------

  return (
    <div>
      <Navbar lang={lang} onChangeLang={setLang} />

      <main className="min-h-screen px-6 md:px-12 pt-12">

        {/* TITULO */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand text-center">
          {t.heroTitle}
        </h1>

        <p className="text-light/80 text-center max-w-2xl mx-auto">
          {t.heroSubtitle1}<br />{t.heroSubtitle2}
        </p>

        <ShippingCalculator lang={lang} />

        {/* LAYOUT AMAZON: SIDEBAR + PRODUCTOS */}
        <div className="flex mt-12 gap-10">

          {/* 🟪 SIDEBAR AMAZON */}
          <aside className="w-64 bg-dark/40 border border-cyan-700/20 rounded-xl p-5 h-fit sticky top-20">
            <h3 className="text-cyan-400 font-semibold text-lg mb-4">{t.filters}</h3>

            {/* 🔍 BUSQUEDA */}
            <input
              type="text"
              placeholder={t.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-dark/60 border border-cyan-700/30 text-white px-3 py-2 rounded-lg mb-4"
            />

            {/* CATEGORIAS */}
            <label className="text-light text-sm">{t.categories}</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-dark/60 border border-cyan-700/30 text-white px-3 py-2 rounded-lg mb-4"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            {/* RANGO DE PRECIOS */}
            <label className="text-light text-sm">{t.priceRange}</label>
            <div className="flex gap-2 mb-4">
              <input
                type="number"
                placeholder={t.min}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 bg-dark/60 border border-cyan-700/30 text-white px-3 py-2 rounded-lg"
              />
              <input
                type="number"
                placeholder={t.max}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 bg-dark/60 border border-cyan-700/30 text-white px-3 py-2 rounded-lg"
              />
            </div>

            {/* ORDEN */}
            <label className="text-light text-sm">{t.orderBy}</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full bg-dark/60 border border-cyan-700/30 text-white px-3 py-2 rounded-lg mb-4"
            >
              <option value="none">{t.none}</option>
              <option value="price-asc">{t.asc}</option>
              <option value="price-desc">{t.desc}</option>
            </select>

            {/* LIMPIAR */}
            <button
              onClick={resetFilters}
              className="w-full mt-2 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg"
            >
              {t.clear}
            </button>
          </aside>

          {/* 🟦 PRODUCTOS */}
          <section id="productos" className="flex flex-wrap justify-center gap-8 flex-1">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  price={p.price}
                  image={p.image}
                  description={p.description}
                  lang={lang}
                />
              ))
            ) : (
              <p className="text-gray-400 text-lg">No se encontraron productos</p>
            )}
          </section>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
