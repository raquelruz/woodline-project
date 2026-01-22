import { memo, useCallback } from "react";
import { FaStar } from "react-icons/fa";

type ReviewStarsProps = {
	rating: number;
	setRating?: (value: number) => void;
}

export const ReviewStars = memo(({ rating = 0, setRating }: ReviewStarsProps) => {
	const stars = [1, 2, 3, 4, 5];

	const handleClick = useCallback(
		(star: number) => {
			if (setRating) setRating(star);
		},
		[setRating]
	);

	return (
		<div className="flex gap-1">
			{stars.map((star) => (
				<FaStar
					key={star}
					onClick={() => handleClick(star)}
					className={`cursor-pointer text-xl transition-colors ${
						rating >= star ? "text-yellow-400" : "text-gray-300"
					}`}
				/>
			))}
		</div>
	);
});
