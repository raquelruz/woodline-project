import { translateStatus, getStatusClass, isRecentOrder, formatOrderId, formatDate } from "../../utils/orderUtils";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../../translations/useTranslate";
import type { OrderComponentProps, OrderStatus } from "../../../core/orders/orders.types";

export const OrderCard = ({ order, onChange }: OrderComponentProps) => {
	const { t } = useTranslate();
	const navigate = useNavigate();

	const orderId = order._id || order.id;
	const recent = order.placedAt ? isRecentOrder(order.placedAt) : false;
	const formattedDate = order.placedAt ? formatDate(order.placedAt) : "—";
	const orderTotal = order.total ? `${order.total} ${t("common.currency")}` : "—";
	const statusClass = getStatusClass(order.status);
	const statusLabel = translateStatus(order.status);
	const shortId = formatOrderId(orderId);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newStatus = event.target.value as OrderStatus;

		if (newStatus === "cancelled") {
			const confirmed = window.confirm(t("pages.dashboard.cancel_order_confirm"));
			if (!confirmed) return;
		}

		onChange(orderId, newStatus);
	};

	// MOBILE
	return (
		<div
			key={orderId}
			className="border border-gray-200 rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition"
		>
			<div className="flex justify-between items-center">
				<h3 className="font-title font-semibold text-primary flex items-center gap-2">
					{t("orders.order")} #{shortId}
					{recent && (
						<span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
							{t("common.new")}
						</span>
					)}
				</h3>
				<span className={statusClass}>{statusLabel}</span>
			</div>

			<div className="space-y-1.5 mb-4">
				<p className="text-gray-700 text-sm">
					<strong>{t("common.date")}:</strong> {formattedDate}
				</p>

				<p className="text-gray-700 text-sm">
					<strong>{t("orders.total_order")}:</strong> {orderTotal}
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<div>
					<label className="block text-xs font-semibold text-gray-500 mb-1">
						{t("orders.update_status")}
					</label>

					<select
						value={order.status}
						onChange={handleChange}
						className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
					>
						<option value="pending">{t("orders.pending")}</option>
						<option value="preparing">{t("orders.preparing")}</option>
						<option value="delivered">{t("orders.delivered")}</option>
						<option value="cancelled">{t("orders.canceled")}</option>
					</select>
				</div>

				<button
					type="button"
					onClick={() => navigate(`/orders/${orderId}`)}
					className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-primary-light transition text-sm flex items-center justify-center gap-2"
				>
					<span role="img" aria-label="ver detalles">
						🔍
					</span>
					{t("common.view_details")}
				</button>
			</div>
		</div>
	);
};
