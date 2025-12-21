import { memo, useMemo } from "react";
import { useTranslate } from "../../../translations/useTranslate";

export const EmptyCart = memo(() => {
	const { t } = useTranslate();
	const buttonClasses = useMemo(
		() => "bg-primary-light text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary transition",
		[]
	);

	return (
		<div className="flex flex-col items-center justify-center py-20 text-center">
			<p className="text-gray-500 text-lg mb-6">{t("orders.cart_empty")}</p>

			<a href="/products" className={buttonClasses}>
				{t("products.back_to_products")}
			</a>
		</div>
	);
});
