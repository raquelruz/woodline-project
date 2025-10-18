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
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const updateStatus = async (orderId, newStatus) => {
		try {
			await api.patch(`/orders/${orderId}/status`, { status: newStatus });
			fetchOrders();
		} catch (error) {
			alert("Error al actualizar estado");
		}
	};

	return { orders, loading, fetchOrders, updateStatus };
};
