import { useTranslate } from "../../translations/useTranslate";
import { EmptyFavorites } from "../components/Favorites/EmptyFavorites";
import { FavoritesCard } from "../components/Favorites/FavoritesCard";

export const FavoritesSection = ({ favorites }) => {
	const { t } = useTranslate();
	const hasFavorites = favorites.length > 0;

	return (
		<div className="p-4">
			<h2 className="text-3xl text-primary font-semibold mb-6">
				{t("products.favorite_products")}
			</h2>

			{hasFavorites && <FavoritesCard products={favorites} />}
			{!hasFavorites && <EmptyFavorites />}
		</div>
	);
};
