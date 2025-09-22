import { useEffect, useState } from "react";
import { api } from "../../core/http/axios";

export const Products = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		api.get("/products")
			.then((response) => {
				console.log("Products data:", response.data);
				setProducts(response.data);
			})
			.catch((error) => {
				console.log("Error fetching products:", error);
			});
	}, []);

	return (
		<div className="min-h-dvh font-title px-6 py-12">
			<h1 className="text-4xl font-bold text-center mb-12 text-primary-pressed">Productos</h1>

			<div className="font-landing grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{products.map((product) => (
						<div
							key={product.id}
							className="rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
						>
							<img
								src={product.images}
								alt={product.name}
								className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
							/>
							<div className="p-6">
								<h2 className="text-xl font-bold text-primary-pressed mb-2">{product.name}</h2>
								<p className="text-gray-600 text-sm mb-4">{product.description}</p>
								<div className="flex justify-between items-center">
									<span className="text-lg font-semibold text-primary-pressed">
										{product.price} €
									</span>
									<button className="px-4 py-2 text-sm font-medium text-white bg-primary-pressed rounded-lg hover:bg-primary-hover transition-colors">
										Ver más
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
		</div>
	);
};
