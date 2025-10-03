import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrdersApi } from "../../../core/orders/orders.api";

const containerClass = "p-4 bg-dark rounded-lg shadow-sm";
const descriptionClass = "text-black text-sm";
const detailsClass = "text-lg font-semibold text-primary";

export const OrderDetail = () => {
	const { id } = useParams();
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// console.log("Buscando pedido con id:", id);

		getOrdersApi().then((response) => {
			const pedidos = Array.isArray(response) ? response : response.data || [];
			const found = pedidos.find((pedido) => pedido._id === id || pedido.id === id);

			// console.log("Pedido encontrado:", found);
			setOrder(found || null);
			setLoading(false);
		});
	}, [id]);

	if (loading) return <p>Cargando pedido...</p>;
	if (!order) return <p className="text-error">Pedido no encontrado.</p>;

	// console.log("Pedido completo:", order);

	return (
		<div className="max-w-4xl mx-auto p-8">
			{/* Encabezado */}
			<h4 className="font-title font-bold text-primary-pressed mb-6 text-center">
				Pedido #{order._id || order.id}
			</h4>

			{/* Info del pedido */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<div className={containerClass}>
					<p className={descriptionClass}>Fecha</p>
					<p className={detailsClass}>{new Date(order.createdAt).toLocaleDateString()}</p>
				</div>

				<div className={containerClass}>
					<p className={descriptionClass}>Total</p>
					<p className={detailsClass}>{order.total} €</p>
				</div>

				<div className={containerClass}>
					<p className={descriptionClass}>Estado</p>
					<span
						className={`px-3 py-1 text-sm rounded-full font-medium 
            ${order.status === "pending" ? "bg-warning text-warning-light" : ""} 
            ${order.status === "completed" ? "bg-success text-success-light" : ""} 
            ${order.status === "cancelled" ? "bg-error text-error-light" : ""}`}
					>
						{order.status}
					</span>
				</div>
			</div>

			{/* Lista de productos */}
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

			{/* Botón volver */}
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
