import { Navigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../../core/auth/auth.service";

export const PrivateRoute = ({ children, role }) => {
	const user = getUserFromLocalStorage();

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (role && user.role !== role) {
		return <Navigate to="/" replace />;
	}

	return children;
};