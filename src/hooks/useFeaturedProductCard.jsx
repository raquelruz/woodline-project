import { useEffect, useState } from "react";
import { api } from "../core/http/axios";

export const useFeaturedProducts = () => {
	const [featured, setFeatured] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		async function fetchFeatured() {
			try {
				const { data } = await api.get("/products");
				const sorted = data.sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
				);
				setFeatured(sorted.slice(0, 6));
			} catch (error) {
				setError("Error al mostrar productos");
				console.error(error);
			} finally {
				setLoading(false);
			}
		}

		fetchFeatured();
	}, []);

	return { featured, loading, error };
}
