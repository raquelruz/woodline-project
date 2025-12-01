import { memo } from "react";
import { ProductsCard } from "./ProductsCard";

export const ProductsGrid = memo(({ products, onView }) => {
	// console.log("Render ProductsGrid")
	
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
			{products.map((product) => (
				<ProductsCard
					key={product._id || product.id}
					product={product}
					onView={onView}
				/>
			))}
		</div>
	);
});
