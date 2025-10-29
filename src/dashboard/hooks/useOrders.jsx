import { useEffect, useState, useCallback } from "react";
import { api } from "../../core/http/axios";

export const useOrders = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchOrders = useCallback(async (userId = null) => {
		try {
			setLoading(true);
			setError(null);

			const url = userId ? `/orders?userId=${userId}` : "/orders";
			const response = await api.get(url);
			const data = Array.isArray(response.data) ? response.data : [];
			setOrders(data);
		} catch (error) {
			// console.error("Error al obtener pedidos:", error);
			setError("No se pudieron cargar los pedidos.");
		} finally {
			setLoading(false);
		}
	}, []);

	const updateStatus = async (orderId, newStatus) => {
		if (!orderId) return;
		await api.patch(`/orders/${orderId}/status`, { status: newStatus });
		await fetchOrders();
	};

	useEffect(() => {
		fetchOrders();
	}, [fetchOrders]);

	return { orders, loading, error, fetchOrders, updateStatus };
};
