import { useOrders } from "../hooks/useOrders";
import { OrderTable } from "../components/Orders/OrderTable";
import { memo } from "react";
import { useTranslate } from "../../translations/useTranslate";

const OrdersPage = memo(() => {
	const { t } = useTranslate();
	const { orders, updateStatus } = useOrders();

	return (
		<section>
			<h2 className="font-title text-center font-bold text-primary mb-4">{t("orders.orders_title")}</h2>
			<p className="text-gray-600 text-center mb-6">
				{t("orders.orders_subtitle")}
			</p>

			<OrderTable orders={orders} onUpdate={updateStatus} />
		</section>
	);
});

export default OrdersPage;