import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../core/http/axios";
import { ProductFilters } from "../components/Products/ProductFilters";
import { ProductGrid } from "../components/Products/ProductGrid";
import { Loader } from "../components/Loader";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { PageError } from "../components/PageError";
import { useTranslate } from "../../translations/useTranslate";
import type { Product } from "../../core/products/products.types";

type Filters = {
	minPrice: number;
	maxPrice: number;
	sort: "" | "priceAsc" | "priceDesc";
};

const Products = memo(() => {
	const { t } = useTranslate();

	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<string[]>([]);

	const [loading, setLoading] = useState<boolean>(true);

	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [filters, setFilters] = useState<Filters>({
		minPrice: 0,
		maxPrice: Infinity,
		sort: "",
	});
	const [searchTerm, setSearchTerm] = useState<string>("");

	const searchInputRef = useRef<HTMLInputElement | null>(null);

	const location = useLocation();
	const navigate = useNavigate();

	const categoryQuery = useMemo(() => {
		const params = new URLSearchParams(location.search);
		return params.get("category") || "all";
	}, [location.search]);

	const fetchProducts = useCallback(async () => {
		setLoading(true);
		try {
			const { data } = await api.get<Product[]>("/products");
			setProducts(data);

			const unique = Array.from(
				new Set(
					data.flatMap((product) =>
						Array.isArray(product.category) ? product.category : product.category ? [product.category] : [],
					),
				),
			);

			setCategories(unique);

			if (categoryQuery !== "all") {
				setSelectedCategory(categoryQuery);
			}
		} catch (error) {
			console.error(t("products.error_display"), error);
		} finally {
			setLoading(false);
		}
	}, [categoryQuery, t]);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	useEffect(() => {
		searchInputRef.current?.focus();
	}, []);

	const handleCategoryChange = useCallback(
		(category: string) => {
			setSelectedCategory(category);
			if (category === "all") {
				navigate("/products");
			} else {
				navigate(`/products?category=${encodeURIComponent(category)}`);
			}
		},
		[navigate],
	);

	const handleFilterChange = useCallback((newFilters: Filters) => {
		setFilters(newFilters);
	}, []);

	const handleSearchChange = useCallback((term: string) => {
		setSearchTerm(term);
	}, []);

	const handleViewProduct = useCallback(
		(productId: string) => {
			navigate(`/products/${productId}`);
		},
		[navigate],
	);

	const filteredProducts = useMemo(() => {
		let result = products;

		if (selectedCategory !== "all") {
			result = result.filter((product) => product.category?.includes(selectedCategory));
		}

		if (searchTerm) {
			const q = searchTerm.toLowerCase();
			result = result.filter((product) => {
				const name = (product.name ?? "").toLowerCase();
				const desc = (product.description ?? "").toLowerCase();
				return name.includes(q) || desc.includes(q);
			});
		}

		result = result.filter((product) => {
			const price = product.price ?? 0;
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

	if (loading) return <Loader text={t("products.loading_products")} />;

	return (
		<section className="min-h-dvh font-title px-6 py-12 bg-gray-50">
			<ProductFilters
				ref={searchInputRef}
				categories={categories}
				selectedCategory={selectedCategory}
				setSelectedCategory={handleCategoryChange}
				onFilterChange={handleFilterChange}
				onSearchChange={handleSearchChange}
			/>

			<div className="mt-10">
				<ErrorBoundary
					fallback={
						<PageError title={t("products.error_display")} message={t("products.error_display_message")} />
					}
				>
					{filteredProducts.length === 0 && (
						<PageError
							title={t("products.error_filters")}
							message={t("products.error_filters_message")}
							icon="🔍"
							fullPage={false}
							retryText={t("products.clear_filters")}
							onRetry={() => {
								setSearchTerm("");
								setSelectedCategory("all");
								setFilters({ minPrice: 0, maxPrice: Infinity, sort: "" });
							}}
						/>
					)}

					{filteredProducts.length > 0 && (
						<ProductGrid products={filteredProducts} onView={handleViewProduct} />
					)}
				</ErrorBoundary>
			</div>
		</section>
	);
});

export default Products;
