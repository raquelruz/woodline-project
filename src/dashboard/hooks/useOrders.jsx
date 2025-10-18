import { useEffect, useState } from "react";
import { api } from "../../core/http/axios";

export const useOrders = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchOrders();
	}, []);

	const fetchOrders = async () => {
		try {
			setLoading(true);
			const response = await api.get("/orders");
			setOrders(Array.isArray(response.data) ? response.data : []);
		} catch (error) {
			console.error("Error al cargar pedidos:", error);
		} finally {
			setLoading(false);
		}
	};

	const updateStatus = async (orderId, newStatus) => {
		if (!orderId) {
			console.error("orderId no válido:", orderId);
			return;
		}

		try {
			const response = await api.patch(`/orders/${orderId}/status`, { status: newStatus });
			console.log("Pedido actualizado:", response.data);
			fetchOrders();
		} catch (error) {
			console.error("Error al actualizar estado:", error.response?.data || error.message);
		}
	};

	return { orders, loading, fetchOrders, updateStatus };
};
