import mercadopago from "mercadopago";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método no permitido" });

  const { title, unit_price, quantity, picture_url } = req.body;

  try {
    mercadopago.configure({
      access_token: process.env.MP_ACCESS_TOKEN,
    });

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
      back_urls: {
        success: "https://soltech-store-argentina.vercel.app/success",
        failure: "https://soltech-store-argentina.vercel.app/failure",
        pending: "https://soltech-store-argentina.vercel.app/pending",
      },
      auto_return: "approved",
      statement_descriptor: "SOLTECH",
    };

    const response = await mercadopago.preferences.create(preference);
    return res.status(200).json({ init_point: response.body.init_point });
  } catch (error) {
    console.error("MercadoPago error:", error);
    return res.status(500).json({ error: "Error creando la preferencia" });
  }
}
