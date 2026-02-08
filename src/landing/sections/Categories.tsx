import { useNavigate } from "react-router-dom";
import { useCategories } from "../../core/categories/useCategories";
import { Loader } from "../components/Loader";
import { memo, useCallback, useMemo } from "react";
import { useTranslate } from "../../translations/useTranslate";
import type { Category } from "../../core/categories/categories.types";

export const Categories = memo(() => {
	const { t } = useTranslate();
	const { categories, loading } = useCategories() as {
		categories: Category[];
		loading: boolean;
	};
	const navigate = useNavigate();

	const handleCategoryClick = useCallback(
		(slug: string) => {
			navigate(`/products?category=${encodeURIComponent(slug)}`);
		},
		[navigate],
	);

	const memoizedCategories = useMemo(() => {
		return categories.map((category, index) => (
			<div
				key={index}
				onClick={() => handleCategoryClick(category.slug)}
				className="flex flex-col items-center cursor-pointer group"
			>
				<div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-white hover:border-primary transition-all duration-500">
					<img
						src={category.image}
						alt={category.name}
						className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
					/>
					<div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
				</div>

				<h5 className="mt-4 font-title font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
					{category.name}
				</h5>
			</div>
		));
	}, [categories, handleCategoryClick]);

	if (loading) {
		return <Loader text={t("products.loading_categories")} />;
	}

	return (
		<section className="py-12 bg-bg-light text-center">
			<div className="mb-16">
				<h2 className="text-4xl font-title font-extrabold text-gray-800">
					{t("pages.home.categories_title")}{" "}
					<span className="text-primary">{t("pages.home.categories_span")}</span>
				</h2>
				<p className="text-gray-500 mt-3">{t("pages.home.categories_description")}</p>
			</div>

			<div className="flex flex-wrap justify-center gap-10 px-4">{memoizedCategories}</div>
		</section>
	);
});
