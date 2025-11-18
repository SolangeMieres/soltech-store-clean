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
    description: "Audio Premium: Drivers de $50\text{ mm}$ con sonido envolvente y cristalino.Micrófono: Desmontable y omnidireccional, para comunicación clara en juegos o llamadas.Comodidad: Diseño Over-Ear con orejeras de espuma viscoelástica para aislamiento de ruido y diadema ajustable.Compatibilidad: Universal (PC, Laptop, Xbox, Switch, PS) con doble interfaz USB + Jack $3.5\text{ mm}$.Extras: Detalles LED y control de volumen integrado.",
    price: 25000, image: "/images/auriculares.jpg", category: "Audio" },

  { id: 2, title: "Notebook Celeron 14.1\" 4GB 128 GB SSD Philco N14P4020",
    description: `Rendimiento Rápido: Procesador Celeron, $4\text{ GB}$ de RAM y disco SSD de $128\text{ GB}$ para inicio rápido y fluidez en tareas diarias.Autonomía: Potente batería de $5000\text{ mAh}$ para acompañarte toda la jornada.Visualización: Pantalla LCD de $14.1''$ con colores nítidos.Lista para usar: Incluye sistema operativo Windows 11 Home.Conectividad: Puertos USB y HDMI para periféricos y pantallas externas.`,
    price: 350000, image: "/images/notebook.jpg", category: "Computación" },

  { id: 3, title: "Taladro Percutor 750w Daewoo DAID750BX",
    description: `Versátil: Ideal para perforar concreto, madera y metal con alta eficiencia.Control Total: Incluye mango lateral para mayor estabilidad y un tope de profundidad para perforaciones exactas.Mandril de $13\text{ mm}$: Compatible con una amplia gama de brocas.Fácil de Usar: Diseño ergonómico y resistente.`,
    price: 75000, image: "/images/taladro.jpg", category: "Herramientas" },

  { id: 4, title: "Smart TV Led 32 Philips",
    description: `Control por Voz: Compatible con Matter Smart Home, Alexa y Google para controlar la TV, buscar contenido y recibir recomendaciones usando solo tu voz.

Sistema Operativo Titan OS: Plataforma Smart TV rápida que te da acceso fácil a todas las apps de streaming favoritas y a todo tu contenido.

Sonido Dolby Audio: Disfrutá de un audio claro y potente, ideal para diálogos, películas de acción y música.`,
    price: 300000, image: "/images/ledphilips.jpg", category: "TV" },

  { id: 5, title: "Freidora de Aire Peabody PE-AFW520N 5,2Lts",
    description: `Gran Capacidad: $5.2\text{ Lts}$ y $1500\text{ W}$ de potencia.Fácil de Usar: Panel LED touch con 8 programas preestablecidos (Papas, Carnes, Pescados, Vegetales, etc.) más función manual.Control Visual: Cuenta con ventana frontal y luz interna para monitorear la cocción sin abrir el cajón.Funciones Extra: Incluye Precalentar y Mantener Caliente (hasta $1\text{ hr}$).Limpieza Sencilla: Recipiente antiadherente y rejilla extraíble.Saludable: Cocción por convección (aire caliente) sin humo ni olor.`,
    price: 110000, image: "/images/freidorapeabody.jpg", category: "Cocina" },

  { id: 6, title: "Mopa Plana Trapeador Lampazo",
    description: `Mopa con balde…Limpieza Sencilla: Balde con doble ranura para enjuague y secado rápido sin cambiar la almohadilla.Uso Versátil: Ideal para uso en húmedo (trapear) o seco (desempolvar) pisos, techos y ventanas.Diseño Inteligente: Incluye botón de desagüe en el balde para vaciado fácil.Dimensiones: Bastón de $1.30\text{ m}$ de alto; Balde $36\text{ cm}$ x $19\text{ cm}$ x $21\text{ cm}$.`,
    price: 40000, image: "/images/mops.jpg", category: "Hogar" },

  { id: 7, title: "Termo Wanderlust Verde 1300ml",
    description: `Capacidad: $1.3\text{ litros}$.Rendimiento: Mantiene la temperatura hasta por $12\text{ horas}$.Material: Fabricado en acero de alta calidad.Funcionalidad: Incluye tapón cebador y tapa multiuso (sirve como mate o vaso).`,
    price: 47000, image: "/images/termo.jpg", category: "Hogar" },

  { id: 8, title: "Desmalezadora Motoguadaña Naftera 52cc",
    description: `Motor: $52\text{ cc}$ y $1650\text{ W}$ ($6500\text{ rpm}$) para cortes exigentes.Uso: Ideal para cortar malezas a ras del suelo, bordes y áreas de difícil acceso donde la cortadora no llega.Corte Versátil: Incluye cuchilla de 3 puntas ($9\text{ pulgadas}$) y cabezal porta tanza de doble salida.Comodidad: Diseño ergonómico, manubrio tipo bicicleta y arnés doble reforzado.Transmisión: Eje recto con transmisión cardánica.`,
    price: 145000, image: "/images/desmalezadora.jpg", category: "Herramientas" },

  { id: 9, title: "Aire Acondicionado Sansei Split",
    description: `Climatización Total: Funcionamiento Frío/Calor con $2365\text{ frigorías}$ ($2750\text{W}$ frío / $2500\text{W}$ calor).Eficiencia: Tecnología On-Off y Clase A de eficiencia energética para bajo consumo.Silencioso: Nivel de ruido bajo ($\le51\text{ dB}$), ideal para el descanso.Funciones: Incluye Temporizador y función Sueño.Refrigerante: Utiliza gas ecológico R410a.Garantía: $12\text{ meses}$.`,
    price: 750000, image: "/images/airesensei.jpg", category: "Climatización" },

  { id: 10, title: "Celular Tecno Spark 30C 128GB Orbit Black",
    description: `Desempeño: Procesador MediaTek Helio G81 con $4\text{ GB}$ de RAM, ideal para multitarea y juegos.Almacenamiento: Amplios $256\text{ GB}$ internos para todas tus apps y archivos.Pantalla: $6.67\text{ pulgadas}$ con tasa de refresco fluida ($60\text{ Hz}$ a $120\text{ Hz}$).Cámara: Principal de $50\text{ MP}$ y frontal de $8\text{ MP}$ para fotos nítidas.Batería: Larga duración ($5000\text{ mAh}$) con carga rápida de $18\text{ W}$.`,
    price: 220000, image: "/images/celutekno.jpg", category: "Celulares" },

  { id: 11, title: "Playstation 5 PS5 Digital Bundle",
    description: `Modelo: Diseño Slim, elegante y compacto. Edición Digital (no usa discos físicos).Rendimiento: Equipada con SSD de $1\text{ TB}$ ultrarrápido para carga casi instantánea.Paquete de Valor: Incluye 2 juegos completos (Gran Turismo 7 y ASTRO BOT).Control Inmersivo: Viene con Control Inalámbrico DualSense con retroalimentación háptica y gatillos adaptativos.Compatibilidad: Juega más de $4000$ títulos de PS4 (con Game Boost para mejor rendimiento).Accesorios: Incluye cable HDMI, cable de alimentación y pies de soporte.`,
    price: 1550000, image: "/images/play5.jpg", category: "Consolas" },

  { id: 12, title: "Lavarropas Semiautomático 6 kg Wanke",
    description: `Capacidad y Carga: $6\text{ kg}$, Carga Superior.Sistema de Lavado: Turbina potente y eficiente ($200\text{ W}$).Programas: 4 ciclos de lavado adaptables a diferentes prendas.Control: Temporizador incorporado para decidir la duración del ciclo.Flexibilidad: Diseño versátil para uso con o sin pedestal.Medidas: $50\text{ cm}$ (Ancho) $\times$ $85.5\text{ cm}$ (Alto) $\times$ $61\text{ cm}$ (Profundidad).`,
    price: 195000, image: "/images/lavafranke.jpg", category: "Lavarropas" },

  { id: 13, title: "Secadora Por Calor Kanjihome 4kg",
    description: `Capacidad: $4\text{ kg}$.Rendimiento: Secado por calor con $1250\text{ W}$ de potencia.Programas: 3 ciclos de secado adaptables a tus necesidades.Seguridad: Protección IPX4 (resistente a salpicaduras de agua).Color: Blanco.`,
    price: 300000, image: "/images/secakanji.jpg", category: "Secarropas" },

  { id: 14, title: "Lavarropas Philco 5.5 Kg",
    description: `Capacidad: $5.5\text{ kg}$.Programas: 10 ciclos de lavado para todo tipo de prendas.Eficiencia: Clase A de eficiencia energética para un bajo consumo.Centrifugado: $750\text{ RPM}$ que deja la ropa casi seca.Sistema de Lavado: Oriental, efectivo y delicado.Diseño: Carga superior en color gris, compacto y moderno.`,
    price: 345000, image: "/images/lavaphilco.jpg", category: "Lavarropas" },

  { id: 15, title: "Heladera Bajo Mesada Hisense 126L",
    description: `Capacidad: $126\text{ litros}$, perfecta como heladera auxiliar o para cocinas pequeñas.Diseño: Color negro, compacto y con puerta reversible para adaptarse a cualquier ambiente.Características: Control mecánico, almacenamiento para botellas de $2\text{ L}$, zona más fría y bajo nivel de ruido.Comodidad: Patas ajustables y luz interior.Garantía: $12\text{ meses}$.`,
    price: 360000, image: "/images/helahisense.jpg", category: "Heladeras" },

  { id: 16, title: "Heladera Cíclica Admiral 208 Lts",
    description: `Capacidad: $207\text{ litros}$ netos.Enfriamiento: Sistema cíclico que garantiza frescura constante y rendimiento eficiente.Organización: Incluye estantes desmontables, un cajón especial para frutas y verduras, y anaqueles para botellas.Diseño: Elegante color blanco, ideal para cocinas, habitaciones u oficinas.`,
    price: 450000, image: "/images/helaadmiral.jpg", category: "Heladeras" },

  { id: 17, title: "Celular Samsung Galaxy A06 128GB",
    description: `Rendimiento: Procesador MediaTek G85 y $4\text{ GB}$ de RAM para fluidez en juegos y redes.Almacenamiento: $128\text{ GB}$ internos (expandibles con MicroSD de hasta $1\text{ TB}$).Cámara Principal: $50\text{ MP}$ + $2\text{ MP}$ (dual trasera) y frontal de $8\text{ MP}$.Batería: Larga duración ($5000\text{ mAh}$) con carga rápida de $25\text{ W}$.Pantalla: $6.7\text{ pulgadas}$ con resolución HD+ (imágenes nítidas).Seguridad: Sensor de huellas dactilares lateral y protección Samsung Knox.Diseño: Elegante, sofisticado y delgado ($8.0\text{ mm}$).`,
    price: 265000, image: "/images/samsunga06.jpg", category: "Celulares" },

  { id: 18, title: "iPhone 12 Mini 64GB reacondicionado",
    description: `Estado: Renovado Grado A (Excelentes condiciones, mínimas señales de uso).Compatibilidad: Totalmente desbloqueado (compatible con todas las redes GSM y CDMA: AT&T, T-Mobile, Verizon, etc.).Almacenamiento: $64\text{ GB}$.Batería: Capacidad garantizada mínimo del $80\%$.Qué incluye: Cable de carga genérico (certificado MFi).Activación: Inserte su SIM y siga las instrucciones en pantalla para activar el servicio.`,
    price: 470000, image: "/images/iphone12.jpg", category: "Celulares" },

  { id: 19, title: "Cafetera de Filtro Peabody",
    description: `Capacidad: $1.5\text{ Litros}$ (Jarra de vidrio y tanque de agua).Función Mantener Caliente (Keep Warm): Mantiene el café a la temperatura ideal por más tiempo.Comodidad: Filtro permanente, removible y lavable (no requiere filtros de papel).Uso Fácil: Función anti-goteo, medidor de agua transparente y luz indicadora de encendido.Diseño: Moderno, con detalles decorativos en acero inoxidable.`,
    price: 60000, image: "/images/cafepea.jpg", category: "Cocina" },

  { id: 20, title: "Ventilador de Techo Telefunken",
    description: `Aspas Retráctiles: Aspas transparentes y retráctiles que ofrecen un diseño discreto cuando está apagado.

Control Total: Incluye Control Remoto para manejar las 6 velocidades y el Timer programable.

Modo Invierno: Posee función de recirculación de aire caliente para optimizar la calefacción en invierno.

Versatilidad: Excelente distribución de aire en verano y recirculación eficiente en invierno.`,
    price: 150000, image: "/images/ventitecho.jpg", category: "Climatización" },

  { id: 21, title: "Celular Samsung Galaxy A16 4G",
    description: `Pantalla Superior: Impresionante Super AMOLED de $6.7\text{ pulgadas}$ con resolución FHD+ para una calidad visual increíble.Memoria y Rendimiento: $128\text{ GB}$ de almacenamiento interno y $4\text{ GB}$ de RAM para un uso fluido y eficiente.`,
    price: 400000, image: "/images/samsunga16.jpg", category: "Celulares" },

  { id: 22, title: "Celular Motorola G15 4GB 128GB",
    description: `Rendimiento y Almacenamiento: $4\text{ GB}$ de RAM y $128\text{ GB}$ internos para un uso rápido y eficiente.Pantalla: Amplia pantalla de $6.72''$ con resolución FHD+ ($1080 \times 2400$) para calidad de imagen superior.Cámara Principal: Dual trasera de $50\text{ MP}$ $+ 5\text{ MP}$. Cámara frontal de $8\text{ MP}$ para selfies.Batería: Larga duración con $5200\text{ mAh}$ para usarlo todo el día.`,
    price: 340000, image: "/images/motorolag15.jpg", category: "Celulares" },

  { id: 23, title: "Celular ZTE Blade A35 64GB",
    description: `Almacenamiento: $64\text{ GB}$ internos (expandibles hasta $1\text{ TB}$) y $2\text{ GB}$ de RAM.Pantalla: Amplia pantalla IPS de $6.75\text{ pulgadas}$ con resolución HD+ (gran nitidez y amplios ángulos de visión).Batería: Larga duración con $5000\text{ mAh}$ para todo el día.Cámara: Trasera principal de $8\text{ MP}$ + AI y frontal de $5\text{ MP}$ para selfies.`,
    price: 150000, image: "/images/ztea35.jpg", category: "Celulares" },

  { id: 24, title: "Smart TV Samsung 50” UHD 4K",
    description: `Imagen Superior: Pantalla $50\text{ pulgadas}$ con resolución UHD 4K.Tecnología de Color: PurColor y Procesador Crystal 4K que optimizan la imagen para colores vibrantes y escalado de contenido a $4\text{ K}$.Sonido Inmersivo: Compatible con Q-Symphony para que los altavoces de la TV y la barra de sonido trabajen juntos.Smart TV: Funciona con Samsung Tizen OS (acceso a Samsung TV Plus, Gaming Hub y control de dispositivos con SmartThings).Diseño: Elegante, minimalista y con biseles delgados.`,
    price: 695000, image: "/images/samsungDU7000.jpg", category: "TV" },

  { id: 25, title: "Bicicleta MTB Rydetech 300 R29",
    description: `Cuadro y Diseño: Acero hidroformado robusto con diseño ergonómico. Incluye pie de apoyo.Suspensión: Horquilla con suspensión de $80\text{ mm}$ para absorber impactos en terrenos irregulares.Ruedas: Llantas de aluminio de doble pared (resistentes) con cubiertas Wanda Compass $29\times2.10$ de gran agarre.Transmisión: $21\text{ velocidades}$ con piñón SunRun $7\text{ V}$ y shifters integrados para cambios suaves y versátiles.Frenos: Potentes frenos V-Brake de fácil mantenimiento.Comodidad: Manubrio de doble altura, asiento MTB y portasilla con cierre rápido.`,
    price: 300000, image: "/images/bici.jpg", category: "Bicicletas" },

  { id: 26, title: "Bicicleta Infantil Nathor R16",
    description: `Edad y Altura: Recomendada para niños de $5$ años o más ($110\text{ cm}$ a $120\text{ cm}$ de altura).Seguridad: Incluye limitador de giro del manubrio (evita accidentes) y rueditas laterales desmontables para ayudar con el equilibrio.Crecimiento: Asiento y manubrio regulables para adaptarse a la postura correcta del niño.Frenos: Potentes frenos V-Brake con maneta de identificación intuitiva (color amarillo).Estructura: Cuadro resistente de acero al carbono.Peso Máximo Usuario: $30\text{ kg}$.`,
    price: 200000, image: "/images/bici1.jpg", category: "Bicicletas" },

  { id: 27, title: "Auriculares Admiral AD-F9 Negro",
    description: `Conexión: Tecnología Bluetooth V5.3 para un enlace rápido y estable a $10\text{m}$ - $20\text{m}$.Autonomía: Hasta $6\text{ horas}$ de uso continuo (música o llamadas) por carga.Estuche de Carga: El estuche ($800\text{ mAh}$) proporciona energía adicional para hasta $650\text{ horas}$ en espera.Audio: Drivers de $8\text{ mm}$ y diseño in-ear ergonómico.Carga Rápida: Tiempo de carga de $1\text{ a }2\text{ horas}$.`,
    price: 15000, image: "/images/auriadm.jpg", category: "Audio" },

  { id: 28, title: "Auricular Aiwa TWA-80B Blanco",
    description: `Conectividad: Bluetooth (Inalámbrica).

Control: Incluye Micrófono y Touch multifunción para control de volumen y canciones.

Comodidad: Diseño In-Ear.

Accesorios: Se cargan mediante cable USB Tipo C e incluyen su estuche de carga.`,
    price: 25000, image: "/images/auriaiwa.jpg", category: "Audio" },

  { id: 29, title: "Aspiradora Robot Sansei",
    description: `Doble Función: Aspira con potencia de $1400\text{ Pa}$ y trapea en simultáneo (depósito de polvo $200\text{ ml}$ y tanque de agua $230\text{ ml}$).Filtro: Incluye Filtro HEPA para capturar alérgenos y mejorar la calidad del aire.Autonomía: Batería de $2000\text{ mAh}$ con $120\text{ min}$ de autonomía. Regresa automáticamente a su base de carga.Navegación: 4 modos de limpieza (Auto, Espiral, Esquinas, Zig-Zag) y sensores anti-choque/anti-caída.Control: Se maneja fácilmente mediante Control Remoto.`,
    price: 210000, image: "/images/aspisansei.jpg", category: "Hogar" },

  { id: 30, title: "Pizarra Mágica 12\"",
    description: `Pantalla: LCD de $12.5\text{ pulgadas}$ multicolor para escritura y dibujo a mano.Fácil de Usar: Escribe o dibuja y borra con solo tocar un botón (similar a una pizarra, sin tiza ni marcadores).Portabilidad: Diseño compacto y ligero, perfecto para llevar a cualquier parte.Energía: Batería de litio recargable para largas horas de uso (no requiere pilas).`,
    price: 9500, image: "/images/pizzarra.jpg", category: "Juguetes" },

  { id: 31, title: "Cuatriciclo Stark Naranja 6V",
    description: `Edad Recomendada: Niños de $2\text{ a }4\text{ años}$ (capacidad máxima de $30\text{ kg}$).Rendimiento: Funciona con batería de $6\text{ V}$; ofrece hasta $2\text{ horas}$ de uso y alcanza $3\text{ Km/h}$.Funcionalidad: Marcha adelante y atrás, con sonidos y luces.Extras: Incluye caja trasera para guardar juguetes.Dimensiones: $65\text{ cm}$ (largo) $\times$ $45\text{ cm}$ (ancho) $\times$ $50\text{ cm}$ (alto).`,
    price: 120000, image: "/images/cuatri.jpg", category: "Juguetes" },

  { id: 32, title: "Cuatriciclo Stark Blanco 6V",
    description: `Diseño realista y seguro para niños de $2\text{ a }4\text{ años}$.Edad Recomendada: Ideal para $2\text{ a }4\text{ años}$ (hasta $30\text{ kg}$).Rendimiento: Batería de $6\text{ V}$ que ofrece $\approx 2\text{ horas}$ de uso y $3\text{ Km/h}$ de velocidad.Funcionalidad: Marcha adelante y atrás, con sonidos y luces.Extras: Incluye caja trasera para guardar juguetes.Medidas: $65\text{ cm} \times 45\text{ cm} \times 50\text{ cm}$.`,
    price: 120000, image: "/images/cuatrib.jpg", category: "Juguetes" },

  { id: 33, title: "Mesa Didáctica Unicornio",
    description: `Función Principal: Mesa didáctica con proyector temático de Unicornio.Contenido: Incluye 1 libro, $24$ patrones proyectables, $12$ lapiceras y paño de limpieza.Edad Recomendada: $3\text{ a }5\text{ años}$.Alimentación: Requiere $3\text{ pilas AA}$ (no incluidas).`,
    price: 40000, image: "/images/mesauni.jpg", category: "Juguetes" },

  { id: 34, title: "Mesa Didáctica Dinosaurio",
    description: `Función Principal: Mesa didáctica con proyector temático de Dinosaurio.Contenido Completo: Incluye 1 libro, $24$ patrones proyectables, $12$ lapiceras y paño de limpieza.Edad Recomendada: $3\text{ a }5\text{ años}$.Alimentación: Requiere $3\text{ pilas AA}$ (no incluidas).`,
    price: 40000, image: "/images/mesadino.jpg", category: "Juguetes" },

  { id: 35, title: "Lavasecarropas Philco 12/8KG",
    description: `Capacidad: Extra grande ($12\text{ kg}$ lavado / $8\text{ kg}$ secado), ideal para reducir lavados.Motor Inverter: Tecnología Direct Drive Inverter (sin correa) que reduce ruido, vibraciones y desgaste.Funciones Avanzadas:Lavado a Vapor: Higieniza, elimina alérgenos y reduce arrugas.One Touch: Detecta automáticamente la carga y ajusta el ciclo con un solo botón.Lavado Rápido: Limpieza completa en solo $15\text{ minutos}$.Rendimiento: $1400\text{ RPM}$ de centrifugado.Diseño: Carga Frontal, color Titanium Grey y tambor de acero inoxidable.Dimensiones: $60\text{ cm}$ (ancho) $\times$ $84.7\text{ cm}$ (alto) $\times$ $64\text{ cm}$ (profundidad).`,
    price: 1000000, image: "/images/lavaseca.jpg", category: "Lavarropas" },

  { id: 36, title: "Nebulizador Ultrasónico",
    description: `Tecnología: Ultrasónico, convierte el medicamento líquido en vapor fino para máxima eficacia y menos efectos secundarios.

Ventajas Clave: Es liviano y silencioso, ideal para usar con niños o personas sensibles al ruido.

Aplicación: Excelente para reducir la inflamación de la garganta, facilitar la respiración y tratar afecciones respiratorias.

Accesorios: Incluye boquilla, máscaras para adultos y niños, y cable USB.`,
    price: 27000, image: "/images/nebu.jpg", category: "Salud" },

  { id: 37, title: "Vaporera Eléctrica 2 niveles",
    description: `Capacidad: $2\text{ niveles}$ para hasta $14\text{ huevos}$ y una variedad de vegetales.Rendimiento: Genera un flujo de vapor y calor constante y estable para una cocción uniforme.Accesorios: Incluye vaso medidor, plato de acero inoxidable y $2\text{ repisas}$ para huevos (permite cocinarlos de diferentes maneras).`,
    price: 43000, image: "/images/vaporera.jpg", category: "Cocina" },

  { id: 38, title: "Reloj Retro",
    description: `Funciones: Hora, Alarma, Cronómetro y Luz.`,
    price: 20000, image: "/images/reloj.jpg", category: "Accesorios" },

  { id: 39, title: "Máquina Cortapelo Vintage T9",
    description: `Funcionalidad: Cortadora y perfiladora de precisión.Inalámbrica y Portátil: Funciona con batería recargable, ideal para viaje.Accesorios: Incluye $4\text{ peines guía}$ para diferentes largos y accesorios de limpieza.Modelo: T9 Buda.`,
    price: 25000, image: "/images/cortacabello.jpg", category: "Belleza" },

  { id: 40, title: "Caja Impermeable Baño Celular",
    description: `Uso: Diseñado para mantener tu teléfono seguro y seco en ambientes húmedos (ducha, baño).
Material: Fabricado con materiales resistentes al agua y al vapor.
Funcionalidad: Permite escuchar música, ver videos o responder llamadas sin riesgo.
Instalación: Diseño práctico y de fácil instalación.`,
    price: 22000, image: "/images/cajaducha.jpg", category: "Hogar" },


  { id: 41, title: "Lámpara De Medusas Led Rgb Nocturna Flotante Recargable Usb Rgb",
    description: `Diseño Único: Presenta una medusa suspendida en una base acrílica transparente.

Ambiente: Emite una luz suave y relajante, ideal para decorar el hogar u oficina.

Estilo: Combina arte y funcionalidad, dando un toque especial y moderno a cualquier espacio.`,
    price: 25000, image: "/images/medusa.jpg", category: "Hogar" },

  { id: 42, title: "Mini Pistola Masajeadora Lesiones Musculares Rehabilitación",
    description: `Uso: Terapia de vibración profunda, ideal para lesiones musculares, rehabilitación y relajación corporal.Rendimiento: Hasta $2500\text{ RPM}$ para un masaje efectivo y profundo.Ajustes: Función de $3\text{ velocidades}$ para control gradual de intensidad.Batería: $800\text{ mAh}$. Ofrece $60\text{ minutos}$ de uso con solo $2\text{ horas}$ de carga.Portabilidad: Fabricada en ABS (ligera y súper pequeña).Incluye: $1\text{ cabeza de masaje}$ y Cable USB de carga.`,
    price: 25000, image: "/images/masaje.jpg", category: "Hogar" },

