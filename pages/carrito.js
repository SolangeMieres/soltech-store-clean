// ... [Lógica del handleCheckout]

// 🛒 Si el carrito está vacío
if (cart.length === 0)
  return (
    <div className="text-center mt-20">
      {/* ... Mensaje de carrito vacío ... */}
    </div>
  );

// 💳 Carrito con productos
return ( // <--- ESTA ES LA LÍNEA QUE DEBE EMPEZAR AQUÍ
  <div className="max-w-3xl mx-auto mt-12 p-6 ...">
    {/* ... todo el contenido del carrito ... */}
  </div>
);