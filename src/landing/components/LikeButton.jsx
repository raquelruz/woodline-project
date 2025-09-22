import { useState } from "react";

export const LikeButton = () => {
	const [liked, setLiked] = useState(false);

	const toggleLike = () => {
		setLiked(!liked);
	};

	return (
		<button
			onClick={toggleLike}
			className={`mt-2 px-8 py-3 font-medium rounded-xl self-start transition-colors ${
				liked
					? "bg-primary-hover text-white hover:bg-primary-hover"
					: "bg-primary-pressed text-white hover:bg-primary-hover"
			}`}
		>
			{liked ? "❤️" : "🤍"}
		</button>
	);
};
