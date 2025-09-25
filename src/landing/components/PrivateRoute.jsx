import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const PrivateRoute = ({ children }) => {
	const { user } = useContext(AuthContext);

	// Si no hay usuario logueado → Redirige a login
	if (!user) {
		return <Navigate to="/login" replace />;
	}

	// Si hay usuario → Renderiza el componente hijo 
	return children;
};
