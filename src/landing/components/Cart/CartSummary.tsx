import { memo, useMemo } from "react";
import { useTranslate } from "../../../translations/useTranslate";

type CartSummaryProps = {
	subtotal: number;
	deliveryFee: number;
	discount: number;
	total: number;
	onCheckout: () => void;
	buttonClasses?: string;
}

export const CartSummary = memo(({ subtotal, deliveryFee, discount, total, onCheckout, buttonClasses }: CartSummaryProps ) => {
	const { t } = useTranslate();
	const summaryValues = useMemo(() => {
		return {
			formattedSubtotal: `${subtotal.toFixed(2)} ${t("common.currency")}`,
			formattedDelivery: `${deliveryFee.toFixed(2)} ${t("common.currency")}`,
			formattedDiscount: `-${Math.round(discount * 100)}%`,
			formattedTotal: `${total.toFixed(2)} ${t("common.currency")}`,
		};
	}, [subtotal, deliveryFee, discount, total]);

	return (
		<div className="bg-white shadow-md rounded-xl p-6 h-fit">
			<h2 className="font-title text-xl font-bold text-primary-pressed mb-4">{t("orders.order_summary")}</h2>

			<div className="space-y-2 text-gray-600">
				<div className="flex justify-between">
					<span>{t("orders.subtotal")}</span>
					<span>{summaryValues.formattedSubtotal}</span>
				</div>

				<div className="flex justify-between">
					<span>{t("orders.shipping_costs")}</span>
					<span>{summaryValues.formattedDelivery}</span>
				</div>

				<div className="flex justify-between text-success">
					<span>{t("orders.discount")}</span>
					<span>{summaryValues.formattedDiscount}</span>
				</div>
			</div>

			<div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-3 mt-3 text-gray-800">
				<span>{t("orders.total_order")}</span>
				<span>{summaryValues.formattedTotal}</span>
			</div>

			<button onClick={onCheckout} className={buttonClasses} aria-label="Ir al checkout">
				{t("orders.shop_now")} →
			</button>
		</div>
	);
});
