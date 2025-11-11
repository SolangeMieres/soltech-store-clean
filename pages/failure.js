export default function Failure() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0e1b25] to-[#0a1218] text-center p-6">
      <h1 className="text-4xl text-red-400 font-bold mb-4">
        ❌ Pago rechazado
      </h1>
      <p className="text-gray-300 mb-8 max-w-md">
        No se pudo procesar tu pago. Podés intentar nuevamente o probar con otro medio de pago.
      </p>
      <a
        href="/carrito"
        className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-2 rounded-lg transition"
      >
        Volver al carrito
      </a>
    </div>
  );
}
