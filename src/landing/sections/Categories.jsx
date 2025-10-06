import { useNavigate } from "react-router-dom";
import { useCategories } from "../../core/categories/useCategories";
import { Loader } from "../components/Loader";

export const Categories = () => {
	const { categories, loading } = useCategories();
	const navigate = useNavigate();

	if (loading) {
		return <Loader text="Cargando categorías..." />;
	}

	function handleCategoryClick(slug) {
		navigate(`/products?category=${encodeURIComponent(slug)}`);
	}

	return (
		<section className="py-24 bg-bg-light text-center">
			<div className="mb-16">
				<h2 className="text-4xl font-title font-extrabold text-gray-800">
					Explora nuestras <span className="text-primary">Categorías</span>
				</h2>
				<p className="text-gray-500 mt-3">
					Muebles y decoración pensados para cada rincón de tu hogar
				</p>
			</div>

			<div className="flex flex-wrap justify-center gap-10 px-6">
				{categories.map((category, index) => (
					<div
						key={index}
						onClick={() => handleCategoryClick(category.slug)}
						className="flex flex-col items-center cursor-pointer group"
					>
						<div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-white hover:border-primary transition-all duration-500">
							<img
								src={category.image}
								alt={category.name}
								className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
							/>
							<div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
						</div>

						<h3 className="mt-4 text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
							{category.name}
						</h3>
					</div>
				))}
			</div>
		</section>
	);
};
