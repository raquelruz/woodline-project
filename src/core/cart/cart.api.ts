import { api } from "../http/axios";
import type { Cart, CartItem } from "./cart.types";

export const createCartApi = async (): Promise<Cart> => {
	const response = await api.post("/carts", {
		items: [],
		status: "active",
	});
	return response.data;
};

export const getCartsApi = async (): Promise<Cart> => {
	const response = await api.get("/carts");
	return response.data;
};

export const updateCartApi = async (cartId: string | undefined, items: CartItem[]): Promise<Cart> => {
	const response = await api.patch(`/carts/${cartId}`, {
		items,
		status: "active",
	});
	return response.data;
};

export const deleteCartApi = async (cartId: string): Promise<{ success: boolean }> => {
	const response = await api.delete(`/carts/${cartId}`);
	return response.data;
};
