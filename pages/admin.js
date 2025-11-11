import { useState } from "react";

export default function Admin() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
    descripcion: "",
    categoria: "",
  });

  const handleChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const handleAgregar = async () => {
  if (!nuevoProducto.nombre || !nuevoProducto.precio) {
    alert("Completá al menos nombre y precio");
    return;
  }

  try {
    const res = await fetch("/api/agregar-producto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoProducto),
    });

    if (res.ok) {
      const data = await res.json();
      setProductos([...productos, data.producto]);
      alert("✅ Producto guardado correctamente");

      setNuevoProducto({
        nombre: "",
        precio: "",
        imagen: "",
        descripcion: "",
        categoria: "",
      });
    } else {
      alert("❌ Error al guardar el producto");
    }
  } catch (err) {
    console.error(err);
    alert("Error de conexión");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Panel de Administración</h1>

      {/* Formulario de producto */}
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Agregar producto nuevo</h2>

        <div className="space-y-3">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nuevoProducto.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={nuevoProducto.precio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="imagen"
            placeholder="Ruta de imagen (ej: /images/mouse.jpg)"
            value={nuevoProducto.imagen}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="categoria"
            placeholder="Categoría"
            value={nuevoProducto.categoria}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={nuevoProducto.descripcion}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          />
          <button
            onClick={handleAgregar}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Agregar producto
          </button>
        </div>
      </div>

      {/* Vista previa */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Vista previa</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productos.map((p) => (
            <div key={p.id} className="bg-white rounded-lg shadow p-4">
              <img src={p.imagen} alt={p.nombre} className="rounded mb-3" />
              <h3 className="font-bold">{p.nombre}</h3>
              <p className="text-gray-600">{p.descripcion}</p>
              <p className="text-blue-600 font-semibold mt-2">${p.precio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
