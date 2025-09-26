import { createContext, useEffect, useState } from "react";
import { getCartFromLocalStorage } from "../core/cart/cart.service.js";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
	const [items, setItems] = useState([]);

	// Cargar carrito desde localStorage al inicio
	useEffect(() => {
		const storedCart = getCartFromLocalStorage();
		if (storedCart?.items) {
			setItems(storedCart.items);
		}
	}, []);

	return <CartContext.Provider value={{ items, setItems }}>{children}</CartContext.Provider>;
};
