import { memo, useMemo } from "react";

export const OrderProductList = memo(({ items }) => {
	const productList = useMemo(() => {
		if (!items || items.length === 0) {
			return <p className="text-gray-500 text-center py-4">No hay productos en este pedido.</p>;
		}

		// console.log("Render ProductList");

		return (
			<ul className="divide-y divide-gray-200">
				{items.map((item) => (
					<li
						key={item.productId || item.id || item._id}
						className="flex justify-between items-center py-4 hover:bg-white rounded-lg px-2 transition"
					>
						<div>
							<p className="font-medium text-gray-800">{item.name}</p>
							<p className="text-sm text-gray-500">Cantidad: {item.quantity || 1}</p>
						</div>

						<p className="font-semibold text-gray-700">{Number(item.price).toFixed(2)} €</p>
					</li>
				))}
			</ul>
		);
	}, [items]);

	return productList;
});
