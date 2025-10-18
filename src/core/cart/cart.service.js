export const saveCartInLocalStorage = (cart) => {
	localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCartFromLocalStorage = () => {
	const cart = localStorage.getItem("cart");
	return cart ? JSON.parse(cart) : null;
};

export const removeCartFromLocalStorage = () => {
	localStorage.removeItem("cart");
};
