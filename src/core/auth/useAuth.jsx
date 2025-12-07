import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { getProfileApi, loginApi, logoutApi, registerApi } from "./auth.api";
import {
	removeTokenFromLocalStorage,
	removeUserFromLocalStorage,
	saveTokenInLocalStorage,
	saveUserInLocalStorage,
} from "./auth.service";

export const useAuth = () => {
	const { setUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const login = useCallback(async ({ email, password }) => {
		try {
			const authData = await loginApi({ email, password });
			if (authData?.token && authData?.user) {
				saveTokenInLocalStorage(authData.token);
				saveUserInLocalStorage(authData.user);
				setUser(authData.user);
				navigate("/");
			}
		} catch (error) {
			console.error("Error en login:", error);
			throw error;
		}
	}, []);

	const logout = useCallback(async () => {
		try {
			const response = await logoutApi();
		} catch (error) {
			console.error("Error al iniciar sesión, error");
			throw error;
		} finally {
			removeUserFromLocalStorage();
			removeTokenFromLocalStorage();
			setUser(null);
			navigate("/login");
		}
	}, []);

	const register = useCallback(async (user) => {
		try {
			const authData = await registerApi(user);
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
	}, []);

	const getProfile = useCallback(async () => {
		try {
			const { user } = await getProfileApi();
		} catch (error) {
			console.error("Error al obtener perfil:", error);
			throw error;
		}
	}, []);

	return { login, logout, register, getProfile };
};
