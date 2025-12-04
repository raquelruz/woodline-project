import { createOrderApi, getOrdersApi } from "./orders.api.js";
import { calculateSubtotal, calculateTax, toCurrency } from "../../helpers/orders.helpers.js";
import { useCallback } from "react";

export const useOrders = () => {
	const createOrder = useCallback(async (userId, items, { shippingAddress, billingAddress, paymentMethod }) => {
		// if (!items?.length) throw new Error("No hay productos en el carrito");

		const subtotal = calculateSubtotal(items);
		const tax = calculateTax(subtotal);
		const total = subtotal + tax;

		const orderPayload = {
			userId,
			products: items.map((item) => ({
				productId: item.productId || item.id,
				quantity: item.quantity || 1,
				price: toCurrency(item.price),
				name: item.name,
			})),
			subtotal: toCurrency(subtotal),
			tax: toCurrency(tax),
			total: toCurrency(total),
			status: "pending",
			shippingAddress: shippingAddress || "Dirección no especificada",
			billingAddress: billingAddress || shippingAddress || "Dirección no especificada",
			paymentMethod: paymentMethod || "credit_card",
		};

		return await createOrderApi(orderPayload);
	}, []);

	const getOrders = useCallback(async () => {
		const response = await getOrdersApi();
		return response;
	}, []);

	const getUserOrders = useCallback(async (userId) => {
		const allOrders = await getOrdersApi();
		const pedidos = Array.isArray(allOrders) ? allOrders : allOrders.data || [];
		const userOrders = pedidos.filter((order) => order.userId === userId || order.user?._id === userId);
		
		return userOrders;
	}, []);

	return { createOrder, getOrders, getUserOrders };
};
