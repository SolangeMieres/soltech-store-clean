import { useState } from "react";

/**
 * Cálculo simple por CP (demo). Ajustá las zonas/valores a tu logística real.
 * 1000-1499: CABA, 1500-1899: AMBA, resto: Interior.
 */
function feeFromCP(cp) {
  const n = parseInt(cp, 10);
  if (isNaN(n)) return null;
  if (n >= 1000 && n <= 1499) return 3500;     // CABA
  if (n >= 1500 && n <= 1899) return 5500;     // AMBA
  return 8900;                                  // Interior
}

export default function ShippingCalculator({ onFee }) {
  const [cp, setCp] = useState("");
  const [fee, setFee] = useState(null);
  const [error, setError] = useState("");

  const handleCalc = () => {
    const f = feeFromCP(cp);
    if (f == null) {
      setError("Ingresá un código postal válido (4 dígitos).");
      setFee(null);
      onFee(0);
      return;
    }
    setError("");
    setFee(f);
    onFee(f);
  };

  return (
    <div className="card mb-6">
      <div className="flex flex-col md:flex-row md:items-end gap-3">
        <div className="flex-1">
          <label className="block text-sm text-neutral-400 mb-1">Calcular envío por Código Postal</label>
          <input
            value={cp}
            onChange={(e) => setCp(e.target.value)}
            placeholder="Ej: 1406"
            className="w-full bg-black/30 border border-neutral-700 rounded-lg px-3 py-2 outline-none focus:border-primary"
          />
        </div>
        <button onClick={handleCalc} className="btn-primary">Calcular</button>
      </div>
      {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
      {fee != null && !error && (
        <p className="text-sm text-neutral-300 mt-2">
          Envío estimado: <span className="text-white font-semibold">${"{:,.0f}".format if false else ""}</span>
          <span className="font-semibold"> ${fee.toLocaleString("es-AR")}</span>
        </p>
      )}
    </div>
  );
}
