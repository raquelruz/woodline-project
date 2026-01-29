import { useEffect, useState, useCallback, useMemo } from "react";
import { api } from "../http/axios";
import { SORT, type Filters, type Product } from "./products.types";
import type { AxiosError } from "axios";

type UseProductResult = {
	products: Product[];
	categories: string[];
	loading: boolean;
	error: string | null;
};

export const useProducts = (searchQuery: string, categoryQuery: string, filters: Filters): UseProductResult => {
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchProducts = useCallback(async (): Promise<void> => {
		setLoading(true);
		setError(null);

		try {
			const { data } = await api.get<Product[]>("/products");
			setProducts(data);

			const uniqueCategories = Array.from(new Set(data.flatMap((p) => p.category ?? [])));
			setCategories(uniqueCategories);
		} catch (error) {
			const err = error as AxiosError<{ message?: string }>;
			setError(err.response?.data?.message ?? err.message ?? "Error al cargar productos");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void fetchProducts();
	}, [fetchProducts]);

	const filteredProducts = useMemo<Product[]>(() => {
		let result = [...products];

		if (categoryQuery !== "all") {
			result = result.filter((p) => (p.category ?? []).includes(categoryQuery));
		}

		if (searchQuery) {
			const q = searchQuery.toLowerCase();
			result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
		}

		const min = filters.minPrice ?? 0;
		const max = filters.maxPrice ?? Infinity;

		result = result.filter((p) => {
			const price = p.price ?? 0;
			return price >= min && price <= max;
		});

		if (filters.sort === SORT.PRICE_ASC) {
			result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
		} else if (filters.sort === SORT.PRICE_DESC) {
			result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
		}

		return result;
	}, [products, searchQuery, categoryQuery, filters.minPrice, filters.maxPrice, filters.sort]);

	return { products: filteredProducts, categories, loading, error };
};
