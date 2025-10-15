import { useCart } from "../../../core/cart/useCart";

export const AddToCartButton = ({ product }) => {
	const { addToCart } = useCart();

	const handleAdd = () => {
		console.log("Producto recibido en AddToCartButton:", product);

		if (!product || (!product._id && !product.id)) {
			console.error("Producto inválido:", product);
			return;
		}

		addToCart(product);
	};

	return (
		<button
			onClick={handleAdd}
			className="px-8 py-2 bg-primary font-landing text-white rounded-lg hover:bg-primary-light cursor-pointer transition"
		>
			Añadir al carrito
		</button>
	);
};
