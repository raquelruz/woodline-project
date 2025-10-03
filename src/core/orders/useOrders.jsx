import { createOrderApi, getOrdersApi } from "./orders.api.js";
import { calculateSubtotal, calculateTax, toCurrency } from "../../helpers/orders.helpers.js";

export const useOrders = () => {
	/** Crear un pedido */
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

	/** Obtener todos los pedidos */
	const getOrders = async () => {
		console.log("Llamando a getOrdersApi()");
		const res = await getOrdersApi();
		console.log("Respuesta completa de getOrdersApi:", res);
		return res;
	};

	/** Obtener pedidos de un usuario específico */
	const getUserOrders = async (userId) => {
		console.log("Buscando pedidos del usuario:", userId);
		const allOrders = await getOrdersApi();
		console.log("Pedidos obtenidos de la API:", allOrders);

		const pedidos = Array.isArray(allOrders) ? allOrders : allOrders.data || [];

		console.log("Array normalizado de pedidos:", pedidos);

		const userOrders = pedidos.filter((order) => order.userId === userId || order.user?._id === userId);

		console.log("Pedidos filtrados del usuario:", userOrders);

		return userOrders;
	};

	return { createOrder, getOrders, getUserOrders };
};
