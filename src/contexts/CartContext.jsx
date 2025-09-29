import { createContext, useEffect, useState } from "react";
import { createCartApi } from "../core/cart/cart.api.js";
import { getCartFromLocalStorage, saveCartInLocalStorage } from "../core/cart/cart.service.js";
import { normalizeCart } from "../helpers/normalizeCart.js";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState({ id: null, items: [] });

	useEffect(() => {
		const initCart = async () => {
			let storedCart = getCartFromLocalStorage();

			if (!storedCart || !storedCart.id) {
				try {
					console.log("🆕 No hay carrito en localStorage, creando uno nuevo...");
					const response = await createCartApi();
					console.log("🟢 Response POST /carts:", response);

					const newCart = normalizeCart(response);

					saveCartInLocalStorage(newCart);
					setCart(newCart);

					console.log("✅ Carrito creado y guardado:", newCart);
				} catch (err) {
					console.error("❌ Error creando carrito:", err);
				}
			} else {
				console.log("♻️ Carrito cargado de localStorage:", storedCart);
				setCart(normalizeCart(storedCart));
			}
		};

		initCart();
	}, []);

	useEffect(() => {
		console.log("🧺 Cart actualizado:", cart);
	}, [cart]);

	return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};
