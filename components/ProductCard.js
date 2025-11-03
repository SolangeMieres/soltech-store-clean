export default function ProductCard({ product, shippingFee }) {
  const handleBuy = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: product.nombre,
          unit_price: product.precio,
          picture_url: product.imagen,
          quantity: 1,
          shipping_fee: shippingFee || 0,
        }),
      });
      const data = await res.json();
      if (data.init_point) {
        window.open(data.init_point, "_blank");
      } else {
        alert("No se pudo iniciar el pago. Revisá las credenciales o intentá de nuevo.");
      }
    } catch (e) {
      console.error(e);
      alert("Error al iniciar el checkout.");
    }
  };

  return (
    <div className="card flex flex-col">
      <img src={product.imagen} alt={product.nombre} className="rounded-xl w-full h-48 object-cover mb-3" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{product.nombre}</h3>
        <p className="text-sm text-neutral-300 mt-1">{product.descripcion}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-xl font-bold">${product.precio.toLocaleString("es-AR")}</div>
        <button onClick={handleBuy} className="btn-primary">Comprar ahora</button>
      </div>
    </div>
  );
}
