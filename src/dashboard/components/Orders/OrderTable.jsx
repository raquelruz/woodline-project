import { useOrders } from "../../hooks/useOrders";
import { Loader } from "../../../landing/components/Loader";
import { OrderRow } from "./OrderRow";
import { OrderCard } from "./OrderCard";
import toast, { Toaster } from "react-hot-toast";
import { memo } from "react";
import { useTranslate } from "../../../translations/useTranslate";

export const OrderTable = memo(() => {
	const { t } = useTranslate();
	const { orders, loading, updateStatus } = useOrders();

	const handleStatusChange = async (orderId, newStatus) => {
		try {
			toast.loading(t("orders.updating_status"));
			await updateStatus(orderId, newStatus);
			toast.dismiss();
			toast.success(t("orders.update_status_success"));
		} catch {
			toast.dismiss();
			toast.error(t("orders.error_update_status"));
		}
	};

	if (loading) return <Loader text={t("orders.loading_orders")} />;
	if (!orders.length) return <p className="text-center mt-4 text-gray-500">{t("orders.no_orders_registered")}</p>;

	return (
		<div className="bg-white rounded-xl shadow-md border border-gray-100 mt-6 overflow-hidden">
			<Toaster
				position="top-center"
				toastOptions={{
					style: {
						background: "#07484a",
						color: "#fff",
						borderRadius: "10px",
						fontFamily: "var(--font-landing)",
					},
					success: {
						iconTheme: { primary: "#3a7d3a", secondary: "#fff" },
					},
					error: {
						iconTheme: { primary: "#a23e48", secondary: "#fff" },
					},
				}}
			/>

			{/* Desktop */}
			<div className="hidden md:block overflow-x-auto">
				<table className="min-w-full text-sm">
					<thead className="bg-primary text-white">
						<tr>
							<th className="text-left px-4 py-3 font-medium">{t("orders.order_number")}</th>
							<th className="text-left px-4 py-3 font-medium">{t("orders.order_date")}</th>
							<th className="text-left px-4 py-3 font-medium">{t("orders.total_order")} ({t("common.currency")})</th>
							<th className="text-left px-4 py-3 font-medium">{t("orders.actual_status")}</th>
							<th className="text-left px-4 py-3 font-medium">{t("orders.update_status")}</th>
							<th className="text-left px-4 py-3 font-medium">{t("common.actions")}</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{orders.map((order) => (
							<OrderRow
								key={order._id || order.id || order.orderId}
								order={order}
								onChange={handleStatusChange}
							/>
						))}
					</tbody>
				</table>
			</div>

			{/* Mobile */}
			<div className="md:hidden flex flex-col gap-4 p-4">
				{orders.map((order) => (
					<OrderCard
						key={order._id || order.id || order.orderId}
						order={order}
						onChange={handleStatusChange}
					/>
				))}
			</div>
		</div>
	);
});
