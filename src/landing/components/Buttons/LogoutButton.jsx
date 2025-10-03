import { useAuth } from "../../../core/auth/useAuth";

export const LogoutButton = () => {
	const { logout } = useAuth();

	return (
		<button
			onClick={logout}
			className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors"
		>
            Cerrar sesión
        </button>
	);
};
