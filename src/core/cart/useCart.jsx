// src/core/cart/useCart.jsx
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";
import { clearCartFromLocalStorage } from "./cart.service";

export const useCart = () => {
	const { items, setItems, loading } = useContext(CartContext);

	const addToCart = (product) => {
		if (!product || !product._id) return;

		setItems((prev) => {
			const existing = prev.find((p) => p._id === product._id);
			if (existing) {
				return prev.map((p) => (p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p));
			}
			return [...prev, { ...product, quantity: 1 }];
		});
	};

	const removeFromCart = (id) => {
		console.log("Intentando eliminar producto con id:", id);
		setItems((prev) => {
			console.log("Estado antes de eliminar:", prev);
			return prev.filter((p) => (p._id === id || p.id === id ? false : true));
		});
	};

	const clearCart = () => {
		setItems([]);
		clearCartFromLocalStorage();
	};

	return { items, loading, addToCart, removeFromCart, clearCart };
};
