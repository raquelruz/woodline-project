import { createContext, useState, useEffect, type ReactNode } from "react";
import { getUserFromLocalStorage, getTokenFromLocalStorage } from "../core/auth/auth.service";
import type { AuthContextType, User } from "../core/auth/auth.type";

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedUser = getUserFromLocalStorage();
		const token = getTokenFromLocalStorage();

		if (storedUser && token) {
			setUser(storedUser);
		}

		setLoading(false);
	}, []);

	return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>;
};
