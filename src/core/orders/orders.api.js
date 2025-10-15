import { api } from "../http/axios.js";

// Crear un pedido
export const createOrderApi = async (orderData) => {
	const response = await api.post("/orders", orderData);
	return response.data;
};

// Obtener pedidos
export const getOrdersApi = async (userId) => {
	const url = userId ? `/orders?userId=${userId}` : "/orders";
	const response = await api.get(url);
	return response.data;
};
