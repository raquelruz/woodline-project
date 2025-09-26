import { api } from "../http/axios";
import { getCartFromLocalStorage, saveCartInLocalStorage, clearCartFromLocalStorage } from "./cart.service.js";
import { getTokenFromLocalStorage } from "../auth/auth.service.js";

// Obtener carrito
export const getCartApi = async () => {
	try {
		// console.log("getCartApi");
		const token = getTokenFromLocalStorage();
		const response = await api.get("/carts", {
			headers: { Authorization: `Bearer ${token}` },
		});
		// console.log("Carrito obtenido:", response.data);

		return Array.isArray(response.data) ? { items: response.data } : response.data;
	} catch (error) {
		console.error("Error al obtener carrito:", error);
		return { items: [] };
	}
};

// Añadir producto
export const addToCartApi = async (productId, quantity = 1) => {
	try {
		// console.log("addToCartApi");
		const token = getTokenFromLocalStorage();
		const response = await api.post(
			"/carts",
			{ productId, quantity },
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		// console.log("Añadido al carrito:", response.data);

		saveCartInLocalStorage(response.data);
		return response.data;
	} catch (error) {
		console.error("Error al añadir al carrito:", error);

		let cart = getCartFromLocalStorage() || { items: [] };

		const item = cart.items.find((i) => i.productId === productId);

		if (item) item.quantity += quantity;
		else cart.items.push({ productId, quantity });

		saveCartInLocalStorage(cart);

		return cart;
	}
};

// Actualizar cantidad
export const updateCartItemApi = async (itemId, quantity) => {
	try {
		// console.log("updateCartItemApi");
		const token = getTokenFromLocalStorage();
		const response = await api.patch(
			`/carts/${itemId}`,
			{ quantity },
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		// console.log("Carrito actualizado:", response.data);

		saveCartInLocalStorage(response.data);

		return response.data;
	} catch (error) {
		console.error("Error al actualizar carrito:", error);

		let cart = getCartFromLocalStorage() || { items: [] };
		cart.items = cart.items.map((i) => (i.productId === itemId ? { ...i, quantity } : i));

		saveCartInLocalStorage(cart);

		return cart;
	}
};

// Eliminar producto
export const removeCartItemApi = async (itemId) => {
	try {
		// console.log("removeCartItemApi");
		const token = getTokenFromLocalStorage();
		const response = await api.delete(`/carts/${itemId}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		// console.log("Eliminado del carrito:", response.data);

		saveCartInLocalStorage(response.data);

		return response.data;
	} catch (error) {
		console.error("Error al eliminar del carrito", error);

		let cart = getCartFromLocalStorage() || { items: [] };
		cart.items = cart.items.filter((i) => i.productId !== itemId);

		saveCartInLocalStorage(cart);

		return cart;
	}
};

// Vaciar carrito
export const clearCartApi = async () => {
	try {
		// console.log("clearCartApi");
		const token = getTokenFromLocalStorage();
		const response = await api.delete("/carts", {
			headers: { Authorization: `Bearer ${token}` },
		});
		// console.log("Carrito eliminado:", response);

		clearCartFromLocalStorage();

		return response.data;
	} catch (error) {
		console.error("Error al vaciar carrito:", error);

		clearCartFromLocalStorage();

		return { items: [] };
	}
};
