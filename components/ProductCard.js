export default function ProductCard({ title, description, price, image }) {
  return (
    <div className="card flex flex-col items-center text-center p-5 rounded-2xl bg-white/5 border border-white/10 shadow-soft hover:shadow-lg transition-all">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-4 border border-white/10"
      />
      <h3 className="text-lg font-bold text-brand mb-1">{title}</h3>
      <p className="text-sm text-light/70 mb-3">{description}</p>
     <p className="text-sm font-semibold text-light mb-4">
  {price ? `$${price.toLocaleString("es-AR")}` : "Precio no disponible"}
</p>

      <button className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-accent transition">
        Comprar
      </button>
    </div>
  );
}
