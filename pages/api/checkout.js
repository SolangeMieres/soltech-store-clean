// pages/api/checkout.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { title, quantity, price } = req.body;

    const preference = {
      items: [
        {
          title,
          quantity,
          currency_id: "ARS",
          unit_price: price,
        },
      ],
      back_urls: {
  success: "https://soltech-store-argentina.vercel.app/success",
  pending: "https://soltech-store-argentina.vercel.app/pending",
  failure: "https://soltech-store-argentina.vercel.app/failure",
},
auto_return: "approved",

    };

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preference),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Error creando la preferencia de pago");

    return res.status(200).json({ init_point: data.init_point });
  } catch (error) {
    console.error("❌ Error creando la preferencia:", error);
    return res.status(500).json({ error: "Error creando la preferencia de pago" });
  }
}
