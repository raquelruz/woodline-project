import { createContext, useState, useEffect } from "react";
import { getUserFromLocalStorage, getTokenFromLocalStorage } from "../core/auth/auth.service";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedUser = getUserFromLocalStorage();
		const token = getTokenFromLocalStorage();

		if (storedUser && token) {
			setUser(storedUser);
			console.log("Usuario restaurado desde localStorage:", storedUser);
		}

		setLoading(false);
	}, []);

	return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>;
};
