import { useState } from "react";
import { ReviewStars } from "./ReviewStars";
import { api } from "../../../core/http/axios";
import { getTokenFromLocalStorage } from "../../../core/auth/auth.service"; // asegúrate de tenerlo

export const ReviewForm = ({ productId, onNewReview }) => {
	const [name, setName] = useState("");
	const [comment, setComment] = useState("");
	const [rating, setRating] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(event) {
		event.preventDefault();
		setError("");

		if (!name || !comment || rating === 0) {
			setError("Por favor completa todos los campos y selecciona una valoración.");
			return;
		}

		const token = getTokenFromLocalStorage();
		if (!token) {
			setError("Debes iniciar sesión para dejar una reseña.");
			return;
		}

		try {
			setLoading(true);

			const response = await api.post(
				`/products/${productId}/reviews`,
				{ name, comment, rating },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.data) {
				onNewReview(response.data);
				setName("");
				setComment("");
				setRating(0);
			}
		} catch (error) {
			console.error(error)
			setError("Error al enviar la reseña. Inténtalo más tarde.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 mt-6 w-full"
		>
			<h3 className="font-semibold text-lg text-primary mb-3">Deja tu reseña</h3>

			{error && <p className="text-error text-sm mb-3">{error}</p>}

			<input
				type="text"
				value={name}
				onChange={(event) => setName(event.target.value)}
				placeholder="Tu nombre"
				className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm focus:ring-2 focus:ring-primary"
			/>

			<ReviewStars rating={rating} setRating={setRating} />

			<textarea
				value={comment}
				onChange={(event) => setComment(event.target.value)}
				placeholder="Escribe tu comentario..."
				rows="3"
				className="w-full border border-gray-300 rounded-md px-3 py-2 mt-3 text-sm focus:ring-2 focus:ring-primary resize-none"
			/>

			<button
				type="submit"
				disabled={loading}
				className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary-light transition-all"
			>
				{loading ? "Enviando..." : "Enviar reseña"}
			</button>
		</form>
	);
};
