// pages/api/shipping.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { postalCodeDestino, pesoKg = 1, volumen = 0 } = req.body;

  if (!postalCodeDestino) {
    return res.status(400).json({ error: "Falta código postal de destino" });
  }

  try {
    const body = {
      cp_origen: process.env.ANDREANI_CP_ORIGEN,
      cp_destino: postalCodeDestino,
      api_nrocuenta: process.env.ANDREANI_NRO_CUENTA,
      api_key: process.env.ANDREANI_API_KEY,
      operativa: process.env.ANDREANI_CONTRATO,
      peso_total: pesoKg * 1000,      // si lo piden en gramos
      volumen_total: volumen
    };

    const response = await fetch(process.env.ANDREANI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error cotizando Andreani:", data);
      return res.status(500).json({ error: "No se pudo cotizar con Andreani" });
    }

    const fee = data.tarifaConIva?.total || data.tarifaSinIva?.total || null;

    if (fee == null) {
      console.error("Respuesta Andreani sin tarifa válida:", data);
      return res.status(500).json({ error: "Tarifa no disponible" });
    }

    return res.status(200).json({ fee: Number(fee) });
  } catch (err) {
    console.error("Error interno en envío Andreani:", err);
    return res.status(500).json({ error: "Error interno de envío" });
  }
}
