import { Navigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../../core/auth/auth.service";
import type { ReactNode } from "react";

type PrivateRouteProps = {
	children: ReactNode;
	role?: string;
};

export const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
	const user = getUserFromLocalStorage();

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (role && user.role !== role) {
		return <Navigate to="/" replace />;
	}

	return children;
};