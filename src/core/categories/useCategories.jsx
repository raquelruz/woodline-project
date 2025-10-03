import { useState, useEffect } from "react";
import { api } from "../http/axios";

export const useCategories = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const { data: products } = await api.get("/products");

				const categoryMap = {};

				products.forEach((product) => {
					product.category?.forEach((cat) => {
						if (!categoryMap[cat]) {
							categoryMap[cat] = {
								name: cat.charAt(0).toUpperCase() + cat.slice(1),
								slug: cat.toLowerCase(),
								description: `Explora productos de la categoría ${cat}`,
								image: product.images?.[0] || "/fallback-category.jpg",
							};
						}
					});
				});

				setCategories(Object.values(categoryMap));
			} catch (error) {
				console.error("Error fetching categories:", error);
				setCategories([]);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	return { categories, loading };
};
