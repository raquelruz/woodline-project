import { useEffect, useState, useCallback } from "react";
import { api } from "../core/http/axios";
import type { Product } from "../core/products/products.types";

type useFeaturedProductsResult = {
	featured: Product[];
	loading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
};

export const useFeaturedProducts = (): useFeaturedProductsResult => {
	const [featured, setFeatured] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>("");

	const fetchFeatured = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const { data } = await api.get<Product[]>("/products");

			const sorted = [...data].sort((a, b) => {
				const bTime = new Date(b.createdAt).getTime();
				const aTime = new Date(a.createdAt).getTime();
				return bTime - aTime;
			});

			setFeatured(sorted.slice(0, 9));
		} catch (error) {
			setError("Error al mostrar productos");
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void fetchFeatured();
	}, [fetchFeatured]);

	return {
		featured,
		loading,
		error,
		refetch: fetchFeatured,
	};
};
