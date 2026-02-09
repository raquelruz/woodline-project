import { createContext, useEffect, useState } from "react";
import { createCartApi } from "../core/cart/cart.api";
import { getCartFromLocalStorage, saveCartInLocalStorage } from "../core/cart/cart.service";
import { normalizeCart } from "../helpers/normalizeCart";
import type { Cart } from "../core/cart/cart.types";

type CartContextType = {
	cart: Cart;
	setCart: React.Dispatch<React.SetStateAction<Cart>>;
};

export const CartContext = createContext<CartContextType | null>(null);


type CartProviderProps = {
	children: React.ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
	const [cart, setCart] = useState<Cart>({ id: null, items: [] });

	useEffect(() => {
		const initCart = async () => {
			const storedCart = getCartFromLocalStorage();

			if (storedCart?.id) {
				setCart(normalizeCart(storedCart));
			} else {
				try {
					const response = await createCartApi();
					const newCart = normalizeCart(response);

					saveCartInLocalStorage(newCart);
					setCart(newCart);
				} catch (error) {
					console.error("Error creando carrito:", error);
					throw error;
				}
			}
		};

		initCart();
	}, []);

	return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};
