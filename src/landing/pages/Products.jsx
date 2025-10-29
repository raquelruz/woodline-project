import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../core/http/axios";
import { ProductFilters } from "../components/Products/ProductFilters";
import { ProductGrid } from "../components/Products/ProductsGrid";
import { Loader } from "../components/Loader";

export const Products = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useState({
		minPrice: 0,
		maxPrice: Infinity,
		sort: "",
	});
	const [searchTerm, setSearchTerm] = useState("");

	const location = useLocation();
	const navigate = useNavigate();
	const searchParams = new URLSearchParams(location.search);
	const categoryQuery = searchParams.get("category") || "all";

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				const response = await api.get("/products");
				const data = response.data;

				setProducts(data);

				const uniqueCategories = [...new Set(data.flatMap((p) => p.category || []))];
				setCategories(uniqueCategories);

				if (categoryQuery && categoryQuery !== "all") {
					setSelectedCategory(categoryQuery);
				}
			} catch (error) {
				// console.error("Error al obtener productos:", error);
				throw error;
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [categoryQuery]);

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
		if (category === "all") {
			navigate("/products");
		} else {
			navigate(`/products?category=${encodeURIComponent(category)}`);
		}
	};

	const handleFilterChange = (newFilters) => {
		setFilters(newFilters);
	};

	const handleSearchChange = (term) => {
		setSearchTerm(term);
	};

	const handleViewProduct = (productId) => {
		navigate(`/products/${productId}`);
	};

	const filterProducts = () => {
		let filtered = products.filter((p) => {
			const matchesCategory = selectedCategory === "all" || p.category?.includes(selectedCategory);

			const matchesSearch =
				searchTerm === "" ||
				p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				p.description.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesPrice = (p.price ?? 0) >= filters.minPrice && (p.price ?? 0) <= filters.maxPrice;

			return matchesCategory && matchesSearch && matchesPrice;
		});

		if (filters.sort === "priceAsc") {
			filtered = [...filtered].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
		} else if (filters.sort === "priceDesc") {
			filtered = [...filtered].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
		}

		return filtered;
	};

	const filteredProducts = filterProducts();

	if (loading) return <Loader text="Cargando productos..." />;

	return (
		<section className="min-h-dvh font-title px-6 py-12 bg-gray-50">
			<ProductFilters
				categories={categories}
				selectedCategory={selectedCategory}
				setSelectedCategory={handleCategoryChange}
				onFilterChange={handleFilterChange}
				onSearchChange={handleSearchChange}
			/>

			{!filteredProducts.length && (
				<div className="text-center text-gray-500 mt-20">
					<p>No se encontraron productos que coincidan con la búsqueda.</p>
				</div>
			)}

			{filteredProducts.length > 0 && (
				<ProductGrid products={filteredProducts} onView={handleViewProduct} searchQuery={searchTerm} />
			)}
		</section>
	);
};
