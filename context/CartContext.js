// src/context/CartContext.jsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast"; // <-- Añadido para la notificación

// 1. Creación del Contexto
const CartContext = createContext();

// 2. Componente Proveedor (Aquí va toda la lógica y los Hooks)
export const CartProvider = ({ children }) => {
  // Hooks al inicio del componente Provider
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // <-- NUEVO ESTADO PARA LA CARGA

  // 1. Lógica para cargar el carrito de localStorage (Solo al montar)
  useEffect(() => {
    const storedCart = localStorage.getItem("soltech_cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error("Error al parsear el carrito de localStorage:", e);
        setCart([]);
      }
    }
    // ESTO ES CRÍTICO: Indica que la carga (exitosa o fallida) ha terminado.
    setIsLoaded(true); 
  }, []);

  // 2. Lógica para guardar el carrito en localStorage (Cada vez que 'cart' cambia)
  useEffect(() => {
    if (isLoaded) { // Guardamos solo si ya terminamos la carga inicial
      localStorage.setItem("soltech_cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);


  // 🛒 Agregar al carrito
  const addToCart = (product) => {
    let message = "";
    
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        message = `Se agregó otra unidad de ${product.title}`;
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        message = `Producto agregado: ${product.title}`;
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    
    // Mostramos la notificación después de actualizar el estado
    toast.success(message);
  };

  // ❌ Eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    toast.error('Producto eliminado del carrito.'); // <-- Añadido noti
  };

  // 🧹 Vaciar carrito completo
  const clearCart = () => {
    setCart([]);
    toast('Carrito vaciado', { icon: '🗑️' }); // <-- Añadido noti
  };

  // 💰 Calcular total
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalPrice, isLoaded }} // <-- Exportamos isLoaded
    >
      {children}
    </CartContext.Provider>
  );
};

// 3. Custom Hook para usar el Contexto (Simple y Correcto)
export const useCart = () => useContext(CartContext);