import { api } from "../http/axios";

export const apiGetFavorites = async (userId) => {
    const response = await api.get(`/users/${userId}/favoritos`);
    return response.data.favoritos || [];
};

export const apiAddFavorite = async (userId, productId) => {
    const response = await api.post(`/users/${userId}/favoritos/${productId}`);
    return response.data.favoritos || [];
};

export const apiRemoveFavorite = async (userId, productId) => {
    const response = await api.delete(`/users/${userId}/favoritos/${productId}`);
    return response.data.favoritos || [];
};
