import { memo, useMemo } from "react";

export const EmptyCart = memo(() => {
	const buttonClasses = useMemo(
		() => "bg-primary-light text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary transition",
		[]
	);

	// console.log("Render EmptyCart");

	return (
		<div className="flex flex-col items-center justify-center py-20 text-center">
			<p className="text-gray-500 text-lg mb-6">Tu carrito está vacío.</p>

			<a href="/products" className={buttonClasses}>
				Ver productos
			</a>
		</div>
	);
});
