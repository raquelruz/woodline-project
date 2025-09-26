import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";
import { addToCartApi, updateCartItemApi, removeCartItemApi, clearCartApi } from "../../core/cart/cart.api.js";

// Normalizar carrito en un formato homogéneo
const normalize = (cart) => {
	const active = Array.isArray(cart) ? cart.find((c) => c.status === "active") : cart;

	return (
		active?.items?.map((i) => ({
			cartId: active.id,
			productId: i.productId,
			name: i.name,
			price: i.price,
			images: i.images || [],
			quantity: i.quantity || 1,
		})) || []
	);
};

export const useCart = () => {
	const { items, setItems } = useContext(CartContext);

	const addToCart = async (product, qty = 1) => {
		const updated = await addToCartApi(product, qty);
		setItems(normalize(updated));
	};

	const updateQuantity = async (productId, qty) => {
		const updated = await updateCartItemApi(productId, qty);
		setItems(normalize(updated));
	};

	const incrementQty = async (productId) => {
		const item = items.find((i) => i.productId === productId);
		if (!item) return;
		const updated = await updateCartItemApi(productId, item.quantity + 1);
		setItems(normalize(updated));
	};

	const decrementQty = async (productId) => {
		const item = items.find((i) => i.productId === productId);
		if (!item || item.quantity <= 1) return;
		const updated = await updateCartItemApi(productId, item.quantity - 1);
		setItems(normalize(updated));
	};

	const removeFromCart = async (productId) => {
		const updated = await removeCartItemApi(productId);
		setItems(normalize(updated));
	};

	const clearCart = async () => {
		await clearCartApi();
		setItems([]);
	};

	return {
		items,
		addToCart,
		updateQuantity,
		incrementQty,
		decrementQty,
		removeFromCart,
		clearCart,
	};
};
