import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../core/http/axios";
import { ProductModal } from "../components/Modals/ProductModal";
import { ProductFilters } from "../components/Products/ProductFilters";
import { ProductGrid } from "../components/Products/ProductsGrid";
import { ProductModalContent } from "../components/Modals/ProductModalContent";
import { Loader } from "../components/Loader";

export const Products = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

	const location = useLocation();
	const navigate = useNavigate();
	const searchParams = new URLSearchParams(location.search);
	const searchQuery = searchParams.get("search") || "";
	const categoryQuery = searchParams.get("category") || "all";

	useEffect(() => {
		async function fetchProducts() {
			setLoading(true);
			try {
				const response = await api.get("/products");
				const data = response.data;

				setProducts(data);

				const uniqueCategories = [
					...new Set(data.flatMap((p) => p.category || [])),
				];
				setCategories(uniqueCategories);

				if (categoryQuery && categoryQuery !== "all") {
					setSelectedCategory(categoryQuery);
				}
			} catch (error) {
				console.error("Error al obtener productos:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchProducts();
	}, [categoryQuery]);

	function handleCategoryChange(category) {
		setSelectedCategory(category);
		if (category === "all") {
			navigate("/products");
		} else {
			navigate(`/products?category=${encodeURIComponent(category)}`);
		}
	}

	function filterProducts() {
		return products.filter((p) => {
			const matchesCategory =
				selectedCategory === "all" || p.category?.includes(selectedCategory);

			const matchesSearch =
				searchQuery === "" ||
				p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				p.description.toLowerCase().includes(searchQuery.toLowerCase());

			return matchesCategory && matchesSearch;
		});
	}

	const filteredProducts = filterProducts();

	if (loading) {
		return <Loader text="Cargando productos..." />;
	}

	return (
		<section className="min-h-dvh font-title px-6 py-12 bg-gray-50">
			<h1 className="text-4xl font-bold text-center mb-12 text-primary">
				Productos
			</h1>

			<ProductFilters
				categories={categories}
				selectedCategory={selectedCategory}
				setSelectedCategory={handleCategoryChange}
			/>

			{filteredProducts.length === 0 ? (
				<div className="text-center text-gray-500 mt-20">
					<p>No se encontraron productos que coincidan con la búsqueda.</p>
				</div>
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
		</section>
	);
};
