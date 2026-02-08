import React, { useState } from "react";
import { ReviewStars } from "./ReviewStars";
import { api } from "../../../core/http/axios";
import { getTokenFromLocalStorage } from "../../../core/auth/auth.service";
import type { Review, ReviewCreatePayload } from "../../../core/types/reviews.types";

type ReviewFormProps = {
	productId: string;
	onNewReview: (review: Review) => void;
};

export const ReviewForm = ({ productId, onNewReview }: ReviewFormProps) => {
	const [name, setName] = useState<string>("");
	const [comment, setComment] = useState<string>("");
	const [rating, setRating] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);

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

			const payload: ReviewCreatePayload = { name, comment, rating };

			const response = await api.post<Review>(`/products/${productId}/reviews`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const createdReview = response.data;
			if (createdReview) {
				onNewReview(createdReview);
				setName("");
				setComment("");
				setRating(0);
			}
		} catch (error) {
			// console.error(error)
			setError("Error al enviar la reseña. Inténtalo más tarde.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 mt-6 w-full">
			<h3 className="font-semibold text-lg text-primary mb-3">Deja tu reseña</h3>

			{error && <p className="text-error text-sm mb-3">{error}</p>}

			<input
				type="text"
				value={name}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
				placeholder="Tu nombre"
				className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm focus:ring-2 focus:ring-primary"
			/>

			<ReviewStars rating={rating} setRating={setRating} />

			<textarea
				value={comment}
				onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value)}
				placeholder="Escribe tu comentario..."
				rows={3}
				className="w-full border border-gray-300 rounded-md px-3 py-2 mt-3 text-sm focus:ring-2 focus:ring-primary resize-none"
			/>

			<button
				type="submit"
				disabled={loading}
				className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary-light transition-all disabled:opacity-60 disabled:cursor-not-allowed"
			>
				{loading ? "Enviando..." : "Enviar reseña"}
			</button>
		</form>
	);
};
