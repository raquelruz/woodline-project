import { createContext, useState, useEffect } from "react";

export const ViewedContext = createContext(null);

export const ViewedProvider = ({ children }) => {
	const [viewed, setViewed] = useState([]);

	useEffect(() => {
		const stored = localStorage.getItem("viewed");
		if (stored) {
			setViewed(JSON.parse(stored));
		}
	}, []);

	const saveToStorage = (items) => {
		localStorage.setItem("viewed", JSON.stringify(items));
	};

	const addViewed = (product) => {
		if (!product) return;

		const id = product.id || product._id || product.sku;

		// Evita duplicados
		const exists = viewed.some((p) => (p.id || p._id || p.sku) === id);
		if (exists) return;

		const newViewed = [product, ...viewed].slice(0, 12);
		setViewed(newViewed);
		saveToStorage(newViewed);
	};

	return <ViewedContext.Provider value={{ viewed, addViewed }}>{children}</ViewedContext.Provider>;
};
