import { api } from "../http/axios";

export const createOrderApi = async (orderData: string) => {
	const response = await api.post("/orders", orderData);
	return response.data;
};

export const getOrdersApi = async (userId?: string) => {
	const url = userId ? `/orders?userId=${userId}` : "/orders";
	const response = await api.get(url);
	return response.data;
};
