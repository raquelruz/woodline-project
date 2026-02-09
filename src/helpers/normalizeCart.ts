import type { Cart } from "../core/cart/cart.types";

type RawCart = Partial<Cart> | null | undefined;

export const normalizeCart = (data: RawCart): Cart => {
	if (!data) return { id: null, items: [] };

	return {
		id: data.id ?? null,
		items: data.items ?? [],
	};
};
