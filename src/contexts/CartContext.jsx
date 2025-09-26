import { createContext, useEffect, useState } from "react";
import { saveCartInLocalStorage, getCartFromLocalStorage } from "../core/cart/cart.service.js";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true); 
	const [initialized, setInitialized] = useState(false); 

	// Cargar carrito desde localStorage al inicio
	useEffect(() => {
		const stored = getCartFromLocalStorage();
		console.log("Carrito cargado desde localStorage:", stored);
		setItems(stored.items || []);
		setLoading(false);
		setInitialized(true); 
	}, []);

	// Guardar carrito en localStorage cada vez que cambien los items
	useEffect(() => {
		if (!initialized) return; 
		saveCartInLocalStorage({ items });
		console.log("Carrito guardado en localStorage:", { items });
	}, [items, initialized]);

	return <CartContext.Provider value={{ items, setItems, loading }}>{children}</CartContext.Provider>;
};
