import { Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { getUserFromLocalStorage } from "../../../core/auth/auth.service";

export const BackButton = () => {
	const user = getUserFromLocalStorage();

	if (!user || user.role !== "admin") return null;
	
	return (
	<div className="text-center">
		<Link
			to="/dashboard/orders"
			className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-primary-light transition"
		>
			<IoArrowBackCircleOutline className="text-xl" />
			Volver a pedidos
		</Link>
	</div>
	);
};