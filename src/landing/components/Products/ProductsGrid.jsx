import { ProductCard } from "./ProductsCard";

export const ProductGrid = ({ products, onView, searchQuery }) => {
	if (products.length === 0) {
		return (
			<p className="col-span-full text-center text-gray-500">
				No se encontraron productos {searchQuery && `para "${searchQuery}"`}
			</p>
		);
	}

	return (
		<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{products.map((p, index) => (
				<ProductCard key={p._id || p.id || `${p.sku}-${index}`} product={p} onView={onView} />
			))}
		</div>
	);
};
