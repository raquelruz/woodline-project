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
			setProducts([]);
			setCategories([]);
			throw error;
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const filteredProducts = useMemo(() => {
		return products
			.filter((p) => {
				const matchesCategory = categoryQuery === "all" || p.category?.includes(categoryQuery);

				const matchesSearch =
					!searchQuery ||
					p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					p.description.toLowerCase().includes(searchQuery.toLowerCase());

				const matchesPrice =
					(!filters.minPrice || p.price >= filters.minPrice) &&
					(!filters.maxPrice || p.price <= filters.maxPrice);

				return matchesCategory && matchesSearch && matchesPrice;
			})
			.sort((a, b) => {
				if (filters.sort === "priceAsc") return a.price - b.price;
				if (filters.sort === "priceDesc") return b.price - a.price;
				return 0;
			});
	}, [products, searchQuery, categoryQuery, filters]);

	return {
		products: filteredProducts,
		categories,
		loading,
	};
};
