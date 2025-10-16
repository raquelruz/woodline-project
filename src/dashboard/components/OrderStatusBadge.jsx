export const OrderStatusBadge = ({ status }) => {
	const styles = {
		pending: "bg-yellow-100 text-yellow-700",
		sent: "bg-blue-100 text-blue-700",
		completed: "bg-green-100 text-green-700",
		cancelled: "bg-red-100 text-red-700",
	};

	const labels = {
		pending: "Pendiente",
		sent: "Enviado",
		completed: "Completado",
		cancelled: "Cancelado",
	};

	return (
		<span
			className={`px-3 py-1 rounded-full text-sm font-semibold ${
				styles[status] || "bg-gray-100 text-gray-700"
			}`}
		>
			{labels[status] || "Desconocido"}
		</span>
	);
};
