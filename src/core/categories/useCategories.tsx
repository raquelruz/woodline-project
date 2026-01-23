import { useState, useEffect, useCallback, useMemo } from "react";
import { api } from "../http/axios";
import type { Category, ProductForCategories } from "./categories.types";

// Record<KeyType, ValueType> es una utilidad que permite crear objetos tipo diccionario.
// CategoryMap es un objeto donde cada clave es texto (string) y el valor es una Category.
type CategoryMap = Record<string, Category>;

export const useCategories = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchCategories = useCallback(async () => {
		try {
			const { data: products } = await api.get<ProductForCategories[]>("/products");

			const categoryMap: CategoryMap = {};

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
			setCategories([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	const memoizedCategories = useMemo(() => categories, [categories]);

	return {
		categories: memoizedCategories,
		loading,
	};
};
