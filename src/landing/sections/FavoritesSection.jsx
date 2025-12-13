export const FavoritesSection = ({ favorites }) => {
	const hasFavorites = favorites.length > 0;

	return (
		<div className="p-4">
			<h2 className="text-3xl text-primary font-semibold mb-6">
				Productos favoritos ♥
			</h2>

			{hasFavorites && <FavoritesCard products={favorites} />}
			{!hasFavorites && <EmptyFavorites />}
		</div>
	);
};
