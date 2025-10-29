import { translateStatus, getStatusClass, isRecentOrder, formatOrderId, formatDate } from "../../utils/orderUtils.js"
import { useNavigate } from "react-router-dom";

export const OrderCard = ({ order, onChange }) => {
	const navigate = useNavigate();

	const orderId = order._id || order.id;
	const recent = isRecentOrder(order.placedAt);
	const formattedDate = formatDate(order.placedAt);
	const customerName = order.id || order.id?.slice(-6) || "Pedido desconocido";
	const orderTotal = order.total ? `${order.total} €` : "—";
	const statusClass = getStatusClass(order.status);
	const statusLabel = translateStatus(order.status);
	const shortId = formatOrderId(orderId);

	const handleChange = (event) => {
		const newStatus = event.target.value;

		if (newStatus === "cancelled") {
			const confirmed = window.confirm("¿Seguro que quieres cancelar este pedido?");
			if (!confirmed) return;
		}

		onChange(orderId, newStatus);
	};

	// MOBILE
	return (
		<div
			key={orderId}
			className="border border-gray-200 rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition"
		>
			<div className="flex justify-between items-center">
				<h3 className="font-title font-semibold text-primary flex items-center gap-2">
					Pedido #{shortId}
					{recent && (
						<span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
							Nuevo
						</span>
					)}
				</h3>
				<span className={statusClass}>{statusLabel}</span>
			</div>

			<div className="space-y-1.5 mb-4">
				<p className="text-gray-700 text-sm">
					<strong>Cliente:</strong> Pedido #{orderId}
				</p>

				<p className="text-gray-700 text-sm">
					<strong>Fecha:</strong> {formattedDate}
				</p>

				<p className="text-gray-700 text-sm">
					<strong>Total:</strong> {orderTotal}
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<div>
					<label className="block text-xs font-semibold text-gray-500 mb-1">Actualizar estado:</label>

					<select
						value={order.status}
						onChange={handleChange}
						className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
					>
						<option value="pending">Pendiente</option>
						<option value="preparing">Preparando</option>
						<option value="delivered">Entregado</option>
						<option value="cancelled">Cancelado</option>
					</select>
				</div>

				<button
					type="button"
					onClick={() => navigate(`/orders/${orderId}`)}
					className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-primary-light transition text-sm flex items-center justify-center gap-2"
				>
					<span role="img" aria-label="ver detalles">
						🔍
					</span>
					Ver detalles del pedido
				</button>
			</div>
		</div>
	);
};
