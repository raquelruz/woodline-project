import { api } from "../http/axios";
import type { CreateOrderPayload, Order } from "./orders.types";

export const createOrderApi = async (orderData: CreateOrderPayload): Promise<Order> => {
	const response = await api.post("/orders", orderData);
	return response.data;
};

export const getOrdersApi = async (userId?: string): Promise<Order[]> => {
	const url = userId ? `/orders?userId=${userId}` : "/orders";
	const response = await api.get<Order[]>(url);
	return response.data;
};