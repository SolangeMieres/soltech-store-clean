// ✅ pages/api/agregar-producto.js (versión ESM 100% compatible)

import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ mensaje: "Método no permitido" });
  }

  try {
    const filePath = path.join(process.cwd(), "data", "productos.json");

    // Crear el archivo si no existe
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf8");
    }

    const fileData = fs.readFileSync(filePath, "utf8") || "[]";
    let productos = [];

    try {
      productos = JSON.parse(fileData);
    } catch (error) {
      console.error("⚠️ Error al parsear productos.json:", error);
      productos = [];
    }

    const nuevoProducto = {
      id: productos.length ? productos[productos.length - 1].id + 1 : 1,
      nombre: req.body.nombre,
      precio: Number(req.body.precio),
      imagen: req.body.imagen,
      descripcion: req.body.descripcion,
      categoria: req.body.categoria,
    };

    productos.push(nuevoProducto);

    fs.writeFileSync(filePath, JSON.stringify(productos, null, 2), "utf8");
    console.log("✅ Producto agregado correctamente:", nuevoProducto);

    return res.status(200).json({
      mensaje: "Producto agregado correctamente",
      producto: nuevoProducto,
    });
  } catch (error) {
    console.error("❌ Error al guardar producto:", error);
    return res
      .status(500)
      .json({ mensaje: "Error interno al guardar el producto" });
  }
}
