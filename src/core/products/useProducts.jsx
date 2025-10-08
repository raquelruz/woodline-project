import { useEffect, useState } from "react";
import { api } from "../http/axios";

export const useProducts = (searchQuery, categoryQuery, filters) => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchProducts() {
			setLoading(true);
			try {
				const { data } = await api.get("/products");
				setProducts(data);

				const uniqueCategories = [...new Set(data.flatMap((p) => p.category || []))];
				setCategories(uniqueCategories);
			} catch (error) {
				console.error("Error al obtener productos:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchProducts();
	}, []);

	// Filtrado combinado
	const filteredProducts = products
		.filter((p) => {
			const matchesCategory = categoryQuery === "all" || p.category?.includes(categoryQuery);
			const matchesSearch =
				searchQuery === "" ||
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

	return { products: filteredProducts, categories, loading };
};
