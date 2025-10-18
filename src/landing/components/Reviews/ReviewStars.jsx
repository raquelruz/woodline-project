import { FaStar } from "react-icons/fa";

export const ReviewStars = ({ rating = 0, setRating }) => {
	const stars = [1, 2, 3, 4, 5];

	return (
		<div className="flex gap-1">
			{stars.map((star) => (
				<FaStar
					key={star}
					onClick={() => setRating && setRating(star)}
					className={`cursor-pointer text-xl transition-colors ${
						rating >= star ? "text-yellow-400" : "text-gray-300"
					}`}
				/>
			))}
		</div>
	);
};
