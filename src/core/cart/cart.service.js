// Guardar carrito en localStorage
export const saveCartInLocalStorage = (cart) => {
	localStorage.setItem("cart", JSON.stringify(cart));
};

// Recuperar carrito de localStorage
export const getCartFromLocalStorage = () => {
	const cart = localStorage.getItem("cart");
	return cart ? JSON.parse(cart) : null;
};

// Eliminar carrito de localStorage
export const removeCartFromLocalStorage = () => {
	localStorage.removeItem("cart");
};
