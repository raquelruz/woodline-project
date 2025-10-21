import { useEffect, useState } from "react";
import { api } from "../../../core/http/axios";
import { ReviewStars } from "./ReviewStars";

export const ReviewsList = ({ productId }) => {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchReviews() {
			try {
				const response = await api.get(`/products/${productId}/reviews`);

				setReviews(response.data || []);
			} catch (error) {
				// console.error("Error al cargar reseñas:", error);
				alert("Error al cargar reseñas");
			} finally {
				setLoading(false);
			}
		}
		fetchReviews();
	}, [productId]);

	if (loading) return <p className="text-gray-500">Cargando reseñas...</p>;

	if (reviews.length === 0) return <p className="text-gray-500 italic">Aún no hay reseñas para este producto.</p>;

	return (
		<div className="flex flex-col gap-4 mt-6">
			<h3 className="text-lg font-semibold text-primary">Opiniones de clientes</h3>

			{reviews.map((review, index) => (
				<div key={index} className="border border-gray-200 rounded-lg p-4 shadow-sm">
					<div className="flex items-center justify-between mb-2">
						<p className="font-semibold text-primary">
							{review.userId?.displayName || review.userId?.name || review.userId?.username || "Anónimo"}
						</p>
						<ReviewStars rating={review.rating} />
					</div>
					<p className="text-gray-600 text-sm">{review.comment}</p>
				</div>
			))}
		</div>
	);
};
