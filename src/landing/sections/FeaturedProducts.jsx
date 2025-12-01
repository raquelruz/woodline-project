import { useMemo } from "react";
import { Loader } from "../components/Loader";
import { FeaturedProductCard } from "../components/FeaturedProductCard";
import { useFeaturedProducts } from "../../hooks/useFeaturedProductCard";

export const FeaturedProducts = () => {
	const { featured, loading } = useFeaturedProducts();

	const memoizedCards = useMemo(() => {
		return featured.map((product) => (
			<FeaturedProductCard key={product._id || product.id} product={product} />
		));
	}, [featured]);

	if (loading) return <Loader text="Cargando productos destacados..." />;

	console.log("Render FeaturedProducts");

	return (
		<section className="py-24 bg-gray-50">
			<div className="text-center mb-12">
				<h2 className="text-4xl font-title font-extrabold text-gray-800">
					Nuevos <span className="text-primary">Productos</span>
				</h2>
				<p className="text-gray-500 mt-2">
					Descubre las últimas incorporaciones a nuestra colección de muebles
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
				{memoizedCards}
			</div>
		</section>
	);
};
