import { memo, useMemo } from "react";
import { useTranslate } from "../../../translations/useTranslate";

export const OrderProductList = memo(({ items }) => {
	const { t } = useTranslate();
	const productList = useMemo(() => {
		if (!items || items.length === 0) {
			return <p className="text-gray-500 text-center py-4">{t("common.no_results")}</p>;
		}

		return (
			<ul className="divide-y divide-gray-200">
				{items.map((item) => (
					<li
						key={item.productId || item.id || item._id}
						className="flex justify-between items-center py-4 hover:bg-white rounded-lg px-2 transition"
					>
						<div>
							<p className="font-medium text-gray-800">{item.name}</p>
							<p className="text-sm text-gray-500">{t("common.quantity")}: {item.quantity || 1}</p>
						</div>

						<p className="font-semibold text-gray-700">{Number(item.price).toFixed(2)} {t("orders.currency")}</p>
					</li>
				))}
			</ul>
		);
	}, [items]);

	return productList;
});
