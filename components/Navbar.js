export default function Navbar() {
  return (
    <nav className="backdrop-blur-md bg-white/5 border-b border-white/10 shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* LOGO + TÍTULO */}
        <div className="flex items-center gap-3">
          <img 
            src="/img/soltech-logo.png" 
            alt="SOLtech Logo"
            className="w-10 h-10 rounded-full border border-cyan-400 shadow-soft hover:scale-110 transition-transform duration-300"
          />
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent tracking-tight">
            SOLtech Store
          </h1>
        </div>

        {/* LINKS */}
        <div className="flex gap-6 text-light/80 text-sm font-semibold">
          <a href="#" className="hover:text-brand transition">Inicio</a>
          <a href="#productos" className="hover:text-brand transition">Productos</a>
          <a href="#contacto" className="hover:text-brand transition">Contacto</a>
        </div>

      </div>
    </nav>
  );
}
