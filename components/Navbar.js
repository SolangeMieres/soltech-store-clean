export default function Navbar() {
  return (
    <header className="border-b border-neutral-800">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <img src="/img/soltech-logo.png" alt="SOLtech" className="h-9 w-9 rounded-full ring-2 ring-primary/60" />
          <div className="font-semibold tracking-wide">SOLtech</div>
        </div>
        <nav className="text-sm text-neutral-300">
          <a href="#catalogo" className="hover:text-white transition">Productos</a>
        </nav>
      </div>
    </header>
  );
}
