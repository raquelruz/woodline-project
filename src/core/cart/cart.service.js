// Guardar carrito completo
export const saveCartInLocalStorage = (cart) => {
	localStorage.setItem("cart", JSON.stringify(cart));
};

// Obtener carrito
export const getCartFromLocalStorage = () => {
	const cart = localStorage.getItem("cart");
	if (!cart) return { items: [] };

	const parsed = JSON.parse(cart);

	if (Array.isArray(parsed)) {
		return { items: parsed };
	}

	if (!parsed.items) {
		return { items: [] };
	}

	return parsed;
};

// Eliminar carrito
export const clearCartFromLocalStorage = () => {
	localStorage.removeItem("cart");
};
