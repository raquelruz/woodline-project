import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export const OrderHeader = memo(({ orderId }) => {
	const { t } = useTranslation();

	return (
		<div className="flex justify-between items-center mb-10">
			<Link to="/profile" className="flex items-center gap-2 text-primary hover:text-primary-light transition">
				<IoArrowBackCircleOutline className="text-2xl" />
				<span className="font-semibold">{t("common.back")}</span>
			</Link>

			<h1 className="font-title font-bold text-2xl text-gray-800">{t("orders.order")} #{orderId}</h1>
		</div>
	);
});
