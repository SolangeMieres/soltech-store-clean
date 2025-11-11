"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const texts = {
  es: {
    line1: "© 2025 SOLtech — Innovación que impulsa tus ideas.",
    line2: "Tecnología confiable y con garantía. Argentina 🇦🇷",
    whatsapp: "WhatsApp",
    email: "Email",
    sendMessage: "Enviar mensaje",
    close: "Cerrar",
    success: "✅ ¡Tu mensaje fue enviado con éxito!",
    error: "❌ Ocurrió un error al enviar el mensaje.",
  },
  en: {
    line1: "© 2025 SOLtech — Innovation that powers your ideas.",
    line2: "Reliable tech with warranty. Argentina 🇦🇷",
    whatsapp: "WhatsApp",
    email: "Email",
    sendMessage: "Send message",
    close: "Close",
    success: "✅ Message sent successfully!",
    error: "❌ An error occurred while sending your message.",
  },
};

export default function Footer({ lang = "es" }) {
  const t = texts[lang] || texts.es;
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      await emailjs.send(
        "service_obam7wh", // ⚙️ tu ID de servicio
        "template_vvq9g8f", // ⚙️ tu ID de plantilla
        {
          name: formData.name, // ✅ coincide con {{name}}
          email: formData.email, // ✅ coincide con {{email}}
          message: formData.message, // ✅ coincide con {{message}}
          time: new Date().toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" }), // ✅ {{time}}
        },
        "6-FBjdN0NBxOSvb_Q" // ⚙️ tu PUBLIC KEY
      );

      setStatus(t.success);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error enviando mensaje:", error);
      setStatus(t.error);
    }
  };

  return (
    <footer
      id="contacto"
      className="mt-12 py-8 text-center text-light/70 text-sm border-t border-light/10 bg-dark/60 relative"
    >
      <p>{t.line1}</p>
      <p>{t.line2}</p>

      <div className="mt-3 flex justify-center gap-6">
        {/* WhatsApp */}
        <a
          href="https://wa.me/5491132905944"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 hover:text-brand transition"
        >
          📲 {t.whatsapp}
        </a>

        {/* Email → abre modal */}
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1 hover:text-brand transition"
        >
          ✉️ {t.email}
        </button>
      </div>

      {/* Modal de contacto */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-[#0d1117] p-6 rounded-2xl w-11/12 max-w-md shadow-xl border border-cyan-700/30">
            <h2 className="text-xl text-cyan-400 font-semibold mb-4">
              {t.sendMessage}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              <input
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-dark/60 border border-cyan-700/30 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-400"
                required
              />
              <input
                type="email"
                placeholder="Tu email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-dark/60 border border-cyan-700/30 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-400"
                required
              />
              <textarea
                placeholder="Tu mensaje..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-dark/60 border border-cyan-700/30 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-400 h-24 resize-none"
                required
              ></textarea>

              {status && (
                <p className="text-sm text-center mt-2 text-cyan-300">{status}</p>
              )}

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
                >
                  {t.close}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white"
                >
                  {t.sendMessage}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}
