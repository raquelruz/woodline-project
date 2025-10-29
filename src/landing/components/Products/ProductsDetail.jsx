import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../core/http/axios";
import { Loader } from "../Loader";
import { AddToCartButton } from "../Buttons/AddToCartButton";

export const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await api.get(`/products/${id}`);
				setProduct(response.data);
			} catch (error) {
				// console.error("Error al cargar el producto:", error);
				throw error;
			} finally {
				setLoading(false);
			}
		};
		fetchProduct();
	}, [id]);

	if (loading) {
		return (
			<div className="flex justify-center items-center py-20 text-gray-500">
				<Loader text="Cargando producto..." />
			</div>
		);
	}

	if (!product) {
		return <div className="flex justify-center items-center py-20 text-error">Producto no encontrado.</div>;
	}

	return (
		<section className="relative min-h-screen px-4 py-2">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 ">
				<div className="relative flex justify-center">
					<div className="absolute -inset-4 bg-primary/10 blur-lg rounded-full"></div>
					<img
						src={product.images?.[0] || "/placeholder.jpg"}
						alt={product.name}
						className="relative z-10 rounded-2xl shadow-2xl max-h-[700px] w-full object-cover hover:scale-[1.02] transition-transform duration-500"
					/>
				</div>

				<div className="bg-white shadow-xl rounded-2xl p-8 md:p- border border-gray-100">
					<h2 className="font-title font-bold text-primary mb-4">{product.name}</h2>

					<p className="text-gray-600 mb-2 leading-relaxed text-md">{product.longDescription}</p>

					<div className="flex items-center justify-between mb-6">
						<div className="flex items-end justify-between mb-8">
							<div>
								<p className="text-sm text-gray-400 mb-1">Precio</p>
								<p className="text-2xl md:text-4xl font-title font-extrabold text-primary">
									{product.price.toFixed(2)} €
								</p>
							</div>
						</div>

						<span className="text-sm text-gray-400">
							Categoría:{" "}
							<span className="font-medium text-gray-700">
								{product.category?.join(", ") || "General"}
							</span>
						</span>
					</div>

					<AddToCartButton product={product} />

					<div className="mt-8 text-sm text-gray-500 space-y-2">
						<p>✅ Envío gratuito en pedidos superiores a 50 €</p>
						<p>🔒 Pago 100 % seguro y protegido</p>
						<p>💬 Soporte personalizado 24/7</p>
					</div>
				</div>
			</div>
		</section>
	);
};
