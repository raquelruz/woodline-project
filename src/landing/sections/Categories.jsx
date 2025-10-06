import { useNavigate } from "react-router-dom";
import { useCategories } from "../../core/categories/useCategories";
import { SectionContainer } from "../components/SectionContainer";
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
		<section className="relative py-24 bg-bg-light">
			<div className="text-center mb-16">
				<h2 className="text-4xl font-title font-extrabold text-gray-800">
					Explora nuestras <span className="text-primary">Categorías</span>
				</h2>
				<p className="text-gray-500 mt-3">
					Muebles y decoración pensados para cada rincón de tu hogar
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
				{categories.map((category, index) => (
					<div
						key={index}
						onClick={() => handleCategoryClick(category.slug)}
						className="relative group rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
					>
						<img
							src={category.image}
							alt={category.name}
							className="w-full h-[320px] object-cover transform group-hover:scale-110 transition-transform duration-700"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-500"></div>

						<div className="absolute bottom-0 p-6 text-white">
							<h3 className="text-2xl font-semibold mb-1">{category.name}</h3>
							<p className="text-sm text-gray-200">{category.description}</p>
							<button className="mt-4 px-5 py-2 bg-primary rounded-full text-sm font-semibold hover:bg-primary-light transition-all">
								Ver productos
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
