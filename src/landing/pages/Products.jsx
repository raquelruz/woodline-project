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
	const [filters, setFilters] = useState({
		minPrice: 0,
		maxPrice: Infinity,
		sort: "",
	});
	const [searchTerm, setSearchTerm] = useState(""); // 🔎 buscador

	const location = useLocation();
	const navigate = useNavigate();
	const searchParams = new URLSearchParams(location.search);
	const categoryQuery = searchParams.get("category") || "all";

	// 🔹 Obtener productos y categorías
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
				console.error("❌ Error al obtener productos:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchProducts();
	}, [categoryQuery]);

	// 🔹 Cambio de categoría (actualiza URL)
	function handleCategoryChange(category) {
		setSelectedCategory(category);
		if (category === "all") {
			navigate("/products");
		} else {
			navigate(`/products?category=${encodeURIComponent(category)}`);
		}
	}

	// 🔹 Recibe filtros desde ProductFilters
	function handleFilterChange(newFilters) {
		setFilters(newFilters);
	}

	// 🔹 Recibe término de búsqueda desde ProductFilters
	function handleSearchChange(term) {
		setSearchTerm(term);
	}

	// 🔹 Filtrado y ordenado
	function filterProducts() {
		let filtered = products.filter((p) => {
			const matchesCategory =
				selectedCategory === "all" || p.category?.includes(selectedCategory);

			const matchesSearch =
				searchTerm === "" ||
				p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				p.description.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesPrice =
				(p.price ?? 0) >= filters.minPrice && (p.price ?? 0) <= filters.maxPrice;

			return matchesCategory && matchesSearch && matchesPrice;
		});

		// 🔹 Ordenar por precio
		if (filters.sort === "priceAsc") {
			filtered = [...filtered].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
		} else if (filters.sort === "priceDesc") {
			filtered = [...filtered].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
		}

		return filtered;
	}

	const filteredProducts = filterProducts();

	if (loading) return <Loader text="Cargando productos..." />;

	return (
		<section className="min-h-dvh font-title px-6 py-12 bg-gray-50">
			<ProductFilters
				categories={categories}
				selectedCategory={selectedCategory}
				setSelectedCategory={handleCategoryChange}
				onFilterChange={handleFilterChange}
				onSearchChange={handleSearchChange} // ✅ nuevo
			/>

			{filteredProducts.length === 0 ? (
				<div className="text-center text-gray-500 mt-20">
					<p>No se encontraron productos que coincidan con la búsqueda.</p>
				</div>
			) : (
				<ProductGrid
					products={filteredProducts}
					onView={setProduct}
					searchQuery={searchTerm}
				/>
			)}

			<ProductModal isOpen={!!product} onClose={() => setProduct(null)}>
				{product && <ProductModalContent product={product} />}
			</ProductModal>
		</section>
	);
};
