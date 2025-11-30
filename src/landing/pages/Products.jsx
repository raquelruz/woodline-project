import { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../core/http/axios";
import { ProductFilters } from "../components/Products/ProductFilters";
import { ProductsGrid } from "../components/Products/ProductsGrid";
import { Loader } from "../components/Loader";

export const Products = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	const [selectedCategory, setSelectedCategory] = useState("all");
	const [filters, setFilters] = useState({
		minPrice: 0,
		maxPrice: Infinity,
		sort: "",
	});
	const [searchTerm, setSearchTerm] = useState("");

	const location = useLocation();
	const navigate = useNavigate();

	const categoryQuery = useMemo(() => {
		const params = new URLSearchParams(location.search);
		return params.get("category") || "all";
	}, [location.search]);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				const { data } = await api.get("/products");
				setProducts(data);

				const unique = [...new Set(data.flatMap((p) => p.category || []))];
				setCategories(unique);

				setSelectedCategory(categoryQuery);
			} catch (error) {
				console.error("Error al obtener productos:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [categoryQuery]);

	const handleCategoryChange = useCallback(
		(category) => {
			setSelectedCategory(category);

			if (category === "all") {
				navigate("/products");
				return;
			}

			const encoded = encodeURIComponent(category);
			navigate(`/products?category=${encoded}`);
		},
		[navigate]
	);

	const handleFilterChange = useCallback((newFilters) => {
		setFilters(newFilters);
	}, []);

	const handleSearchChange = useCallback((term) => {
		setSearchTerm(term);
	}, []);

	const handleViewProduct = useCallback(
		(product) => {
			const id = product.id || product._id;
			navigate(`/products/${id}`);
		},
		[navigate]
	);

	const filteredProducts = useMemo(() => {
		let result = products;

		if (selectedCategory !== "all") {
			result = result.filter((p) => p.category?.includes(selectedCategory));
		}

		if (searchTerm) {
			const q = searchTerm.toLowerCase();
			result = result.filter((p) => {
				return (
					p.name.toLowerCase().includes(q) ||
					p.description.toLowerCase().includes(q)
				);
			});
		}

		result = result.filter((p) => {
			const price = p.price ?? 0;
			return price >= filters.minPrice && price <= filters.maxPrice;
		});

		if (filters.sort === "priceAsc") {
			result = [...result].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
		}

		if (filters.sort === "priceDesc") {
			result = [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
		}

		return result;
	}, [products, selectedCategory, searchTerm, filters]);

	if (loading) {
		return <Loader text="Cargando productos..." />;
	}

	console.log("RENDER PRODUCTS");

	return (
		<section className="min-h-dvh font-title px-6 py-12 bg-gray-50">

			<ProductFilters
				categories={categories}
				selectedCategory={selectedCategory}
				onCategoryChange={handleCategoryChange}
				onFilterChange={handleFilterChange}
				onSearchChange={handleSearchChange}
			/>

			<div className="mt-10">
				{filteredProducts.length === 0 && (
					<div className="text-center text-gray-500 mt-20">
						<p>No se encontraron productos.</p>
					</div>
				)}

				{filteredProducts.length > 0 && (
					<ProductsGrid products={filteredProducts} onView={handleViewProduct} />
				)}
			</div>

		</section>
	);
};
