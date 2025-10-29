import { translateStatus, getStatusClass, isRecentOrder, formatDate } from "../../utils/orderUtils.js";
import { useNavigate } from "react-router-dom";

export const OrderRow = ({ order, onChange }) => {
	const navigate = useNavigate();

	const orderId = order._id || order.id;
	const customerName = order._id || order.id?.slice(-6) || "Pedido desconocido";
	const orderDate = formatDate(order.placedAt);
	const orderTotal = order.total ? `${order.total} €` : "—";
	const recent = isRecentOrder(order.placedAt);

	const handleChange = (event) => {
		const newStatus = event.target.value;

		if (newStatus === "cancelled") {
			const confirmed = window.confirm("¿Seguro que quieres cancelar este pedido?");
			if (!confirmed) return;
		}

		onChange(orderId, newStatus);
	};

	// Desktop
	return (
		<tr key={orderId} className="hover:bg-gray-50 transition">
			<td className="px-4 py-3 text-gray-700">
				<div className="flex items-center gap-2">
					<span>{customerName}</span>
					{recent && (
						<span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
							Nuevo
						</span>
					)}
				</div>
			</td>

			<td className="px-4 py-3 text-gray-500">{orderDate}</td>

			<td className="px-4 py-3 font-semibold text-gray-800">{orderTotal}</td>

			<td className="px-4 py-3">
				<span className={getStatusClass(order.status)}>{translateStatus(order.status)}</span>
			</td>

			<td className="px-4 py-3 flex items-center gap-3">
				<select
					value={order.status}
					onChange={handleChange}
					className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
				>
					<option value="pending">Pendiente</option>
					<option value="preparing">Preparando</option>
					<option value="delivered">Entregado</option>
					<option value="cancelled">Cancelado</option>
				</select>
			</td>
			<td>
				<button
					type="button"
					onClick={() => navigate(`/orders/${orderId}`)}
					className="flex items-center gap-1 text-primary hover:text-primary-light transition text-sm font-semibold"
				>
					<span role="img" aria-label="ver detalles">
						🔍
					</span>
					Ver detalles
				</button>
			</td>
		</tr>
	);
};
