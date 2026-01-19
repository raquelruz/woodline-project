import { t } from "i18next";

export const EmptyFavorites = () => {
	const buttonClasses = "bg-primary-light text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary transition";

	return (
		<div className="flex flex-col items-center justify-center py-20 text-center">
			<p className="text-gray-500 text-lg mb-6">{t("products.no_added_favorites")}</p>

			<a href="/products" className={buttonClasses}>
				{t("products.back_to_products")}
			</a>
		</div>
	);
};
