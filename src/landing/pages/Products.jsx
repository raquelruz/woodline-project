import { useEffect, useState } from "react";
import { api } from "../../core/http/axios";
import { ProductModal } from "../components/Modals/ProductModal";
import { LikeButton } from "../components/Buttons/LikeButton";
import { AddToCartButton } from "../components/Buttons/AddToCartButton";

export const Products = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [product, setProduct] = useState(null);

	useEffect(() => {
		api.get("/products")
			.then((response) => {
				setProducts(response.data);

				// Extraer categorías únicas de todos los productos
				const uniqueCategories = [...new Set(response.data.flatMap((p) => p.category || []))];
				setCategories(uniqueCategories);
			})
			.catch((error) => console.error("❌ Error fetching products:", error));
	}, []);

	// Filtrar productos según categoría seleccionada
	const filteredProducts =
		selectedCategory === "all" ? products : products.filter((p) => p.category?.includes(selectedCategory));

	return (
		<div className="min-h-dvh font-title px-6 py-12 bg-gray-50">
			<h1 className="text-4xl font-bold text-center mb-12 text-primary">Productos</h1>

			{/* Filtros de categorías */}
			<div className="flex flex-wrap gap-4 justify-center mb-12">
				<button
					onClick={() => setSelectedCategory("all")}
					className={`px-4 py-2 rounded-full font-medium transition ${
						selectedCategory === "all"
							? "bg-primary text-white"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					}`}
				>
					Todas
				</button>

				{categories.map((cat) => (
					<button
						key={cat}
						onClick={() => setSelectedCategory(cat)}
						className={`px-4 py-2 rounded-full font-medium transition ${
							selectedCategory === cat
								? "bg-primary text-white"
								: "bg-gray-200 text-gray-700 hover:bg-gray-300"
						}`}
					>
						{cat}
					</button>
				))}
			</div>

			{/* Grid de productos */}
			<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{filteredProducts.map((product, index) => (
					<div
						key={product._id || product.id || `${product.sku}-${index}`}
						className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
					>
						<img
							src={Array.isArray(product.images) ? product.images[0] : product.images}
							alt={product.name}
							className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
						/>

						<div className="p-6 flex flex-col justify-between flex-1">
							<div>
								<h2 className="text-xl font-bold text-primary mb-2">{product.name}</h2>
								<p className="text-gray-600 font-landing mb-4">{product.description}</p>

								{/* Etiquetas de categorías */}
								<div className="flex flex-wrap gap-2 mt-2">
									{product.category?.map((cat, i) => (
										<span
											key={i}
											className="px-2 py-1 text-xs rounded-full bg-primary-light/20 text-primary font-medium"
										>
											{cat}
										</span>
									))}
								</div>
							</div>

							<div className="flex justify-between items-center mt-4">
								<span className="text-xl font-landing font-bold text-primary">{product.price} €</span>
								<button
									onClick={() => setProduct(product)}
									className="px-4 py-2 font-landing font-medium text-white bg-primary rounded-lg hover:bg-primary-light transition-colors"
								>
									Ver más
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Modal para Productos */}
			<ProductModal isOpen={!!product} onClose={() => setProduct(null)}>
				{product && (
					<div className="flex flex-col md:flex-row w-full gap-6">
						<img
							src={Array.isArray(product.images) ? product.images[0] : product.images}
							alt={product.name}
							className="w-full md:w-1/2 h-80 object-cover rounded-2xl shadow-md"
						/>
						<div className="flex flex-col justify-between md:w-1/2">
							<div>
								<h2 className="text-3xl font-bold text-primary mb-3">{product.name}</h2>
								<p className="text-gray-700 font-landing mb-4">{product.longDescription}</p>
								<p className="font-landing font-semibold text-primary mb-4">
									Precio: {product.price} €
								</p>
								<p className="font-landing text-primary mb-4">SKU: {product.sku}</p>

								{/* Mostrar categorías en el modal */}
								<div className="flex flex-wrap gap-2 mb-4">
									{product.category?.map((cat, i) => (
										<span
											key={i}
											className="px-2 py-1 text-xs rounded-full bg-primary-light/20 text-primary font-medium"
										>
											{cat}
										</span>
									))}
								</div>
							</div>

							<div className="flex flex-row justify-between mt-4">
								<AddToCartButton product={product} />
								<LikeButton />
							</div>
						</div>
					</div>
				)}
			</ProductModal>
		</div>
	);
};
