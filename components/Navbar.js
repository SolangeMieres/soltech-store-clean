export default function Navbar() {
  return (
    <nav className="bg-neutral-950 border-b border-neutral-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img src="/img/soltech-logo.png" alt="SOLtech logo" className="w-10 h-10" />
          <span className="text-xl font-semibold text-white">SOLtech</span>
        </div>

        {/* LINKS */}
        <div className="flex gap-6 text-sm font-medium">
          <a href="#" className="text-neutral-300 hover:text-blue-400 transition">Inicio</a>
          <a href="#productos" className="text-neutral-300 hover:text-blue-400 transition">Productos</a>
          <a href="#contacto" className="text-neutral-300 hover:text-blue-400 transition">Contacto</a>
        </div>
      </div>
    </nav>
  );
}
