import { useOrders } from "../hooks/useOrders";

export const OrderTable = () => {
	const { orders, loading, updateStatus } = useOrders();

	if (loading) {
		return <p className="text-center mt-4 text-gray-500">Cargando pedidos...</p>;
	}

	if (!orders.length) {
		return <p className="text-center mt-4 text-gray-500">No hay pedidos registrados.</p>;
	}

	const translateStatus = (status) => {
		switch (status) {
			case "pending":
				return "Pendiente";
			case "preparing":
				return "Preparando";
			case "delivered":
				return "Entregado";
			case "cancelled":
				return "Cancelado";
			default:
				return "Desconocido";
		}
	};

	const getStatusBadge = (status) => {
		const base = "px-3 py-1 rounded-full text-xs font-semibold capitalize";
		switch (status) {
			case "pending":
				return `${base} bg-yellow-100 text-yellow-700`;
			case "preparing":
				return `${base} bg-blue-100 text-blue-700`;
			case "delivered":
				return `${base} bg-green-100 text-green-700`;
			case "cancelled":
				return `${base} bg-red-100 text-red-700`;
			default:
				return `${base} bg-gray-100 text-gray-600`;
		}
	};

	return (
		<div className="bg-white rounded-xl shadow-md border border-gray-100 mt-6 overflow-hidden">
			{/* DESKTOP */}
			<div className="hidden md:block overflow-x-auto">
				<table className="min-w-full text-sm">
					<thead className="bg-primary text-white">
						<tr>
							<th className="text-left px-4 py-3 font-medium">Cliente</th>
							<th className="text-left px-4 py-3 font-medium">Fecha</th>
							<th className="text-left px-4 py-3 font-medium">Total (€)</th>
							<th className="text-left px-4 py-3 font-medium">Estado actual</th>
							<th className="text-left px-4 py-3 font-medium">Actualizar estado</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-100">
						{orders.map((order) => (
							<tr key={order.id || order._id} className="hover:bg-gray-50 transition">
								<td className="px-4 py-3 text-gray-700">{order.userId}</td>
								<td className="px-4 py-3 text-gray-500">
									{new Date(order.placedAt).toLocaleDateString("es-ES")}
								</td>
								<td className="px-4 py-3 font-semibold text-gray-800">{order.total} €</td>

								<td className="px-4 py-3">
									<span className={getStatusBadge(order.status)}>
										{translateStatus(order.status)}
									</span>
								</td>

								<td className="px-4 py-3">
									<select
										value={order.status}
										onChange={(event) => updateStatus(order.id || order._id, event.target.value)}
										className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-primary"
									>
										<option value="pending">Pendiente</option>
										<option value="preparing">Preparando</option>
										<option value="delivered">Entregado</option>
										<option value="cancelled">Cancelado</option>
									</select>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* MOBILE */}
			<div className="md:hidden flex flex-col gap-4 p-4">
				{orders.map((order) => (
					<div
						key={order.id || order._id}
						className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
					>
						<div className="flex justify-between items-center mb-3">
							<h3 className="font-title font-semibold text-primary">Pedido #{order.id?.slice(-6)}</h3>
							<span className={getStatusBadge(order.status)}>
								{translateStatus(order.status)}
							</span>
						</div>

						<p className="text-gray-600 text-sm">
							<strong>Cliente:</strong> {order.userId}
						</p>
						<p className="text-gray-600 text-sm">
							<strong>Fecha:</strong> {new Date(order.placedAt).toLocaleDateString("es-ES")}
						</p>
						<p className="text-gray-600 text-sm mb-3">
							<strong>Total:</strong> {order.total} €
						</p>

						<div>
							<label className="block text-xs font-semibold text-gray-500 mb-1">
								Actualizar estado:
							</label>
							<select
								value={order.status}
								onChange={(event) => updateStatus(order.id || order._id, event.target.value)}
								className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-primary"
							>
								<option value="pending">Pendiente</option>
								<option value="preparing">Preparando</option>
								<option value="delivered">Entregado</option>
								<option value="cancelled">Cancelado</option>
							</select>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
