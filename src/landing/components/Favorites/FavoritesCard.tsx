import { useTranslate } from "../../../translations/useTranslate";
import { FavButton } from "../Buttons/FavButton";
import type { Product } from "../../../core/products/products.types";

type FavoritesCardProps = {
	products: Product[];
}

export const FavoritesCard = ({ products }: FavoritesCardProps) => {
	const { t } = useTranslate();
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
			{products.map((product) => {
				const productId = product.id || product.sku;

				return (
					<div
						key={productId}
						className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
					>
						<div className="relative h-60 w-full">
							<img
								src={product.images?.[0] || "/placeholder.jpg"}
								alt={product.name}
								className="w-full h-full object-cover rounded-b-none rounded-t-3xl transition-all duration-300 group-hover:scale-[1.04]"
							/>

							<div className="absolute top-4 right-4 z-20">
								<FavButton product={product} size={26} />
							</div>
						</div>

						<div className="p-6 flex flex-col gap-3">
							<h3 className="text-xl font-semibold text-gray-900 leading-tight">{product.name}</h3>

							<p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>

							<p className="text-primary text-2xl font-bold mt-2">{product.price} {t("common.currency")}</p>

							<a
								href={`/products/${productId}`}
								className="mt-4 w-full text-center py-2.5 rounded-xl border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all duration-300"
							>
								{t("products.see_product")}
							</a>
						</div>
					</div>
				);
			})}
		</div>
	);
};
