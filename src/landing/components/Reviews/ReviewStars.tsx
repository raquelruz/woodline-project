import { memo, useCallback } from "react";
import { FaStar } from "react-icons/fa";

export const ReviewStars = memo(({ rating = 0, setRating }) => {
	const stars = [1, 2, 3, 4, 5];

	const handleClick = useCallback(
		(star) => {
			if (setRating) setRating(star);
		},
		[setRating]
	);

	console.log("Render ReviewStars");

	return (
		<div className="flex gap-1">
			{stars.map((star) => (
				<FaStar
					key={star}
					onClick={setRating ? () => handleClick(star) : undefined}
					className={`cursor-pointer text-xl transition-colors ${
						rating >= star ? "text-yellow-400" : "text-gray-300"
					}`}
				/>
			))}
		</div>
	);
});
