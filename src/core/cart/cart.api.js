import { api } from "../http/axios.js";

export const createCartApi = async () => {
	const response = await api.post("/carts", {
		items: [],
		status: "active",
	});
	return response.data;
};

export const getCartsApi = async () => {
	const response = await api.get("/carts");
	return response.data;
};

export const updateCartApi = async (cartId, items) => {
	const response = await api.patch(`/carts/${cartId}`, {
		items,
		status: "active",
	});
	return response.data;
};

export const deleteCartApi = async (cartId) => {
	const response = await api.delete(`/carts/${cartId}`);
	return response.data;
};
