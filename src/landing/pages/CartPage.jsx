import { useEffect } from "react";
import { useCart } from "../../core/cart/useCart";

export const CartPage = () => {
	const { cart, getCart, updateCartItem, removeFromCart } = useCart();

	useEffect(() => {
		getCart();
	}, []);

	const total = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">🛒 Carrito de compras</h1>

			{cart.length === 0 ? (
				<p className="text-gray-600">Tu carrito está vacío.</p>
			) : (
				<>
					<ul className="space-y-4">
						{cart.map((item) => (
							<li
								key={item.id || item._id || item.sku}
								className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
							>
								<div>
									<h2 className="font-bold text-lg">{item.name}</h2>
									<p className="text-gray-700">
										{item.price} € x {item.quantity} ={" "}
										<span className="font-semibold">
											{(item.price || 0) * (item.quantity || 0)} €
										</span>
									</p>
								</div>

								<div className="flex items-center gap-2">
									<input
										type="number"
										min={1}
										value={item.quantity}
										onChange={(e) =>
											updateCartItem(item.id || item._id || item.sku, parseInt(e.target.value))
										}
										className="w-16 p-1 border rounded text-center"
									/>

									<button
										onClick={() => removeFromCart(item.id || item._id || item.sku)}
										className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
									>
										Eliminar
									</button>
								</div>
							</li>
						))}
					</ul>

					<div className="mt-6 flex justify-end items-center">
						<h2 className="text-xl font-bold">Total: {total} €</h2>
					</div>
				</>
			)}
		</div>
	);
};
