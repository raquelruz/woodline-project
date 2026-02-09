import { useCallback, useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { saveCartInLocalStorage } from "./cart.service";
import { normalizeCart } from "../../helpers/normalizeCart";
import { createOrderApi } from "../orders/orders.api";
import type { Cart, CartProduct } from "./cart.types";
import type { ProductWithBackendId } from "../products/products.types";
import type { CreateOrderPayload } from "../orders/orders.types";
import { PAYMENT_STATUS } from "../types/payment.types";

type CheckoutOptions = {
	shippingAddress?: string;
	billingAddress?: string;
	paymentMethod?: "credit_card" | "paypal" | string;
};

export const useCart = () => {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error("useCart debe usarse dentro de un Provider");
	}

	const { cart, setCart } = context;

	const updateCart = useCallback(
		(items: CartProduct[]): Cart => {
			const newCart = normalizeCart({ ...cart, items });
			setCart(newCart);
			saveCartInLocalStorage(newCart);
			return newCart;
		},
		[cart, setCart],
	);

	const addToCart = useCallback(
		(product: ProductWithBackendId, qty: number = 1) => {
			const productId = product._id || product.id;
			const existingItem = cart.items.find((p) => p.productId === productId);

			let updatedItems: CartProduct[];

			if (existingItem) {
				updatedItems = cart.items.map((p) =>
					p.productId === productId ? { ...p, quantity: (p.quantity || 1) + qty } : p,
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
		},
		[cart.items, updateCart],
	);

	const removeFromCart = useCallback(
		(productId: string) => {
			const updatedItems = cart.items.filter((p) => p.productId !== productId);
			return updateCart(updatedItems);
		},
		[cart.items, updateCart],
	);

	const incrementQty = useCallback(
		(productId: string) => {
			const updatedItems = cart.items.map((p) =>
				p.productId === productId ? { ...p, quantity: (p.quantity || 1) + 1 } : p,
			);
			return updateCart(updatedItems);
		},
		[cart.items, updateCart],
	);

	const decrementQty = useCallback(
		(productId: string) => {
			const updatedItems = cart.items.map((p) =>
				p.productId === productId ? { ...p, quantity: Math.max((p.quantity || 1) - 1, 1) } : p,
			);
			return updateCart(updatedItems);
		},
		[cart.items, updateCart],
	);

	const clearCart = useCallback((): Cart => updateCart([]), [updateCart]);

	const checkout = useCallback(
		async (userId: string, { shippingAddress, billingAddress, paymentMethod }: CheckoutOptions) => {
			if (!cart?.id) throw new Error("No hay carrito activo");

			const subtotal = cart.items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

			const tax = subtotal * 0.21;
			const total = subtotal + tax;

			const orderPayload: CreateOrderPayload = {
				userId,
				products: cart.items.map((item) => ({
					productId: item.productId,
					quantity: item.quantity || 1,
					price: Number(item.price.toFixed(2)),
					name: item.name,
				})),
				subtotal: Number(subtotal.toFixed(2)),
				tax: Number(tax.toFixed(2)),
				total: Number(total.toFixed(2)),
				paymentStatus: PAYMENT_STATUS.PENDING,
				status: "pending",
				shippingAddress: shippingAddress || "Dirección no especificada",
				billingAddress: billingAddress || shippingAddress || "Dirección no especificada",
				paymentMethod: paymentMethod || "credit_card",
			};

			return await createOrderApi(orderPayload);
		},
		[cart],
	);

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
