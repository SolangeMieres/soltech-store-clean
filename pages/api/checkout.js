import mercadopago from "mercadopago";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { title, unit_price, quantity, picture_url, shipping_fee = 0 } = req.body || {};

  try {
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      return res.status(500).json({ error: "Falta MERCADOPAGO_ACCESS_TOKEN" });
    }
    mercadopago.configure({ access_token: process.env.MERCADOPAGO_ACCESS_TOKEN });

    const preference = {
      items: [
        {
          title: title || "Producto SOLtech",
          quantity: quantity || 1,
          currency_id: "ARS",
          unit_price: Number(unit_price) || 0,
          picture_url: picture_url || undefined,
        },
      ],
      shipments: {
        cost: Number(shipping_fee) || 0,
        mode: "not_specified",
      },
      back_urls: {
        success: "https://soltech.vercel.app/success",
        pending: "https://soltech.vercel.app/pending",
        failure: "https://soltech.vercel.app/failure",
      },
      auto_return: "approved",
      statement_descriptor: "SOLTECH",
      metadata: { project: "soltech-store" },
    };

    const response = await mercadopago.preferences.create(preference);
    const initPoint =
      response.body.init_point || response.body.sandbox_init_point || null;

    return res.status(200).json({ init_point: initPoint, id: response.body.id });
  } catch (err) {
    console.error("MercadoPago error:", err);
    return res.status(500).json({ error: "Error creando preferencia" });
  }
}
