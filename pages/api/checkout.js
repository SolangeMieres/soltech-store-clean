import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { title, unit_price, quantity, picture_url } = req.body;

    const preference = await mercadopago.preferences.create({
      items: [
        {
          title,
          unit_price,
          quantity,
          picture_url,
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_API_URL}/success`,
        failure: `${process.env.NEXT_PUBLIC_API_URL}/failure`,
        pending: `${process.env.NEXT_PUBLIC_API_URL}/pending`,
      },
      auto_return: "approved",
    });

    return res.status(200).json({ init_point: preference.body.init_point });
  } catch (error) {
    console.error("Error creando la preferencia de pago:", error);
    return res.status(500).json({ error: "Error creando la preferencia de pago" });
  }
}
