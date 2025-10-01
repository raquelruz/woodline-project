import { useEffect, useState } from "react";
import { api } from "../../core/http/axios";
import { ProductModal } from "../components/ProductModal";
import { LikeButton } from "../components/LikeButton";
import { AddToCartButton } from "../components/AddToCartButton";

export const Products = () => {
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState(null);

	useEffect(() => {
		api.get("/products")
			.then((response) => setProducts(response.data))
			.catch((error) => console.error("Error fetching products:", error));
	}, []);

	return (
		<div className="min-h-dvh font-title px-6 py-12 bg-gray-50">
			<h1 className="text-4xl font-bold text-center mb-12 text-primary-pressed">Productos</h1>

			<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{products.map((product) => (
					<div
						key={product._id || product.id || `${product.sku}-${index}`}
						className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
					>
						<img
							src={product.images}
							alt={product.name}
							className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
						/>
						<div className="p-6 flex flex-col justify-between flex-1">
							<div>
								<h2 className="text-xl font-bold text-primary-pressed mb-2">{product.name}</h2>
								<p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
							</div>
							<div className="flex justify-between items-center mt-4">
								<span className="text-lg font-semibold text-primary-pressed">{product.price} €</span>
								<button
									onClick={() => setProduct(product)}
									className="px-4 py-2 text-sm font-medium text-white bg-primary-pressed rounded-lg hover:bg-primary-hover transition-colors"
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
							src={product.images}
							alt={product.name}
							className="w-full md:w-1/2 h-80 object-cover rounded-2xl shadow-md"
						/>
						<div className="flex flex-col justify-between md:w-1/2">
							<div>
								<h2 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h2>
								<p className="text-gray-700 mb-4">{product.description}</p>
								<p className="text-2xl font-semibold text-primary-pressed mb-4">
									Precio: {product.price} €
								</p>
							</div>

							<div className="flex flex-row justify-between">
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
