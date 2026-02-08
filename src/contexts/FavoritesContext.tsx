import { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { getUserFavorites, addFavorite, removeFavorite } from "../core/favorites/favorites.service";
import type { Product } from "../core/products/products.types";
import type { FavoritesContextType } from "../core/favorites/favorites.types";

export const FavoritesContext = createContext<FavoritesContextType | null>(null);

type FavoritesProviderProps = {
	children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
	const [favorites, setFavorites] = useState<Product[]>([]);
	const auth = useContext(AuthContext);

	if (!auth) {
		throw new Error("FavoritesProvider debe usarse dentro de un AuthProvider");
	};

	const { user } = auth;

	useEffect(() => {
		const loadFavorites = async () => {
			if (!user?.id) return;

			const favs = await getUserFavorites(user.id);
			setFavorites(favs);
		};

		loadFavorites();
	}, [user]);

	const toggleFavorite = async (product: Product): Promise<void> => {
		if (!user?.id) {
			console.warn("No hay usuario → no se pueden gestionar favoritos");
			return;
		}
		
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
