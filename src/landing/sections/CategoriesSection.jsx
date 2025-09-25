import kitchenCategory from "../../assets/images/products/kitchen-category.jpg";
import livingCategory from "../../assets/images/products/livingroom-category.jpg";
import bedroomCategory from "../../assets/images/products/bedroom-category.jpg";
import bathroomCategory from "../../assets/images/products/bathroom-category.jpg";
import wallCategory from "../../assets/images/products/wall-category.jpg";
import { Link } from "react-router-dom";

const categories = [
	{
		id: 1,
		slug: "kitchen",
		name: "Cocina",
		description: "Muebles y accesorios para cocina",
		image: kitchenCategory,
	},
	{
		id: 2,
		slug: "livingroom",
		name: "Salón",
		description: "Muebles y decoración para tu salón",
		image: livingCategory,
	},
	{
		id: 3,
		slug: "bedroom",
		name: "Dormitorio",
		description: "Camas, armarios y decoración para tu descanso",
		image: bedroomCategory,
	},
	{
		id: 4,
		slug: "bathroom",
		name: "Baño",
		description: "Todo para un baño moderno y funcional",
		image: bathroomCategory,
	},
	{
		id: 5,
		slug: "wall",
		name: "Decoración de pared",
		description: "Accesorios para embellecer tus espacios con estilos únicos",
		image: wallCategory,
	},
];

export const CategoriesSection = () => {
	return (
		<section className="py-16 px-6 bg-gray-50">
			<div className="text-center mb-12">
				<h2 className="text-3xl font-extrabold text-gray-800">
					Explora por <span className="text-primary-pressed">Categorías</span>
				</h2>
				<p className="text-gray-500 mt-2">
					Encuentra inspiración para cada rincón de tu hogar
				</p>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
				{categories.map((category) => (
					<Link
						to={`/categories/${category.slug}`} 
						key={category.id}
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
		</section>
	);
};