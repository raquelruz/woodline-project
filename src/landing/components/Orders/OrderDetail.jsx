import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrdersApi } from "../../../core/orders/orders.api";
import { Loader } from "../Loader";

const containerClass = "p-4 bg-dark rounded-lg shadow-sm";
const descriptionClass = "text-black text-sm";
const detailsClass = "text-lg font-semibold text-primary";

export const OrderDetail = () => {
	const { id } = useParams();
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchOrder() {
			try {
				const response = await getOrdersApi();
				const pedidos = Array.isArray(response) ? response : response.data || [];
				const found = pedidos.find((pedido) => pedido._id === id || pedido.id === id);

				setOrder(found || null);
			} catch (error) {
				console.error("Error al obtener pedido:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchOrder();
	}, [id]);

	if (loading) {
		return <Loader text="Cargando pedido..." />;
	}

	if (!order) {
		return <p className="text-error text-center mt-10">Pedido no encontrado.</p>;
	}

	function formatOrderId(orderId) {
		if (!orderId) return "Desconocido";
		const idString = String(orderId);
		return idString.slice(-5);
	}

	function translateStatus(status) {
		if (status === "pending") return "Pendiente";
		if (status === "completed") return "Completado";
		if (status === "cancelled") return "Cancelado";
		return "Desconocido";
	}

	const formattedDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Fecha desconocida";

	return (
		<div className="max-w-4xl mx-auto p-8">
			<h4 className="font-title font-bold text-primary-pressed mb-6 text-center">
				Pedido #{formatOrderId(order._id || order.id)}
			</h4>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<div className={containerClass}>
					<p className={descriptionClass}>Fecha</p>
					<p className={detailsClass}>{formattedDate}</p>
				</div>

				<div className={containerClass}>
					<p className={descriptionClass}>Total</p>
					<p className={detailsClass}>{order.total} €</p>
				</div>

				<div className={containerClass}>
					<p className={descriptionClass}>Estado</p>
					<span
						className={`px-3 py-1 text-sm rounded-full font-medium 
						${order.status === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
						${order.status === "completed" ? "bg-green-100 text-green-700" : ""}
						${order.status === "cancelled" ? "bg-red-100 text-red-700" : ""}`}
					>
						{translateStatus(order.status)}
					</span>
				</div>
			</div>

			<h2 className="font-title font-semibold mb-4 border-b pb-2">Productos</h2>
			<ul className="divide-y divide-bg-dark">
				{order.items?.map((item, index) => (
					<li key={item.productId || index} className="flex justify-between items-center py-4">
						<div>
							<p className="font-medium">{item.name}</p>
							<p className="text-sm text-gray-500">Cantidad: {item.qty}</p>
						</div>
						<p className="font-semibold">{item.price} €</p>
					</li>
				))}
			</ul>

			<div className="mt-8 text-center">
				<Link
					to="/profile"
					className="inline-block bg-primary text-white px-6 py-2 rounded-lg shadow hover:bg-primary-light transition"
				>
					← Volver al perfil
				</Link>
			</div>
		</div>
	);
};
