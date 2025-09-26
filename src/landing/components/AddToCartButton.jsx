// src/components/cart/AddToCartButton.jsx
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
		<button onClick={handleAdd} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
			Añadir al carrito
		</button>
	);
};
