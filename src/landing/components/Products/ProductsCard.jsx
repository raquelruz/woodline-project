import { memo, useMemo, useCallback } from "react";

export const ProductsCard = memo(({ product, onView }) => {
	const { name, description, price, images, category } = product;

	const mainImage = useMemo(() => {
		if (Array.isArray(images)) return images[0] || "/fallback.jpg";
		return images || "/fallback.jpg";
	}, [images]);

	const productCategories = useMemo(() => {
		if (!Array.isArray(category) || category.length === 0) return [];

		return category.map((ctgr) => (
			<span
				key={ctgr.toLowerCase()}
				className="px-2 py-1 text-xs rounded-full bg-primary-light/20 text-primary font-medium"
			>
				{ctgr}
			</span>
		));
	}, [category]);

	const handleView = useCallback(() => {
		onView(product);
	}, [onView, product]);

	console.log("Render ProductsCard");

	return (
		<div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col">
			<img
				src={mainImage}
				alt={name}
				className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
			/>

			<div className="p-6 flex flex-col justify-between flex-1">
				<div>
					<h2 className="text-xl font-bold text-primary mb-2">{name}</h2>
					<p className="text-gray-600 font-landing mb-4">{description}</p>

					<div className="flex flex-wrap gap-2 mt-2">{productCategories}</div>
				</div>

				<div className="flex justify-between items-center mt-4">
					<span className="text-xl font-landing font-bold text-primary">{price} €</span>

					<button
						onClick={handleView}
						className="px-4 py-2 font-landing font-medium text-white bg-primary rounded-lg hover:bg-primary-light transition-colors"
					>
						Ver más
					</button>
				</div>
			</div>
		</div>
	);
});
