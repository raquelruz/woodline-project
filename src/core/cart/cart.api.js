import { api } from "../http/axios";
import { getCartFromLocalStorage, saveCartInLocalStorage, clearCartFromLocalStorage } from "./cart.service.js";

// Obtener carrito (si la API falla, usa localStorage)
export const getCartApi = async () => {
	try {
		const response = await api.get("/carts");
		// console.log("Respuesta de la API:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error al obtener carrito de la API:", error);
		return getCartFromLocalStorage() || { items: [] };
	}
};

// Añadir producto
export const addToCartApi = async (product, quantity = 1) => {
	try {
		const cart = getCartFromLocalStorage() || {
			status: "active",
			items: [],
			id: Date.now().toString(),
		};

		const existing = cart.items.find((item) => item.productId === product._id);

		if (existing) {
			existing.quantity += quantity;
		} else {
			cart.items.push({
				productId: product._id,
				name: product.name,
				price: product.price,
				images: product.images || [],
				quantity,
			});
		}

		saveCartInLocalStorage(cart);
		// console.log("Carrito actualizado en localStorage:", cart);
		return cart;
	} catch (error) {
		console.error("Error al añadir al carrito:", error);
		throw error;
	}
};

// Actualizar cantidad de un producto
export const updateCartItemApi = async (productId, quantity) => {
	try {
		const cart = getCartFromLocalStorage() || { items: [] };
		const item = cart.items.find((i) => i.productId === productId);

		if (item) item.quantity = quantity;

		saveCartInLocalStorage(cart);
		// console.log("Producto actualizado en localStorage:", cart);
		return cart;
	} catch (error) {
		console.error("Error al actualizar producto:", error);
		throw error;
	}
};

// Eliminar un producto del carrito
export const removeCartItemApi = async (productId) => {
	try {
		let cart = getCartFromLocalStorage() || { items: [] };
		cart.items = cart.items.filter((i) => i.productId !== productId);

		saveCartInLocalStorage(cart);
		// console.log("Producto eliminado en localStorage:", cart);
		return cart;
	} catch (error) {
		console.error("Error al eliminar producto:", error);
		throw error;
	}
};

// Vaciar carrito
export const clearCartApi = async () => {
	try {
		clearCartFromLocalStorage();
		// console.log("Carrito vaciado en localStorage");
		return { items: [] };
	} catch (error) {
		console.error("Error al vaciar carrito:", error);
		throw error;
	}
};
