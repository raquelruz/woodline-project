import { Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export const OrderHeader = ({ orderId }) => (
	<div className="flex justify-between items-center mb-10">
		<Link to="/profile" className="flex items-center gap-2 text-primary hover:text-primary-light transition">
			<IoArrowBackCircleOutline className="text-2xl" />
			<span className="font-semibold">Volver al perfil</span>
		</Link>

		<h1 className="font-title font-bold text-2xl text-gray-800">Pedido #{orderId}</h1>
	</div>
);
