import { createContext, useState, useEffect, type ReactNode } from "react";
import type { ProductWithBackendId } from "../core/products/products.types"; // ajusta la ruta

type ViewedContextValue = {
	viewed: ProductWithBackendId[];
	addViewed: (product: ProductWithBackendId) => void;
};

export const ViewedContext = createContext<ViewedContextValue | null>(null);

type ViewedProviderProps = {
	children: ReactNode;
};

export const ViewedProvider = ({ children }: ViewedProviderProps) => {
	const [viewed, setViewed] = useState<ProductWithBackendId[]>([]);

	useEffect(() => {
		const stored = localStorage.getItem("viewed");
		if (stored) {
			try {
				const parsed = JSON.parse(stored) as ProductWithBackendId[];
				setViewed(Array.isArray(parsed) ? parsed : []);
			} catch {
				setViewed([]);
			}
		}
	}, []);

	const saveToStorage = (items: ProductWithBackendId[]) => {
		localStorage.setItem("viewed", JSON.stringify(items));
	};

	const addViewed = (product: ProductWithBackendId) => {
		if (!product) return;

		const id = product.id || product._id || product.sku;

		const exists = viewed.some((p) => (p.id || p._id || p.sku) === id);
		if (exists) return;

		const newViewed = [product, ...viewed].slice(0, 12);
		setViewed(newViewed);
		saveToStorage(newViewed);
	};

	return (
		<ViewedContext.Provider value={{ viewed, addViewed }}>
			{children}
		</ViewedContext.Provider>
	);
};