{ id: 43, title: "Trapeador Escurridor Ajustable Mopa Esponja Hogar Compacta",
    description: `Funcionalidad: Sistema de escurrido manual que elimina el exceso de agua fácilmente.

Beneficio: Permite dejar el piso seco y limpio rápidamente.

Comodidad: Diseño ergonómico, práctico y fabricado con materiales duraderos para uso diario.`,
    price: 40000, image: "/images/trapeaescurri.jpg", category: "Hogar" },


    { id: 44, title: "Organizador De Remeras Y Ropa Premium Rigido",
    description: `Función: Diseñado para clasificar remeras y ropa de manera eficiente, manteniendo las prendas en perfecto estado y a la vista.
Beneficio: Ahorra tiempo al elegir el outfit diario y optimiza el espacio en armarios, cajones o estanterías.
Calidad: Materiales rígidos que garantizan durabilidad y resistencia para el uso diario.
Nota: Color sujeto a disponibilidad.`,
    price: 4000, image: "/images/organiza.jpg", category: "Hogar" },

    { id: 45, title: "Aire Acondicionado Inverter Admiral",
    description: `Tecnología Clave: Inverter para ahorro de energía, regulación automática de potencia y menor ruido.Capacidad: Frío/Calor. Potencia de $2300\text{ frigorías}$ ($2700\text{ W}$).Funciones: Incluye Control Remoto, Deflectores Móviles, Timer y funciones Automática/Ventilación.Beneficio: Enfría o calienta ambientes de manera rápida y eficiente.Dimensiones (Int.): $72.9\text{ cm}$ (ancho) $\times 29.2\text{ cm}$ (alto) $\times 20\text{ cm}$ (profundidad).`,
    price: 700000, image: "/images/aireadmiral.jpg", category: "Climatización" },

    { id: 46, title: "Ventilador Kanjihome 18 Kjh-fh1311 De Pie",
    description: `Tipo: De Pie, con altura regulable (1.50 m).

Rendimiento: Diámetro de 18 pulgadas (45.72 cm) y 90 W de potencia.

Aspas: 3 aspas de metal para un flujo de aire eficiente.

Control: 3 niveles de intensidad (velocidades) para adaptarse a tus necesidades.

Color: Negro.`,
    price: 70000, image: "/images/ventitele.jpg", category: "Climatización" },

     { id: 47, title: "Ventilador de Pie Admiral",
    description: `Tipo: De Pie, con barral telescópico metálico (regulable en altura).

Diámetro y Potencia: Cabezal de 18 pulgadas y 75 watts de potencia.

Aspas: Metálicas, resistentes y eficientes.

Control: 3 velocidades ajustables.

Funcionalidad: Cabezal oscilante y regulable para redireccionar el flujo de aire.

Color: Negro.`,
    price: 75000, image: "/images/ventiadmiral.jpg", category: "Climatización" },

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
