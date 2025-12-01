import { memo, useMemo } from "react";

const cartCard =
	"flex flex-col md:flex-row items-center justify-between shadow-md rounded-xl p-4 hover:shadow-lg transition";

export const CartItem = memo(({ item, incrementQty, decrementQty, removeFromCart }) => {
	const id = useMemo(() => item.productId ?? item._id ?? item.id, [item]);

	useMemo(() => {
		if (!id) console.warn("Item sin ID:", item);
	}, [id, item]);

	const quantity = useMemo(() => item.quantity || 1, [item.quantity]);
	const price = useMemo(() => (item.price || 0).toFixed(2), [item.price]);

	const image = useMemo(() => {
		if (!item.images?.[0]) return null;
		return <img src={item.images[0]} alt={item.name} className="w-28 h-28 rounded-lg object-cover border" />;
	}, [item.images, item.name]);

	// console.log("Render CartItem");

	return (
		<div className={cartCard}>
			<div className="flex items-center gap-4 w-full md:w-auto">
				{image}

				<div>
					<h2 className="font-semibold font-title text-primary">{item.name}</h2>
					<p className="text-primary mt-1">{price} €</p>
				</div>
			</div>

			<div className="flex items-center gap-3 mt-4 md:mt-0">
				<button
					onClick={() => decrementQty(id)}
					className="px-3 py-1 border rounded-lg text-primary hover:bg-gray-200 disabled:opacity-40"
					disabled={quantity <= 1}
					aria-label="Disminuir cantidad"
				>
					−
				</button>

				<span className="w-8 text-center font-semibold">{quantity}</span>

				<button
					onClick={() => incrementQty(id)}
					className="px-3 py-1 border rounded-lg text-primary hover:bg-primary-light"
					aria-label="Aumentar cantidad"
				>
					+
				</button>

				<button
					onClick={() => removeFromCart(id)}
					className="font-bold ml-3 text-error hover:text-red-700"
					title="Eliminar producto"
					aria-label="Eliminar producto"
				>
					✕
				</button>
			</div>
		</div>
	);
});
