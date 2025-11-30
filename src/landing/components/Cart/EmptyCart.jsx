export const EmptyCart = () => {
	return (
		<div className="flex flex-col items-center justify-center py-20 text-center">
			<p className="text-gray-500 text-lg mb-6">
				Tu carrito está vacío.
			</p>

			<a
				href="/products"
				className="bg-primary-light text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary transition"
			>
				Ver productos
			</a>
		</div>
	);
};
