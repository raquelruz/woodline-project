type ViewedProduct = {
	id: string;
	name: string;
	image: string;
	price: number;
	length: number;
};

type ViewedListProp = {
	products: ViewedProduct[];
}

export const ViewedList = ({ products }: ViewedListProp) => {
	if (!products || products.length === 0) return null;

	return (
		<section className="mt-14">
			<div className="overflow-x-auto pb-3">
				<div className="flex gap-6 min-w-max">
					{products.map((product) => (
						<a
							key={product.id}
							href={`/products/${product.id}`}
							className="group w-60 flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
						>
							<div className="h-40 w-full overflow-hidden rounded-t-xl">
								<img
									src={product.image}
									alt={product.name}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
								/>
							</div>

							<div className="p-4">
								<h6 className="font-title text-gray-800 line-clamp-2 group-hover:text-primary transition-colors">
									{product.name}
								</h6>

								<p className="text-primary font-semibold text-lg mt-2">{product.price} €</p>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
};
