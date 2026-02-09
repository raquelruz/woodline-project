import type { Cart } from "./cart.types";

export const saveCartInLocalStorage = (cart: Cart): void => {
	localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCartFromLocalStorage = (): Cart | null => {
	const stored = localStorage.getItem("cart");
	if (!stored) return null;

	try {
		return JSON.parse(stored) as Cart;
	} catch (error) {
		console.warn("Cart en localStorage corrupto -> reseteando", error);
		removeCartFromLocalStorage();
		return null;
	}
};

export const removeCartFromLocalStorage = (): void => {
	localStorage.removeItem("cart");
};
