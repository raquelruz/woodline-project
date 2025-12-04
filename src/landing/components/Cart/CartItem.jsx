import { memo } from "react";

const cartCard =
	"flex flex-col md:flex-row items-center justify-between shadow-md rounded-xl p-4 hover:shadow-lg transition";

export const CartItem = memo(({ item, incrementQty, decrementQty, removeFromCart }) => {
	const id = item._id || item.id;
	const quantity = item.quantity || 1;

	const handleIncrement = useCallback(() => {
		incrementQty(id);
	}, [incrementQty, id]);

	const handleDecrement = useCallback(() => {
		decrementQty(id);
	}, [decrementQty, id]);

	const handleRemove = useCallback(() => {
		removeFromCart(id);
	}, [removeFromCart, id]);

	const priceText = useMemo(() => (item.price || 0).toFixed(2) + " €", [item.price]);

	// console.log("Render CartItem:", item.name);

	return (
		<div className={cartCard}>
			<div className="flex items-center gap-4 w-full md:w-auto">
				{image}

				<div>
					<h2 className="font-semibold font-title text-primary">{item.name}</h2>
					<p className="text-primary mt-1">{priceText} €</p>
				</div>
			</div>

			<div className="flex items-center gap-3 mt-4 md:mt-0">
				<button
					onClick={handleDecrement}
					className="px-3 py-1 border rounded-lg text-primary hover:bg-gray-200 disabled:opacity-40"
					disabled={quantity <= 1}
				>
					−
				</button>
				<span className="w-8 text-center font-semibold">{quantity}</span>
				<button onClick={handleIncrement} className="px-3 py-1 border rounded-lg text-primary hover:bg-primary">
					+
				</button>

				<button
					onClick={() => handleRemove}
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
