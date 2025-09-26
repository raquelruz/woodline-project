import { useCart } from "../../core/cart/useCart.jsx";

export const AddToCartButton = ({ product }) => {
	const { addToCart } = useCart();

	const handleAdd = () => {
		if (!product || !product._id) {
			console.error("Producto inválido en AddToCartButton:", product);
			return;
		}

		console.log("Producto recibido en AddToCartButton:", product);
		addToCart(product);
	};

	return (
		<button
			onClick={handleAdd}
			className="px-8 py-2 bg-primary-hover font-landing text-white rounded-lg hover:bg-primary-pressed cursor-pointer transition"
		>
			Añadir al carrito
		</button>
	);
};
