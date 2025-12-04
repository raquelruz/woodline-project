import { memo } from "react";
import { Link } from "react-router-dom";

export const FeaturedProductCard = memo(({ product }) => {
	return (
		<Link
			to={`/products?search=${encodeURIComponent(product.name)}`}
			className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden group"
		>
			<div className="relative overflow-hidden">
				<img
					src={product.images?.[0] || "/fallback-product.jpg"}
					alt={product.name}
					className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
				/>
				<div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
					Nuevo
				</div>
			</div>
			<div className="p-6 text-center">
				<h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
				<p className="text-gray-500 text-sm line-clamp-2 mb-4">
					{product.description}
				</p>
				<span className="text-primary font-bold text-lg">
					{product.price}€
				</span>
			</div>
		</Link>
	);
});