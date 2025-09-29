import axios from "axios";
import { getTokenFromLocalStorage } from "../auth/auth.service.js";

const baseURL = "https://eleven-code-api-raquel-ruiz.vercel.app/api";

export const api = axios.create({
	baseURL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Interceptor global para añadir Authorization
api.interceptors.request.use((config) => {
	const token = getTokenFromLocalStorage();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
		console.log("🟢 Header Authorization añadido:", config.headers.Authorization);
	}
	return config;
});