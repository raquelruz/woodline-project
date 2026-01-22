import { memo, useCallback, useMemo } from "react";
import { ProductCard } from "./ProductsCard";
import { useTranslate } from "../../../translations/useTranslate";
import type { ProductWithBackendId } from "../../../core/products/products.types";

type ProductGridProps = {
	products: ProductWithBackendId[];
	onView: (id: string) => void;
	searchQuery?: string;
}

export const ProductGrid = memo(({ products, onView, searchQuery }: ProductGridProps) => {
	const { t } = useTranslate();
	if (products.length === 0) {
		return (
			<p className="col-span-full text-center text-gray-500">
				{t("common.no_results")} {searchQuery && `para "${searchQuery}"`}
			</p>
		);
	}

	const handleView = useCallback(
		(id: string) => {
			onView(id);
		},
		[onView]
	);

	const memoizedProducts = useMemo(() => {
		return products.map((p, index) => (
			<ProductCard
				key={p._id || p.id || `${p.sku}-${index}`}
				product={p}
				onView={() => handleView(p._id || p.id)}
			/>
		));
	});

	return <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{memoizedProducts}</div>;
});
