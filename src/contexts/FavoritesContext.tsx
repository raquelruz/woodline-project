import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

import { getUserFavorites, addFavorite, removeFavorite } from "../core/favorites/favorites.service";

export const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const loadFavorites = async () => {
			if (!user?.id) return;

			const favs = await getUserFavorites(user.id);
			setFavorites(favs);
		};

		loadFavorites();
	}, [user]);

	const toggleFavorite = async (product) => {
		if (!product.id) {
			console.warn("Producto sin ID → backend no lo admite");
			return;
		}

		const exists = favorites.some((f) => f.id === product.id);

		try {
			if (exists) {
				const updated = favorites.filter((f) => f.id !== product.id);
				setFavorites(updated);
				const apiFavs = await removeFavorite(user.id, product.id);
				setFavorites(apiFavs);
			} else {
				const updated = [...favorites, product];
				setFavorites(updated);
				const apiFavs = await addFavorite(user.id, product.id);
				setFavorites(apiFavs);
			}
		} catch (error) {
			console.error("Error actualizando favoritos:", error);
		}
	};

	return <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>{children}</FavoritesContext.Provider>;
};
