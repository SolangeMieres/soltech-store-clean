// En Carrito.js
import { useCart } from "@/context/CartContext";

export default function Carrito() {
  const { cart, removeFromCart, clearCart, isLoaded } = useCart(); // 👈 Obtener isLoaded

  // 1. Mostrar estado de carga si aún no ha terminado de cargar de localStorage
  if (!isLoaded) {
    return (
      <div className="text-center mt-20 text-cyan-400">
        Cargando carrito...
      </div>
    );
  }

  // 2. Comprobar si está vacío después de cargar
  if (cart.length === 0)
    return (
      <div className="text-center mt-20">
        <h2 className="text-cyan-400 text-2xl mb-4">🛒 Tu carrito está vacío</h2>
        {/* ... */}
      </div>
    );

  // 3. 💳 Carrito con productos (Aquí sí aparece el botón)
  return (
    // ... tu código con el botón de "Finalizar compra 💳" ...
  );
}