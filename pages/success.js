export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0e1b25] to-[#0a1218] text-center p-6">
      <h1 className="text-4xl text-cyan-400 font-bold mb-4">
        ¡Pago exitoso! 💳
      </h1>
      <p className="text-gray-300 mb-8 max-w-md">
        Gracias por tu compra en <span className="text-cyan-300">SOLtech Store</span>.  
        En breve recibirás un correo con la confirmación de tu pedido.
      </p>
      <a
        href="/"
        className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-2 rounded-lg transition"
      >
        Volver a la tienda
      </a>
    </div>
  );
}
