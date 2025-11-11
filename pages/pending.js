export default function Pending() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0e1b25] to-[#0a1218] text-center p-6">
      <h1 className="text-4xl text-yellow-400 font-bold mb-4">
        ⏳ Pago pendiente
      </h1>
      <p className="text-gray-300 mb-8 max-w-md">
        Tu pago está siendo procesado. Recibirás una notificación cuando se confirme.
      </p>
      <a
        href="/"
        className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-2 rounded-lg transition"
      >
        Volver al inicio
      </a>
    </div>
  );
}
