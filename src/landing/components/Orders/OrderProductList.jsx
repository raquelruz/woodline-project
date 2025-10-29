export const OrderProductList = ({ items }) => {
	if (!items || items.length === 0) {
		return <p className="text-gray-500 text-center py-4">No hay productos en este pedido.</p>;
	}

	return (
		<ul className="divide-y divide-gray-200">
			{items.map((item, index) => (
				<li
					key={item.productId || index}
					className="flex justify-between items-center py-4 hover:bg-white rounded-lg px-2 transition"
				>
					<div>
						<p className="font-medium text-gray-800">{item.name}</p>
						<p className="text-sm text-gray-500">Cantidad: {item.qty}</p>
					</div>
					<p className="font-semibold text-gray-700">{item.price} €</p>
				</li>
			))}
		</ul>
	);
};
