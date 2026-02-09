import type { OrderStatus } from "./../../core/orders/orders.types";
import { t } from "i18next";

export const formatOrderId = (orderId?: string | number) => {
	if (!orderId) return "Desconocido";
	return String(orderId).slice(-5);
};

export const translateStatus = (status: OrderStatus) => {
	if (!status) return t("common.unknown");

	const map: Record<OrderStatus, string> = {
		pending: t("orders.pending"),
		cancelled: t("orders.canceled"),
		processing: t("orders.processing"),
		delivered: t("orders.delivered"),
	};
	return map[status] ?? t("common.unknown");
};

export const getStatusClass = (status: OrderStatus) => {
	const base = "px-3 py-1 text-sm rounded-full font-medium";
	if (!status) return `${base} bg-gray-100 text-gray-600`;

	const statusMap: Record<OrderStatus, string> = {
		pending: "bg-yellow-100 text-yellow-700",
		cancelled: "bg-red-100 text-red-700",
		processing: "bg-blue-100 text-blue-700",
		delivered: "bg-green-100 text-green-700",
	};

	const style = statusMap[status];
	return style ? `${base} ${style}` : `${base} bg-gray-100 text-gray-600`;
};

export const formatDate = (date: string | Date): string => {
	if (!date) return t("common.unknown");

	try {
		return new Date(date).toLocaleString("es-ES", {
			dateStyle: "short",
			timeStyle: "short",
		});
	} catch {
		return t("common.unknown");
	}
};

export const isRecentOrder = (date: string | Date): boolean => {
	if (!date) return false;

	const now = new Date();
	const orderDate = new Date(date);

	const diffMs =  now.getTime() - orderDate.getTime();
	const diffHours = diffMs / (1000 * 60 * 60);

	return diffHours < 48;
};
