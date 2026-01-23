import { api } from "../http/axios";
import type { Product } from "../products/products.types";
import type { FavoritesResponse } from "./favorites.types";

export const apiGetFavorites = async (userId: string): Promise<Product[]> => {
    const response = await api.get<FavoritesResponse>(`/users/${userId}/favoritos`);
    return response.data.favoritos || [];
};

export const apiAddFavorite = async (userId: string, productId: string): Promise<Product[]> => {
    const response = await api.post<FavoritesResponse>(`/users/${userId}/favoritos/${productId}`);
    return response.data.favoritos || [];
};

export const apiRemoveFavorite = async (userId: string, productId: string): Promise<Product[]> => {
    const response = await api.delete<FavoritesResponse>(`/users/${userId}/favoritos/${productId}`);
    return response.data.favoritos || [];
};
