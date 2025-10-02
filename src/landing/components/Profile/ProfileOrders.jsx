export const ProfileOrders = ({ orders, handleViewOrder }) => {
	return (
		<div className="mt-10">
			<h2 className="text-2xl font-semibold mb-4">Últimos pedidos</h2>
			{orders.length === 0 ? (
				<p className="text-gray-500">No tienes pedidos recientes.</p>
			) : (
				<ul className="space-y-4">
					{orders.map((order, index) => (
						<li
							key={order._id || order.id || index}
							className="border rounded p-4 shadow-sm flex justify-between items-center"
						>
							<div>
								<p className="font-medium">Pedido #{order._id || order.id}</p>
								<p className="text-sm text-gray-500">
									{new Date(order.createdAt).toLocaleDateString()}
								</p>
							</div>
							<div className="text-right flex flex-col gap-2">
								<p className="font-semibold text-primary-hover">{order.total} €</p>
								<button
									onClick={() => handleViewOrder(order._id || order.id)}
									className="text-sm text-blue-600 hover:underline"
								>
									Ver detalle
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
