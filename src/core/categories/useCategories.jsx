import { useState, useEffect } from "react";
import { api } from "../http/axios";

export const useCategories = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchCategories() {
			try {
				const { data: products } = await api.get("/products");

				// Mapa de categorías únicas
				const categoryMap = {};

				for (const product of products) {
					if (!product.category) continue;

					for (const cat of product.category) {
						const slug = cat.toLowerCase().trim();

						if (!categoryMap[slug]) {
							categoryMap[slug] = {
								name: cat.charAt(0).toUpperCase() + cat.slice(1),
								slug,
								description: `Explora los mejores productos de ${cat}`,
								image: product.images?.[0] || "/fallback-category.jpg",
							};
						}
					}
				}

				setCategories(Object.values(categoryMap));
			} catch (error) {
				console.error("❌ Error al obtener categorías:", error);
				setCategories([]);
			} finally {
				setLoading(false);
			}
		}

		fetchCategories();
	}, []);

	return { categories, loading };
};
