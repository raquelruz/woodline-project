import { memo, useCallback, useMemo, useState } from "react";
import { useCart } from "../../../core/cart/useCart";
import { IoCartOutline, IoCheckmarkCircle } from "react-icons/io5";
import { useTranslate } from "../../../translations/useTranslate";

export const AddToCartButton = memo(({ product }) => {
	const { t } = useTranslate();
	const { addToCart } = useCart();
	const [added, setAdded] = useState(false);

	const handleAdd = useCallback(() => {
		if (!product) return;

		addToCart(product);
		setAdded(true);
		setTimeout(() => setAdded(false), 2000);
	}, [addToCart, product]);

	const { buttonClasses, Icon, label } = useMemo(() => {
		const isAdded = added;

		return {
			buttonClasses: [
				"flex items-center justify-center gap-3 font-semibold py-4 rounded-xl text-lg shadow-md transition-all duration-300 w-full text-white",
				isAdded ? "bg-green-500 hover:bg-green-600" : "bg-primary hover:bg-primary-light hover:shadow-lg",
			].join(" "),
			Icon: isAdded ? IoCheckmarkCircle : IoCartOutline,
			label: isAdded ? t("products.added_to_cart") : t("products.add_to_cart"),
		};
	}, [added]);

	return (
		<button onClick={handleAdd} className={buttonClasses}>
			<Icon className="text-2xl" />
			{label}
		</button>
	);
});
