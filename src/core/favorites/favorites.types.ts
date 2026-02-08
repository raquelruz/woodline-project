import type { Product } from "../products/products.types"

export type FavoritesResponse = {
    favoritos: Product[];
};

export type FavoritesContextValue = {
    favorites: Product[];
    toggleFavorite: (product: Product) => void;
}