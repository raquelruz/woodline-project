import api from "../http/axios.js";

export const createOrderApi = async (orderData) => {
	const response = await api.post("/orders", orderData);
	return response.data;
};

export const getOrdersApi = async () => {
	const response = await api.get("/orders");
	return response.data;
};
