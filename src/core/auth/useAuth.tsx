import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { getProfileApi, loginApi, logoutApi, registerApi } from "./auth.api";
import {
	removeTokenFromLocalStorage,
	removeUserFromLocalStorage,
	saveTokenInLocalStorage,
	saveUserInLocalStorage,
} from "./auth.service.ts";
import type { LoginPayload, RegisterPayload, User } from "./auth.type";

export const useAuth = () => {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	if (!authContext) {
		throw new Error ("useAuth debe usarse dentro de un AuthProvider");
	}

	const { setUser } = authContext;

	const login = useCallback(async ({ email, password }: LoginPayload) => {
		try {
			const authData = await loginApi({ email, password });
			if (authData?.token && authData?.user) {
				saveTokenInLocalStorage(authData.token);
				saveUserInLocalStorage(authData.user);
				setUser(authData.user as User);
				navigate("/");
			}
		} catch (error) {
			console.error("Error en login:", error);
			throw error;
		}
	}, [setUser, navigate]);

	const logout = useCallback(async () => {
		try {
			await logoutApi();
		} catch (error) {
			console.error("Error al iniciar sesión, error");
			throw error;
		} finally {
			removeUserFromLocalStorage();
			removeTokenFromLocalStorage();
			setUser(null);
			navigate("/login");
		}
	}, [setUser, navigate]);

	const register = useCallback(async (userData: RegisterPayload) => {
		try {
			const authData = await registerApi(userData);
			if (authData?.token && authData?.user) {
				saveTokenInLocalStorage(authData.token);
				saveUserInLocalStorage(authData.user);
				setUser(authData.user);
				navigate("/");
			}
		} catch (error) {
			console.error("Error en registro:", error);
			throw error;
		}
	}, [setUser, navigate]);

	const getProfile = useCallback(async () => {
		try {
			const profile = await getProfileApi();
			setUser(profile as User)
		} catch (error) {
			console.error("Error al obtener perfil:", error);
			throw error;
		}
	}, [setUser]);

	return { login, logout, register, getProfile };
};
