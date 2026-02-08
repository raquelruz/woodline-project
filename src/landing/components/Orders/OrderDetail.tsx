import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getOrdersApi } from "../../../core/orders/orders.api";
import { Loader } from "../Loader";
import { OrderInfoCard } from "./OrderInfoCard";
import { OrderProductList } from "./OrderProductList";
import { OrderHeader } from "./OrderHeader";
import { BackButton } from "../Buttons/BackButton";
import { formatOrderId, translateStatus, getStatusClass, formatDate } from "../../../dashboard/utils/orderUtils";
import { IoCalendarOutline, IoCashOutline, IoInformationCircleOutline, IoCubeOutline } from "react-icons/io5";
import { useTranslate } from "../../../translations/useTranslate";
import type { OrderWithBackendId } from "../../../core/orders/orders.types";
import { useAuthContext } from "../../../hooks/useAuthContext";


const OrderDetail = () => {
	const { t } = useTranslate();
	const { id } = useParams<{ id: string }>();
	const { user } = useAuthContext();

	const [order, setOrder] = useState<OrderWithBackendId | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchOrder = useCallback(async () => {
		if (!id || !user?.id) {
			setOrder(null);
			setLoading(false);
			return;
		}

		setLoading(true);

		try {
			const pedidos: OrderWithBackendId[] = await getOrdersApi(user.id);

			const found = pedidos.find((pedido) => pedido._id === id || pedido.id === id);

			setOrder(found ?? null);
		} catch (error) {
			console.error(t("orders.error_order"), error);
			setOrder(null);
		} finally {
			setLoading(false);
		}
	}, [id, user?.id, t]);

	useEffect(() => {
		fetchOrder();
	}, [fetchOrder]);

	const loadingComponent = useMemo(() => <Loader text={t("orders.loading_order")} />, []);

	const notFoundComponent = useMemo(
		() => <p className="text-error text-center mt-10">{t("orders.order_not_found")}</p>,
		[],
	);

	const formattedDate = useMemo(() => (order ? formatDate(order.createdAt) : ""), [order]);

	const orderId = useMemo(() => (order ? formatOrderId(order._id || order.id) : ""), [order]);

	const statusLabel = useMemo(() => (order ? translateStatus(order.status) : ""), [order]);

	const statusClass = useMemo(() => (order ? getStatusClass(order.status) : ""), [order]);

	if (loading) return loadingComponent;
	if (!order) return notFoundComponent;

	return (
		<section className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-md border border-gray-100 mt-6">
			<OrderHeader orderId={orderId} />

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
				<OrderInfoCard
					icon={<IoCalendarOutline className="text-primary text-2xl" />}
					label={t("common.date")}
					value={formattedDate}
				/>

				<OrderInfoCard
					icon={<IoCashOutline className="text-primary text-2xl" />}
					label={t("orders.total_order")}
					value={`${order.total} ${t("orders.currency")}`}
				/>

				<OrderInfoCard
					icon={<IoInformationCircleOutline className="text-primary text-2xl" />}
					label={t("orders.status")}
					value={<span className={statusClass}>{statusLabel}</span>}
				/>
			</div>

			<div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
				<h2 className="font-title font-semibold text-xl text-gray-800 mb-4 flex items-center gap-2">
					<IoCubeOutline className="text-primary text-2xl" />
					{t("orders.order_summary")}
				</h2>

				<OrderProductList items={order.items ?? []} />
			</div>

			<BackButton />
		</section>
	);
};

export default OrderDetail;
