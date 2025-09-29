import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";
import { saveCartInLocalStorage } from "./cart.service.js";
import { normalizeCart } from "../../helpers/normalizeCart.js";
import { getTokenFromLocalStorage } from "../auth/auth.service.js";
import { createOrderApi } from "../orders/orders.api.js";

export const useCart = () => {
	const { cart, setCart } = useContext(CartContext);

	/** Añadir producto al carrito (frontend only) */
	const addToCart = (product, qty = 1) => {
		console.log("➕ addToCart()", { product, qty });

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

		const newCart = normalizeCart({ ...cart, items: updatedItems });
		setCart(newCart);
		saveCartInLocalStorage(newCart);

		console.log("✅ Producto añadido:", newCart);
	};

	/** Quitar producto */
	const removeFromCart = (productId) => {
		const updatedItems = cart.items.filter((p) => p.productId !== productId);
		const newCart = normalizeCart({ ...cart, items: updatedItems });

		setCart(newCart);
		saveCartInLocalStorage(newCart);
	};

	/** Incrementar cantidad */
	const incrementQty = (productId) => {
		const updatedItems = cart.items.map((p) =>
			p.productId === productId ? { ...p, quantity: (p.quantity || 1) + 1 } : p
		);

		const newCart = normalizeCart({ ...cart, items: updatedItems });
		setCart(newCart);
		saveCartInLocalStorage(newCart);
	};

	/** Decrementar cantidad */
	const decrementQty = (productId) => {
		const updatedItems = cart.items.map((p) =>
			p.productId === productId ? { ...p, quantity: Math.max((p.quantity || 1) - 1, 1) } : p
		);

		const newCart = normalizeCart({ ...cart, items: updatedItems });
		setCart(newCart);
		saveCartInLocalStorage(newCart);
	};

	/** Vaciar carrito */
	const clearCart = () => {
		const newCart = normalizeCart({ ...cart, items: [] });
		setCart(newCart);
		saveCartInLocalStorage(newCart);
	};

	/** Checkout → crear pedido en backend */
	const checkout = async (userId) => {
		try {
			const token = getTokenFromLocalStorage();
			if (!token) throw new Error("No estás logueado");

			const order = await createOrderApi({
				userId,
				items: cart.items,
				status: "pending",
			});

			console.log("✅ Pedido creado:", order);
			clearCart(); // opcional: limpiar después de pedido
			return order;
		} catch (err) {
			console.error("❌ Error en checkout:", err);
			throw err;
		}
	};

	return {
		items: cart.items || [],
		addToCart,
		removeFromCart,
		incrementQty,
		decrementQty,
		clearCart,
		checkout,
	};
};
