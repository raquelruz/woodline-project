import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";
import { saveCartInLocalStorage } from "./cart.service.js";
import { updateCartApi, createCartApi } from "./cart.api.js";
import { normalizeCart } from "../../helpers/normalizeCart.js";

export const useCart = () => {
	const { cart, setCart } = useContext(CartContext);

	const addToCart = async (product, qty = 1) => {
		try {
			if (!cart?.id) {
				console.warn("⚠️ No hay carrito, creando uno nuevo...");
				const newCart = await createCartApi();
				const normalized = normalizeCart(newCart);
				setCart(normalized);
				saveCartInLocalStorage(normalized);

				const updatedItems = [
					{
						productId: product._id || product.id,
						name: product.name,
						images: product.images,
						quantity: qty,
						price: product.price,
					},
				];

				const response = await updateCartApi(normalized.id, updatedItems);
				const finalCart = normalizeCart(response);
				setCart(finalCart);
				saveCartInLocalStorage(finalCart);
				console.log("✅ Producto añadido en carrito nuevo:", finalCart);
				return;
			}

			console.log("➕ addToCart()", { product, qty });
			console.log("🟡 cart.id que voy a usar en PATCH:", cart.id);

			const updatedItems = [
				...(cart.items || []),
				{
					productId: product._id || product.id,
					name: product.name,
					images: product.images,
					quantity: qty,
					price: product.price,
				},
			];

			const response = await updateCartApi(cart.id, updatedItems);
			const normalized = normalizeCart(response);
			setCart(normalized);
			saveCartInLocalStorage(normalized);
			console.log("✅ Producto añadido:", normalized);
		} catch (err) {
			if (err.response?.status === 404) {
				console.warn("⚠️ Carrito no encontrado en backend. Creando uno nuevo...");

				const newCart = await createCartApi();
				const normalized = normalizeCart(newCart);
				setCart(normalized);
				saveCartInLocalStorage(normalized);

				const updatedItems = [
					{
						productId: product._id || product.id,
						name: product.name,
						images: product.images,
						quantity: qty,
						price: product.price,
					},
				];

				const response = await updateCartApi(normalized.id, updatedItems);
				const finalCart = normalizeCart(response);
				setCart(finalCart);
				saveCartInLocalStorage(finalCart);
				console.log("✅ Producto añadido tras recrear carrito:", finalCart);
			} else {
				console.error("❌ Error añadiendo producto:", err);
			}
		}
	};

	const removeFromCart = async (productId) => {
		if (!cart?.id) return;

		const updatedItems = cart.items.filter((p) => p.productId !== productId);

		const response = await updateCartApi(cart.id, updatedItems);
		const normalized = normalizeCart(response);
		setCart(normalized);
		saveCartInLocalStorage(normalized);
	};

	const incrementQty = async (productId) => {
		if (!cart?.id) return;

		const updatedItems = cart.items.map((p) =>
			p.productId === productId ? { ...p, quantity: (p.quantity || 1) + 1 } : p
		);

		const response = await updateCartApi(cart.id, updatedItems);
		const normalized = normalizeCart(response);
		setCart(normalized);
		saveCartInLocalStorage(normalized);
	};

	const decrementQty = async (productId) => {
		if (!cart?.id) return;

		const updatedItems = cart.items.map((p) =>
			p.productId === productId ? { ...p, quantity: Math.max((p.quantity || 1) - 1, 1) } : p
		);

		const response = await updateCartApi(cart.id, updatedItems);
		const normalized = normalizeCart(response);
		setCart(normalized);
		saveCartInLocalStorage(normalized);
	};

	const clearCart = async () => {
		if (!cart?.id) return;

		const response = await updateCartApi(cart.id, []);
		const normalized = normalizeCart(response);
		setCart(normalized);
		saveCartInLocalStorage(normalized);
	};

	return {
		items: cart.items || [],
		addToCart,
		removeFromCart,
		incrementQty,
		decrementQty,
		clearCart,
	};
};
