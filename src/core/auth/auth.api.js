import { api } from "../http/axios";
import { getTokenFromLocalStorage } from "./auth.service";

export const loginApi = async (user) => {
	try {
		const response = await api.post("/auth/login", user);
		return response.data;
	} catch (error) {
		// console.error("Error al iniciar sesión:", error);
		throw error;
	}
};

export const registerApi = async (user) => {
	try {
		const response = await api.post("/auth/register", user);
		return response.data;
	} catch (error) {
		// console.error("Error al registrar usuario:", error);
		throw error;
	}
};

export const logoutApi = async () => {
	try {
		const token = getTokenFromLocalStorage();

		if (!token) {
			return { logout: true };
		}

		const response = await api.post(
			"/auth/logout",
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		// console.error("Error al cerrar sesión:", error.response?.status || error.message);

		if (error.response?.status === 401) {
			return { logout: true };
		}

		throw error;
	}
};

export const getProfileApi = async () => {
	try {
		const response = await api.get("/auth/me");
		return response.data;
	} catch (error) {
		// console.error("Error al obtener usuario:", error);
		throw error;
	}
};
