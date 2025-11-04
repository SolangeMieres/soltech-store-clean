import mercadopago from "mercadopago";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title, price, id } = req.body || {};

  if (!title || !price) {
    return res.status(400).json({ error: "Faltan datos del producto" });
  }

  if (!process.env.MP_ACCESS_TOKEN) {
    console.error("❌ Falta MP_ACCESS_TOKEN en las variables de entorno");
    return res.status(500).json({ error: "Error de configuración" });
  }

  try {
    mercadopago.configure({
      access_token: process.env.MP_ACCESS_TOKEN,
    });

    const preference = {
      items: [
        {
          id: id || "product",
          title,
          quantity: 1,
          currency_id: "ARS",
          unit_price: Number(price),
        },
      ],
      back_urls: {
        success: "http://localhost:3000/",
        failure: "http://localhost:3000/",
        pending: "http://localhost:3000/",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);

    return res.status(200).json({
      init_point:
        response.body.init_point ||
        response.body.sandbox_init_point ||
        null,
    });
  } catch (error) {
    console.error("MercadoPago error:", error);
    return res
      .status(500)
      .json({ error: "Error creando la preferencia de pago" });
  }
}
console.log("🧠 Token activo:", process.env.MP_ACCESS_TOKEN ? "OK" : "FALTA");
