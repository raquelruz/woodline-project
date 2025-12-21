import { useContext } from "react";
import { FavoritesContext } from "../../../contexts/FavoritesContext.jsx"
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const FavButton = ({ product, size = 24 }) => {
	const { favorites, toggleFavorite } = useContext(FavoritesContext);
	const favs = Array.isArray(favorites) ? favorites : [];
	const isFav = !!product?.sku && favs.some((favorite) => favorite?.sku === product.sku);
	const disabled = !product?.id;

	return (
		<button
			onClick={() => toggleFavorite(product)}
			disabled={disabled}
			title={disabled ? "Este producto no tiene ID válido para la API" : ""}
			className={disabled ? "opacity-50 cursor-not-allowed" : ""}
		>
			{isFav ? <FaHeart size={size} className="text-red-500" /> : <FaRegHeart size={size} />}
		</button>
	);
};
