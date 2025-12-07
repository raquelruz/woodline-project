import { useEffect, useState, useCallback, useMemo } from "react";
import { api } from "../http/axios";

export const useProducts = (searchQuery, categoryQuery, filters) => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchProducts = useCallback(async () => {
		setLoading(true);
		try {
			const { data } = await api.get("/products");
			setProducts(data);

			const uniqueCategories = [...new Set(data.flatMap((p) => p.category || []))];
			setCategories(uniqueCategories);
		} catch (error) {
			throw error;
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const filteredProducts = useMemo(() => {
		let result = [...products];

		if (categoryQuery !== "all") {
			result = result.filter((p) => p.category?.includes(categoryQuery));
		}

		if (searchQuery) {
			const q = searchQuery.toLowerCase();
			result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
		}

		result = result.filter((p) => {
			const price = p.price || 0;
			return price >= (filters.minPrice ?? 0) && price <= (filters.maxPrice ?? Infinity);
		});

		if (filters.sort === "priceAsc") {
			result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
		} else if (filters.sort === "priceDesc") {
			result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
		}

		return result;
	}, [products, searchQuery, categoryQuery, filters]);

	return { products: filteredProducts, categories, loading };
};
