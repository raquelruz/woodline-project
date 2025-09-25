import { createContext, useEffect, useState } from "react";
import { getCartFromLocalStorage } from "../core/cart/cart.service";

// Normalizador centralizado del carrito

// A veces el backend puede devolver el carrito como un array directo,
// un objeto con la propiedad cart o algo vacío.
// Esta función se asegura que siempre devolvamos un array válido.

// Así evitamos errores al usar .map() o .reduce() en los componentes.
const normalizeCart = (cart) => {
	if (Array.isArray(cart)) return cart;
	if (Array.isArray(cart?.cart)) return cart.cart;
	return [];
};

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const storedCart = getCartFromLocalStorage();
		setCart(normalizeCart(storedCart));
	}, []);

	// ⚠️ Aquí normalizamos siempre que se actualice el carrito
	const safeSetCart = (newCart) => {
		setCart(normalizeCart(newCart));
	};

	return <CartContext.Provider value={{ cart, setCart: safeSetCart }}>{children}</CartContext.Provider>;
};
