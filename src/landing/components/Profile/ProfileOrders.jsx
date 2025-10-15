export const ProfileOrders = ({ orders, handleViewOrder }) => {
	function formatOrderId(id) {
		if (!id) return "Desconocido";
		const idString = String(id);
		return idString.slice(-5); 
	}

	if (orders.length === 0) {
		return (
			<div className="mt-10">
				<h2 className="text-2xl font-semibold mb-4">Últimos pedidos</h2>
				<p className="text-gray-500">No tienes pedidos recientes.</p>
			</div>
		);
	} else {
		return (
			<div className="mt-10">
				<h2 className="text-2xl font-semibold mb-4">Últimos pedidos</h2>
				<ul className="space-y-4">
					{orders.map((order, index) => {
						const orderId = order._id || order.id || index;
						const shortId = formatOrderId(orderId);
						const orderDate = order.createdAt
							? new Date(order.createdAt).toLocaleDateString()
							: "Fecha desconocida";

						return (
							<li
								key={orderId}
								className="border rounded p-4 shadow-sm flex justify-between items-center"
							>
								<div>
									<p className="font-medium">Pedido #{shortId}</p>
									<p className="text-sm text-gray-500">{orderDate}</p>
								</div>

								<div className="text-right flex flex-col gap-2">
									<p className="font-semibold text-primary">{order.total} €</p>
									<button
										onClick={() => handleViewOrder(orderId)}
										className="text-sm bg-primary py-2 px-4 text-white rounded-md hover:bg-primary-light transition-all"
									>
										Ver detalles
									</button>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
};
