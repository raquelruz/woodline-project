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
			alert("Error al obtener los pedidos.");
		} finally {
			setLoading(false);
		}
	};

	const updateStatus = async (order, newStatus) => {
		try {
			const orderId = order._id || order.id;
			if (!orderId) {
				console.error("Pedido sin ID válido:", order);
				alert("No se pudo actualizar este pedido (sin ID).");
				return;
			}

			await api.patch(`/orders/${orderId}`, { status: newStatus });

			setOrders((prev) =>
				prev.map((order) =>
					(order._id || order.id) === orderId ? { ...order, status: newStatus } : order
				)
			);

			console.log(`Pedido ${orderId} actualizado a ${newStatus}`);
		} catch (error) {
			console.error("Error al actualizar estado:", error);
			alert("No se pudo actualizar el pedido.");
		}
	};

	return { orders, loading, updateStatus };
};
