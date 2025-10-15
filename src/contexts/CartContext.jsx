import { createContext, useEffect, useState } from "react";
import { createCartApi } from "../core/cart/cart.api.js";
import { getCartFromLocalStorage, saveCartInLocalStorage } from "../core/cart/cart.service.js";
import { normalizeCart } from "../helpers/normalizeCart.js";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState({ id: null, items: [] });

	useEffect(() => {
		const initCart = async () => {
			const storedCart = getCartFromLocalStorage();

			if (storedCart?.id) {
				setCart(normalizeCart(storedCart));
				console.log("Carrito cargado de localStorage:", storedCart);
			} else {
				try {
					console.log("Creando carrito nuevo...");
					const response = await createCartApi();
					const newCart = normalizeCart(response);

					saveCartInLocalStorage(newCart);
					setCart(newCart);

					console.log("Carrito creado y guardado:", newCart);
				} catch (error) {
					console.error("Error creando carrito:", err);
				}
			}
		};

		initCart();
	}, []);

	useEffect(() => {
		console.log("Cart actualizado:", cart);
	}, [cart]);

	return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};
