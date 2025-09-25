import { useAuth } from "../../core/auth/useAuth.jsx"
export const LogoutButton = () => {
	const { logout } = useAuth();

	return (
		<button
			onClick={logout}
			className="bg-primary-hover text-white px-4 py-2 rounded-lg hover:bg-primary-pressed transition-colors"
		>
            Cerrar sesión
        </button>
	);
};
