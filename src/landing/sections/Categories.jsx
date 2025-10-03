import { Link } from "react-router-dom";
import { useCategories } from "../../core/categories/useCategories";
import { SectionContainer } from "../components/SectionContainer";
import { Loader } from "../components/Loader";

export const Categories = () => {
	const { categories, loading } = useCategories();

	if (loading) {
		return <Loader text="Cargando categorías..." />;
	}

	return (
		<SectionContainer>
			<div className="text-center mb-12">
				<h2 className="text-3xl font-title font-extrabold text-gray-800">
					Explora por <span className="font-title text-primary">Categorías</span>
				</h2>
				<p className="text-gray-500 mt-2">Encuentra inspiración para cada rincón de tu hogar</p>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
				{categories.map((category, index) => (
					<Link
						to={`/categories/${category.slug}`}
						key={index}
						className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer"
					>
						<img
							src={category.image}
							alt={category.name}
							className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition"></div>
						<div className="absolute bottom-4 left-4 right-4 text-white">
							<h3 className="text-xl font-semibold">{category.name}</h3>
							<p className="text-sm text-gray-200">{category.description}</p>
						</div>
					</Link>
				))}
			</div>
		</SectionContainer>
	);
};
