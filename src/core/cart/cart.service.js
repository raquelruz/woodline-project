// Guarda carrito en localStorage
export const saveCartInLocalStorage = (cart) => {
	localStorage.setItem("cart", JSON.stringify(cart));
};

// Recupera carrito de localStorage
export const getCartFromLocalStorage = () => {
	const cart = localStorage.getItem("cart");
	return cart ? JSON.parse(cart) : null;
};

// Elimina carrito de localStorage
export const removeCartFromLocalStorage = () => {
	localStorage.removeItem("cart");
};
