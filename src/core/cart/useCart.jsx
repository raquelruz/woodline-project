import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";
import { saveCartInLocalStorage } from "./cart.service.js";
import { normalizeCart } from "../../helpers/normalizeCart.js";
import { createOrderApi } from "../orders/orders.api.js";

export const useCart = () => {
	const { cart, setCart } = useContext(CartContext);

	const updateCart = (items) => {
		const newCart = normalizeCart({ ...cart, items });
		setCart(newCart);
		saveCartInLocalStorage(newCart);
		return newCart;
	};

	const addToCart = (product, qty = 1) => {
		const productId = product._id || product.id;
		const existingItem = cart.items.find((p) => p.productId === productId);

		let updatedItems;
		if (existingItem) {
			updatedItems = cart.items.map((p) =>
				p.productId === productId ? { ...p, quantity: (p.quantity || 1) + qty } : p
			);
		} else {
			updatedItems = [
				...cart.items,
				{
					productId,
					name: product.name,
					images: product.images,
					price: product.price,
					quantity: qty,
				},
			];
		}

		return updateCart(updatedItems);
	};

	const removeFromCart = (productId) => {
		const updatedItems = cart.items.filter((p) => p.productId !== productId);
		return updateCart(updatedItems);
	};

	const incrementQty = (productId) => {
		const updatedItems = cart.items.map((p) =>
			p.productId === productId ? { ...p, quantity: (p.quantity || 1) + 1 } : p
		);
		return updateCart(updatedItems);
	};

	const decrementQty = (productId) => {
		const updatedItems = cart.items.map((p) =>
			p.productId === productId ? { ...p, quantity: Math.max((p.quantity || 1) - 1, 1) } : p
		);
		return updateCart(updatedItems);
	};

	const clearCart = () => {
		return updateCart([]);
	};

	const checkout = async (userId, { shippingAddress, billingAddress, paymentMethod }) => {
		if (!cart?.id) throw new Error("No hay carrito activo");

		const subtotal = cart.items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

		const tax = subtotal * 0.21;
		const total = subtotal + tax;

		const orderPayload = {
			userId,
			products: cart.items.map((item) => ({
				productId: item.productId || item.id,
				quantity: item.quantity || 1,
				price: Number(item.price.toFixed(2)),
				name: item.name,
			})),
			subtotal: Number(subtotal.toFixed(2)),
			tax: Number(tax.toFixed(2)),
			total: Number(total.toFixed(2)),
			status: "pending",
			shippingAddress: shippingAddress || "Dirección no especificada",
			billingAddress: billingAddress || shippingAddress || "Dirección no especificada",
			paymentMethod: paymentMethod || "credit_card",
		};

		return await createOrderApi(orderPayload);
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
