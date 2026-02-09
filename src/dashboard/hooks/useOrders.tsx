import { useEffect, useState, useCallback } from "react";
import { api } from "../../core/http/axios";
import type { Order, OrderStatus } from "../../core/orders/orders.types";
import type { AxiosError } from "axios";

type UseOrdersReturn = {
	orders: Order[];
	loading: boolean;
	error: string | null;
	fetchOrders: (userId?: string) => Promise<void>;
	updateStatus: (orderId: string, newStatus: OrderStatus) => Promise<void>;
};

export const useOrders = (): UseOrdersReturn => {
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchOrders = useCallback(async (userId?: string): Promise<void> => {
		try {
			setLoading(true);
			setError(null);

			const url = userId ? `/orders?userId=${userId}` : "/orders";
			const { data } = await api.get<Order[]>(url);
			setOrders(Array.isArray(data) ? data : []);
			setOrders(data);
		} catch (error) {
			const e = error as AxiosError<{ message?: string }>;
			setError(e.response?.data?.message ?? e.message ?? "No se pudieron cargar los pedidos.");
			setError("No se pudieron cargar los pedidos.");
		} finally {
			setLoading(false);
		}
	}, []);

	const updateStatus = async (orderId: string, newStatus: OrderStatus): Promise<void> => {
		if (!orderId) return;
		await api.patch(`/orders/${orderId}/status`, { status: newStatus });
		await fetchOrders();
	};

	useEffect(() => {
		fetchOrders();
	}, [fetchOrders]);

	return { orders, loading, error, fetchOrders, updateStatus };
};
