export const ProductCard = ({ product, onView }) => {
	return (
		<div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col">
			<img
				src={Array.isArray(product.images) ? product.images[0] : product.images}
				alt={product.name}
				className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
			/>

			<div className="p-6 flex flex-col justify-between flex-1">
				<div>
					<h2 className="text-xl font-bold text-primary mb-2">{product.name}</h2>
					<p className="text-gray-600 font-landing mb-4">{product.description}</p>

					<div className="flex flex-wrap gap-2 mt-2">
						{product.category?.map((cat, i) => (
							<span
								key={i}
								className="px-2 py-1 text-xs rounded-full bg-primary-light/20 text-primary font-medium"
							>
								{cat}
							</span>
						))}
					</div>
				</div>

				<div className="flex justify-between items-center mt-4">
					<span className="text-xl font-landing font-bold text-primary">{product.price} €</span>
					<button
						onClick={() => onView(product)}
						className="px-4 py-2 font-landing font-medium text-white bg-primary rounded-lg hover:bg-primary-light transition-colors"
					>
						Ver más
					</button>
				</div>
			</div>
		</div>
	);
};
