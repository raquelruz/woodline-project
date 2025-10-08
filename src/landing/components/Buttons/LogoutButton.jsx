import { MdOutlineLogout } from "react-icons/md";
import { useAuth } from "../../../core/auth/useAuth";

export const LogoutButton = ({ variant = "default" }) => {
	const { logout } = useAuth();

	if (variant === "icon") {
		return (
			<button
				onClick={logout}
				className="text-primary hover:text-primary-light cursor-pointer transition-all p-1 rounded-full hover:bg-primary-ultralight"
				title="Cerrar sesión"
				aria-label="Cerrar sesión"
			>
				<MdOutlineLogout className="text-xl" />
			</button>
		);
	}

	return (
		<button
			onClick={logout}
			className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors"
		>
			Cerrar sesión
		</button>
	);
};
