import { api } from "../http/axios";

// Obtener carrito del usuario
export const getCartApi = async () => {
	try {
		const response = await api.get("/carts");
		return response.data;
	} catch (error) {
		console.error("Error al obtener el carrito del usuario:", error);
		throw error;
	}
};

// Añadir producto al carrito
export const addToCartApi = async (productId, quantity = 1) => {
	try {
		const response = await api.post("/cart/add", { productId, quantity });
		return response.data;
	} catch (error) {
		console.error("Error al añadir producto al carrito", error);
		throw error;
	}
};

// Actualizar cantidad de un producto
export const updateCartItemApi = async (productId, quantity) => {
	try {
		const response = await api.patch(`/cart/update/${productId}`, { quantity });
		return response.data;
	} catch (error) {
		console.error("Error al actualizar cantidad de producto", error);
		throw error;
	}
};

// Eliminar producto del carrito
export const removeFromCartApi = async (productId) => {
	try {
		const response = await api.delete(`/cart/remove/${productId}`);
		return response.data;
	} catch (error) {
		console.error("Error al eliminar producto del carrito", error);
		throw error;
	}
};

// Vaciar carrito completo
export const clearCartApi = async () => {
	try {
		const response = await api.delete("/cart/clear");
		return response.data;
	} catch (error) {
		console.error("Error al vaciar carrito", error);
		throw error;
	}
};
