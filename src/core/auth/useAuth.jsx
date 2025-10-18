import { useContext } from "react";
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

	const login = async ({ email, password }) => {
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
	};

	const logout = async () => {
		console.log("Cerrando sesión...");
		try {
			const response = await logoutApi();
			if (response?.logout) {
				console.log("Sesión cerrada correctamente.");
			}
		} catch (error) {
			console.warn("Error en logout remoto, se forzará cierre local.");
		} finally {
			removeUserFromLocalStorage();
			removeTokenFromLocalStorage();
			setUser(null);
			navigate("/login");
		}
	};

	const register = async (user) => {
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
	};

	const getProfile = async () => {
		try {
			const { user } = await getProfileApi();
			if (user) console.log("Usuario actual:", user);
			else console.log("No hay usuario autenticado.");
		} catch (error) {
			console.error("Error al obtener perfil:", error);
		}
	};

	return { login, logout, register, getProfile };
};
