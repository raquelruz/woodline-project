import { createOrderApi, getOrdersApi } from "./orders.api.js";
import { calculateSubtotal, calculateTax, toCurrency } from "../../helpers/orders.helpers.js";

export const useOrders = () => {
	const createOrder = async (userId, items, { shippingAddress, billingAddress, paymentMethod }) => {
		if (!items?.length) throw new Error("No hay productos en el carrito");

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

		console.log("📦 Payload enviado a /orders:", orderPayload);

		return await createOrderApi(orderPayload);
	};

	/** Obtener pedidos de un usuario */
	const getOrders = async () => {
		return await getOrdersApi();
	};

	return { createOrder, getOrders };
};
