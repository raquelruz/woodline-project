export function formatOrderId(orderId) {
	if (!orderId) return "Desconocido";
	return String(orderId).slice(-5);
}

export function translateStatus(status) {
	const map = {
		pending: "Pendiente",
		completed: "Completado",
		cancelled: "Cancelado",
		preparing: "Preparando",
		delivered: "Entregado",
	};
	if (!status) return "Desconocido";
	return map[status] || "Desconocido";
}

export function getStatusClass(status) {
	const base = "px-3 py-1 text-sm rounded-full font-medium";
	if (!status) return `${base} bg-gray-100 text-gray-600`;

	const statusMap = {
		pending: "bg-yellow-100 text-yellow-700",
		completed: "bg-green-100 text-green-700",
		cancelled: "bg-red-100 text-red-700",
		preparing: "bg-blue-100 text-blue-700",
		delivered: "bg-green-100 text-green-700",
	};

	const style = statusMap[status];
	return style ? `${base} ${style}` : `${base} bg-gray-100 text-gray-600`;
}

export function formatDate(date) {
	if (!date) return "Fecha desconocida";

	try {
		return new Date(date).toLocaleString("es-ES", {
			dateStyle: "short",
			timeStyle: "short",
		});
	} catch {
		return "Fecha inválida";
	}
}

export function isRecentOrder(date) {
	if (!date) return false;

	const now = new Date();
	const orderDate = new Date(date);

	const diffMs = now - orderDate;
	const diffHours = diffMs / (1000 * 60 * 60);

	return diffHours < 48;
}
