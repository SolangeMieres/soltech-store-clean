// pages/api/checkout.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { title, quantity, price, cart } = req.body;

    // 🧾 Si viene un carrito, lo usamos completo
    const items = cart
      ? cart.map((item) => ({
          title: item.title || item.nombre,
          quantity: item.quantity || 1,
          currency_id: "ARS",
          unit_price: Number(item.price || item.precio),
        }))
      : [
          {
            title,
            quantity: quantity || 1,
            currency_id: "ARS",
            unit_price: Number(price),
          },
        ];

    const preference = {
      items,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_API_URL}/success`,
        failure: `${process.env.NEXT_PUBLIC_API_URL}/failure`,
        pending: `${process.env.NEXT_PUBLIC_API_URL}/pending`,
      },
      auto_return: "approved",
      statement_descriptor: "SOLTECH STORE",
    };

    // 🚀 Petición al endpoint oficial de MercadoPago
    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preference),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("MercadoPago Error:", data);
      throw new Error(data.message || "Error creando la preferencia de pago");
    }

    return res.status(200).json({ init_point: data.init_point });
  } catch (error) {
    console.error("❌ Error en /api/checkout:", error);
    return res
      .status(500)
      .json({ error: "Error creando la preferencia de pago" });
  }
}
