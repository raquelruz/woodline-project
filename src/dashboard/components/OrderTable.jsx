import { OrderStatusBadge } from "./OrderStatusBadge";

export const OrderTable = ({ orders, onUpdate }) => {
	if (!orders.length) {
		return (
			<p className="text-center text-gray-500 mt-6">
				No hay pedidos registrados.
			</p>
		);
	}

	return (
		<div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100 mt-6">
			<table className="min-w-full text-sm">
				<thead className="bg-primary text-white">
					<tr>
						<th className="text-left px-4 py-3 font-medium">Cliente</th>
						<th className="text-left px-4 py-3 font-medium">Fecha</th>
						<th className="text-left px-4 py-3 font-medium">Total</th>
						<th className="text-left px-4 py-3 font-medium">Estado</th>
						<th className="text-center px-4 py-3 font-medium">Acciones</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-gray-100">
					{orders.map((order, index) => {
						const key = order._id || order.id || `order-${index}`;
						return (
							<tr key={key} className="hover:bg-gray-50 transition">
								<td className="px-4 py-3">{order.userId}</td>
								<td className="px-4 py-3">
									{order.createdAt
										? new Date(order.createdAt).toLocaleDateString()
										: "—"}
								</td>
								<td className="px-4 py-3 font-semibold">
									{order.total ? `${order.total} €` : "—"}
								</td>
								<td className="px-4 py-3">
									<OrderStatusBadge status={order.status} />
								</td>
								<td className="px-4 py-3 text-center">
									<select
										value={order.status}
										onChange={(e) => onUpdate(order, e.target.value)}
										className="border rounded-md px-2 py-1 text-sm focus:ring-primary focus:ring-1"
									>
										<option value="pending">Pendiente</option>
										<option value="sent">Enviado</option>
										<option value="completed">Completado</option>
										<option value="cancelled">Cancelado</option>
									</select>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
