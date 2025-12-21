import { useParams } from "react-router-dom";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../../../core/http/axios";
import { Loader } from "../Loader";
import { AddToCartButton } from "../Buttons/AddToCartButton";
import { FavButton } from "../Buttons/FavButton";
import { useTranslate } from "../../../translations/useTranslate";

const ProductDetail = memo(() => {
	const { t } = useTranslate();
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchProduct = useCallback(async () => {
		try {
			const response = await api.get(`/products/${id}`);
			const product = response.data;

			product.id = product.id || product._id;

			setProduct(product);
		} catch (error) {
			console.error(t("products.error_loading_product"), error);
			setProduct(null);
		} finally {
			setLoading(false);
		}
	}, [id]);

	useEffect(() => {
		fetchProduct();
	}, [fetchProduct]);

	useEffect(() => {
		if (!product) return;

		try {
			const viewedRaw = localStorage.getItem("viewed");
			const viewed = viewedRaw ? JSON.parse(viewedRaw) : [];

			const exists = viewed.some((p) => (p.id || p._id) === product.id);

			if (!exists) {
				const updated = [
					{
						id: product.id,
						name: product.name,
						image: product.images?.[0] || "/placeholder.jpg",
						price: product.price,
					},
					...viewed,
				];

				const limited = updated.slice(0, 8);

				localStorage.setItem("viewed", JSON.stringify(limited));
			}
		} catch (error) {
			console.error(t("products.error_viewing_history"), error);
		}
	}, [product]);

	const categoryLabel = useMemo(() => {
		return product?.category?.join(", ") || "General";
	}, [product?.category]);

	const formattedPrice = useMemo(() => {
		return product ? product.price.toFixed(2) : "";
	}, [product]);

	if (loading) {
		return (
			<div className="flex justify-center items-center py-20 text-gray-500">
				<Loader text={t("products.loading_product")}/>
			</div>
		);
	}

	if (!product) {
		return <div className="flex justify-center items-center py-20 text-error">{t("common.no_results")}</div>;
	}

	return (
		<section className="relative min-h-screen px-4 py-2">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="relative flex justify-center">
					<div className="absolute -inset-4 bg-primary/10 blur-lg rounded-full"></div>
					<img
						src={product.images?.[0] || "/placeholder.jpg"}
						alt={product.name}
						className="relative z-10 rounded-2xl shadow-2xl max-h-[700px] w-full object-cover hover:scale-[1.02] transition-transform duration-500"
					/>
				</div>

				<div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
					<h2 className="font-title font-bold text-primary mb-4">{product.name}</h2>

					<p className="text-gray-600 mb-2 leading-relaxed text-md">{product.longDescription}</p>

					<div className="flex items-center justify-between mb-6">
						<div>
							<p className="text-sm text-gray-400 mb-1">{t("products.price_label")}</p>
							<p className="text-2xl md:text-4xl font-title font-extrabold text-primary">
								{formattedPrice} {t("common.currency")}
							</p>
						</div>

						<span className="text-sm text-gray-400">
							{t("common.categories")} <span className="font-medium text-gray-700">{categoryLabel}</span>
						</span>
					</div>

					<div className="flex flex-row gap-6">
						<AddToCartButton product={product} />
						<FavButton product={product} size={28} />
					</div>

					<div className="mt-8 text-sm text-gray-500 space-y-2">
						<p>{t("products.free_shipping")}</p>
						<p>{t("products.secure_payment")}</p>
						<p>{t("products.support")}</p>
					</div>
				</div>
			</div>
		</section>
	);
});

export default ProductDetail;