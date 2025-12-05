'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; // Asumiendo que usas react-hot-toast o similar

// 1. Creación del Contexto
const CartContext = createContext();

// 2. Custom Hook para usar el Contexto (Simple y Correcto)
// Este Hook SOLO usa useContext, cumpliendo con las Reglas de Hooks.
export const useCart = () => {
    return useContext(CartContext);
};

// 3. Componente Proveedor (Aquí van los Hooks, solo al inicio)
export function CartProvider({ children }) {
    // Hooks al inicio del componente Provider: CUMPLEN la Regla de Hooks.
    const [cart, setCart] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    // Función para cargar el carrito de localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem('soltech_cart');
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (e) {
                console.error("Error al parsear el carrito de localStorage:", e);
                setCart([]); // Limpiar si hay error de formato
            }
        }
        setIsLoaded(true);
    }, []);

    // Función para guardar el carrito en localStorage cada vez que cambia
    useEffect(() => {
        if (isLoaded) { // Evita guardar un array vacío al inicio
            localStorage.setItem('soltech_cart', JSON.stringify(cart));
        }
    }, [cart, isLoaded]);


    // Lógica para añadir producto al carrito
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            setCart(
                cart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
            toast.success(`Se agregó otra unidad de ${product.title}`);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
            toast.success(`Producto agregado: ${product.title}`);
        }
    };

    // Lógica para remover producto del carrito
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
        toast.error('Producto eliminado del carrito.');
    };
    
    // Función para calcular el total de items en el carrito
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    // Función para calcular el monto total
    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    
    // 4. El objeto de valor que se pasa a los componentes
    const contextValue = {
        cart,
        addToCart,
        removeFromCart,
        totalItems,
        totalAmount,
        // Puedes añadir más funciones como clearCart, updateQuantity, etc.
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}