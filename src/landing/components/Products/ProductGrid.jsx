import { memo, useCallback, useMemo } from "react";
import { ProductCard } from "./ProductsCard";

export const ProductGrid = memo(({ products, onView, searchQuery }) => {
	if (products.length === 0) {
		return (
			<p className="col-span-full text-center text-gray-500">
				No se encontraron productos {searchQuery && `para "${searchQuery}"`}
			</p>
		);
	}

	const handleView = useCallback(
		(id) => {
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

	// console.log("Render ProductsGrid");

	return <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{memoizedProducts}</div>;
});
