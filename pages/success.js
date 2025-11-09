import { useState } from "react";
import emailjs from "emailjs-com";
import Link from "next/link";

export default function Success() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_obam7wh", // 👈 tu Service ID (de EmailJS)
        "template_9iusvwi", // 👈 tu Template ID (lo veremos abajo)
        {
          to_email: email,
          subject: "¡Gracias por tu compra en SOLtech!",
          message: "Recibimos tu pedido y pronto te enviaremos la info del envío 🚀",
        },
        "user_xxx" // 👈 tu Public Key (User ID)
      )
      .then(() => setSent(true))
      .catch((err) => console.error("Error al enviar correo:", err));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white text-center px-4">
      <img src="/soltech-logo.png" alt="SOLtech Logo" className="w-32 mb-6" />
      <h1 className="text-3xl font-bold mb-2">✨ ¡Gracias por tu compra! ✨</h1>
      <p className="text-gray-300 mb-6">
        Tu pago fue procesado con éxito. Te enviaremos los detalles a continuación:
      </p>

      {!sent ? (
        <form
          onSubmit={sendEmail}
          className="bg-[#141414] p-4 rounded-xl w-full max-w-md"
        >
          <label className="block text-gray-400 mb-2">
            Ingresá tu correo para recibir confirmación:
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tuemail@ejemplo.com"
            className="w-full p-2 rounded-lg text-black mb-4"
          />
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-400 transition"
          >
            Enviar correo
          </button>
        </form>
      ) : (
        <p className="mt-6 text-green-400">
          ✅ ¡Correo enviado! Gracias por confiar en SOLtech 💜
        </p>
      )}

      <a
        href="https://wa.me/541132905944?text=Hola%20Soltech!%20Hice%20una%20compra%20en%20tu%20tienda"
        className="mt-8 inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-400 transition"
      >
        Contactar por WhatsApp 💬
      </a>

      <Link href="/" className="mt-6 text-cyan-400 hover:underline">
        ← Volver a la tienda
      </Link>
    </div>
  );
}
