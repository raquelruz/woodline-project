import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useFeaturedProducts } from "../../hooks/useFeaturedProductCard";
import { useTranslate } from "../../translations/useTranslate";
import type { Product } from "../../core/products/products.types";

export const FeaturedProducts = () => {
	const { t } = useTranslate();
	const { featured, loading } = useFeaturedProducts() as {
		featured: Product[];
		loading: boolean;
	};

	const memoizedList = useMemo(() => {
		return featured.map((product) => (
			<Link
				to={`/products?search=${encodeURIComponent(product.name)}`}
				key={product.id}
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
					<p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>
					<span className="text-primary font-bold text-lg">{product.price}€</span>
				</div>
			</Link>
		));
	}, [featured]);

	if (loading) return <Loader text="Cargando productos destacados..." />;

	return (
		<section className="py-24 bg-gray-50">
			<div className="text-center mb-12">
				<h2 className="text-4xl font-title font-extrabold text-gray-800">
					{t("pages.home.newproducts_title")}
				</h2>
				<p className="text-gray-500 mt-2">{t("pages.home.newproducts_description")}</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">{memoizedList}</div>
		</section>
	);
};
