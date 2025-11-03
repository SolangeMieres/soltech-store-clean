export default function ProductCard({ title, description, price, image }) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-neutral-400 mb-3">{description}</p>
      <p className="text-xl font-bold mb-3 text-blue-400">${price}</p>
      <button className="btn-primary w-full">Comprar ahora</button>
    </div>
  );
}
