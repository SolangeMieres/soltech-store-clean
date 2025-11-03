import { useState } from "react";

function ShippingCalculator() {
  const [zip, setZip] = useState("");
  const [fee, setFee] = useState(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    if (!zip || zip.length < 4) {
      setError("Ingresá un código postal válido");
      setFee(null);
      return;
    }

    setError("");
    const calculated = Math.floor(Math.random() * 1000) + 500;
    setFee(calculated);
  };

  return (
    <div className="p-4 bg-neutral-900 rounded-lg shadow-lg text-center">
      <h2 className="text-lg font-semibold mb-2 text-white">
        Calculá tu costo de envío 🚚
      </h2>
      <input
        type="text"
        placeholder="Código postal"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        className="w-full p-2 rounded text-black"
      />
      <button
        onClick={handleCalculate}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Calcular
      </button>

      {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
      {fee != null && !error && (
        <p className="text-sm text-neutral-300 mt-2">
          Envío estimado:
          <span className="font-semibold text-white">
            {" "}
            ${fee.toLocaleString("es-AR")}
          </span>
        </p>
      )}
    </div>
  );
}

export default ShippingCalculator;
