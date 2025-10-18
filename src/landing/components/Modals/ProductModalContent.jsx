import { AddToCartButton } from "../Buttons/AddToCartButton";
import { LikeButton } from "../Buttons/LikeButton";
import { ReviewsList } from "../Reviews/ReviewList";
import { ReviewForm } from "../Reviews/ReviewForm";

export const ProductModalContent = ({ product }) => {
	return (
		<div
			className="
				flex flex-col md:flex-row w-full gap-6 
				max-h-[90vh] overflow-y-auto 
				scroll-smooth scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent
				pb-6
			"
		>
			<img
				src={Array.isArray(product.images) ? product.images[0] : product.images}
				alt={product.name}
				className="w-full md:w-1/2 h-64 md:h-80 object-cover rounded-2xl shadow-md"
			/>

			<div className="flex flex-col justify-between md:w-1/2">
				<div>
					<h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">{product.name}</h2>
					<p className="text-gray-700 font-landing mb-4">{product.longDescription}</p>
					<p className="font-landing font-semibold text-primary mb-4">Precio: {product.price} €</p>
					<p className="font-landing text-primary mb-4">SKU: {product.sku}</p>

					<div className="flex flex-wrap gap-2 mb-4">
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

				<div className="flex flex-row justify-between items-center gap-4 mt-4 sticky bottom-0 bg-bg-muted w-full py-2 z-10">
					<AddToCartButton product={product} />
					<LikeButton />
				</div>

				<div className="mt-8 border-t pt-6">
					<ReviewsList productId={product._id || product.id} />
					<ReviewForm productId={product._id || product.id} />
				</div>
			</div>
		</div>
	);
};
