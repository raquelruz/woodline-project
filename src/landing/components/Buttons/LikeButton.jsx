import { useState } from "react";

export const LikeButton = ({ initialLikes = 0 }) => {
	const [liked, setLiked] = useState(false);
	const [likes, setLikes] = useState(initialLikes);

	const toggleLike = () => {
		if (liked) {
			setLikes((prev) => prev - 1);
		} else {
			setLikes((prev) => prev + 1);
		}
		setLiked(!liked);
	};

	return (
		<button
			onClick={toggleLike}
			className={`px-6 py-2 flex items-center gap-2 font-medium rounded-xl self-start transition-colors ${
				liked
					? "bg-primary-light text-white"
					: "bg-primary text-white"
			}`}
		>
			<span>{liked ? "❤️" : "🤍"}</span>
			<span>{likes}</span>
		</button>
	);
};
