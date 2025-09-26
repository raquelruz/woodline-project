import { useCart } from "../../core/cart/useCart.jsx";

export const CartPage = () => {
	const { items, removeFromCart } = useCart();

	console.log("Items en CartPage:", items);

	const total = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-4">🛒 Carrito</h1>

			{items.length === 0 ? (
				<p>Tu carrito está vacío</p>
			) : (
				<ul className="space-y-4">
					{items.map((item) => (
						<li
							key={item._id || item.id} 
							className="flex items-center gap-4 bg-white shadow p-4 rounded-lg"
						>
							{item.image && (
								<img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded" />
							)}
							<div className="flex-1">
								<h2 className="font-bold">{item.name}</h2>
								<p>{item.price} €</p>
								<p>Cantidad: {item.quantity}</p>
							</div>
							<button
								onClick={() => removeFromCart(item._id || item.id)}
								className="bg-red-500 text-white px-3 py-1 rounded"
							>
								Eliminar
							</button>
						</li>
					))}
				</ul>
			)}

			<h2 className="text-xl font-bold mt-6">Total: {total} €</h2>
		</div>
	);
};
