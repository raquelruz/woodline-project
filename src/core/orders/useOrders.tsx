import { useCallback } from "react";
import { createOrderApi, getOrdersApi } from "./orders.api";
import { calculateSubtotal, calculateTax, toCurrency } from "../../helpers/orders.helpers";
import type { CartProduct } from "../cart/cart.types";
import type { CreateOrderPayload, Order } from "./orders.types";

type CreateOrderOptions = {
	shippingAddress?: string;
	billingAddress?: string;
	paymentMethod?: "credit_card" | "paypal" | string;
};

export const useOrders = () => {
	const createOrder = useCallback(
		async (
			userId: string,
			items: CartProduct[],
			{ shippingAddress, billingAddress, paymentMethod }: CreateOrderOptions
		): Promise<Order> => {
			if (!items.length) throw new Error("No hay productos en el carrito");

			const subtotal = calculateSubtotal(items); 
			const tax = calculateTax(subtotal);        
			const total = subtotal + tax;

			const orderPayload: CreateOrderPayload = {
				userId,
				products: items.map((item) => ({
					productId: (item.productId ?? item.id) as string,
					quantity: item.quantity ?? 1,
					price: toCurrency(item.price),
					name: item.name,
				})),
				subtotal: toCurrency(subtotal),
				tax: toCurrency(tax),
				total: toCurrency(total),
				status: "pending",
				paymentStatus: "pending",
				shippingAddress: shippingAddress ?? "Dirección no especificada",
				billingAddress: billingAddress ?? shippingAddress ?? "Dirección no especificada",
				paymentMethod: paymentMethod ?? "credit_card",
			};

			return await createOrderApi(orderPayload);
		},
		[]
	);

	const getOrders = useCallback(async (): Promise<Order[]> => {
		const response = await getOrdersApi();
		return response;
	}, []);

	const getUserOrders = useCallback(
		async (userId: string): Promise<Order[]> => {
			const allOrders = await getOrdersApi();
			const userOrders = allOrders.filter(
				(order) => order.userId === userId || (order as any).user?._id === userId
			);

			return userOrders;
		},
		[]
	);

	return { createOrder, getOrders, getUserOrders };
};
