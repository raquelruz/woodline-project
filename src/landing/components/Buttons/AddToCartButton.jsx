import { memo, useCallback, useState } from "react";
import { useCart } from "../../../core/cart/useCart";
import { IoCartOutline, IoCheckmarkCircle } from "react-icons/io5";

export const AddToCartButton = memo(({ product }) => {
	const { addToCart } = useCart();
	const [added, setAdded] = useState(false);

	const handleAdd = useCallback(() => {
		if (!product) return;

		addToCart(product);
		setAdded(true);

		const timeout = setTimeout(() => setAdded(false), 2000);
		return () => clearTimeout(timeout);
	}, [product, addToCart]);

	const isAdded = added;

	const buttonClasses = [
		"flex items-center justify-center gap-3 font-semibold py-4 rounded-xl text-lg shadow-md transition-all duration-300 w-full text-white",
		isAdded ? "bg-green-500 hover:bg-green-600" : "bg-primary hover:bg-primary-light hover:shadow-lg",
	].join(" ");

	const Icon = isAdded ? IoCheckmarkCircle : IoCartOutline;
	const label = isAdded ? "Añadido al carrito" : "Añadir al carrito";

	return (
		<button onClick={handleAdd} className={buttonClasses}>
			<Icon className="text-2xl" />
			{label}
		</button>
	);
});
