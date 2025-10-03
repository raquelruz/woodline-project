import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../core/http/axios";
import { ProductModal } from "../components/Modals/ProductModal";

import { ProductFilters } from "../components/Products/ProductFilters";
import { ProductGrid } from "../components/Products/ProductsGrid";
import { ProductModalContent } from "../components/Products/ProductModalContent";
import { Loader } from "../components/Loader";

export const Products = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const searchQuery = searchParams.get("search") || "";

	useEffect(() => {
		setLoading(true);
		api.get("/products")
			.then((response) => {
				setProducts(response.data);
				const uniqueCategories = [
					...new Set(response.data.flatMap((p) => p.category || [])),
				];
				setCategories(uniqueCategories);
			})
			.catch((error) => console.error("Error fetching products:", error))
			.finally(() => setLoading(false));
	}, []);

	const filteredProducts = products.filter((p) => {
		const matchesCategory =
			selectedCategory === "all" || p.category?.includes(selectedCategory);

		const matchesSearch =
			searchQuery === "" ||
			p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			p.description.toLowerCase().includes(searchQuery.toLowerCase());

		return matchesCategory && matchesSearch;
	});

	return (
		<div className="min-h-dvh font-title px-6 py-12 bg-gray-50">
			<h1 className="text-4xl font-bold text-center mb-12 text-primary">Productos</h1>

			<ProductFilters
				categories={categories}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>

			{loading ? (
				<Loader text="Cargando productos..." />
			) : (
				<ProductGrid
					products={filteredProducts}
					onView={setProduct}
					searchQuery={searchQuery}
				/>
			)}

			<ProductModal isOpen={!!product} onClose={() => setProduct(null)}>
				{product && <ProductModalContent product={product} />}
			</ProductModal>
		</div>
	);
};
