import { api } from "../http/axios";
import { getTokenFromLocalStorage } from "./auth.service";
import type { AuthResponse, LoginPayload, LogoutResponse, RegisterPayload, User } from "./auth.type";


export const loginApi = async (user: LoginPayload): Promise<AuthResponse> => {
	try {
		const response = await api.post<AuthResponse>("/auth/login", user);
		return response.data;
	} catch (error) {
		// console.error("Error al iniciar sesión:", error);
		throw error;
	}
};

export const registerApi = async (user: RegisterPayload): Promise<AuthResponse> => {
	try {
		const response = await api.post<AuthResponse>("/auth/register", user);
		return response.data;
	} catch (error) {
		// console.error("Error al registrar usuario:", error);
		throw error;
	}
};

export const logoutApi = async (): Promise<LogoutResponse> => {
	try {
		const token = getTokenFromLocalStorage();

		if (!token) {
			return { logout: true };
		}

		const response = await api.post<LogoutResponse>(
			"/auth/logout",
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response.data;
	} catch (error: any) {
		// console.error("Error al cerrar sesión:", error.response?.status || error.message);

		if (error.response?.status === 401) {
			return { logout: true };
		}

		throw error;
	}
};

export const getProfileApi = async (): Promise<User> => {
	try {
		const response = await api.get<User>("/auth/me");
		return response.data;
	} catch (error) {
		// console.error("Error al obtener usuario:", error);
		throw error;
	}
};
