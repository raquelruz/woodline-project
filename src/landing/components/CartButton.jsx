import { useCart } from "../../core/cart/useCart";

export const CartButton = ({ product, quantity = 1 }) => {
	const { addToCart } = useCart();

	const handleAdd = () => {
		if (!product?.id && !product?._id && !product?.sku) {
			console.error("❌ No se encontró un ID válido para el producto:", product);
			return;
		}

		const productId = product.id || product._id || product.sku;
		console.log(`🛒 Añadiendo al carrito: ${productId}, cantidad: ${quantity}`);

		addToCart(productId, quantity);
	};

	return (
		<button
			onClick={handleAdd}
			className="mt-2 px-8 py-3 bg-primary-pressed text-white font-medium rounded-xl hover:bg-primary-hover transition-colors"
		>
			Añadir al carrito
		</button>
	);
};
