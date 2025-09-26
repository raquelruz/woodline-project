const cartCard = "flex flex-col md:flex-row items-center justify-between shadow-md rounded-xl p-4 hover:shadow-lg transition"

export const CartItem = ({ item, incrementQty, decrementQty, removeFromCart }) => {
	const id = item._id || item.id;

	return (
		<div className={cartCard}>
			{/* Imagen + info */}
			<div className="flex items-center gap-4 w-full md:w-auto">
				{item.images?.[0] && (
					<img src={item.images[0]} alt={item.name} className="w-28 h-28 rounded-lg object-cover border" />
				)}
				<div>
					<h2 className="font-semibold font-title text-lg text-primary-pressed">{item.name}</h2>
					<p className="text-primary-pressed text-lg mt-1">{(item.price || 0).toFixed(2)} €</p>
				</div>
			</div>

			{/* Controles */}
			<div className="flex items-center gap-3 mt-4 md:mt-0">
				<button
					onClick={() => decrementQty(id)}
					className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-40"
					disabled={(item.quantity || 1) <= 1}
				>
					−
				</button>
				<span className="w-8 text-center font-semibold">{item.quantity || 1}</span>
				<button
					onClick={() => incrementQty(id)}
					className="px-3 py-1 border border-gray-300 rounded-lg bg-primary-hover text-white hover:bg-primary-pressed"
				>
					+
				</button>
				<button
					onClick={() => removeFromCart(id)}
					className="font-bold ml-3 text-red-500 hover:text-red-700"
					title="Remove"
				>
					✕
				</button>
			</div>
		</div>
	);
};
