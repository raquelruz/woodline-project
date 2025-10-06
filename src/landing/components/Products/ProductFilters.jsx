export const ProductFilters = ({ categories, selectedCategory, setSelectedCategory }) => {
	return (
		<div className="flex flex-wrap gap-4 justify-center mb-12">
			<button
				onClick={() => setSelectedCategory("all")}
				className={`px-4 py-2 rounded-full font-medium transition ${
					selectedCategory === "all" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
				}`}
			>
				Todas
			</button>

			{categories.map((cat) => (
				<button
					key={cat}
					onClick={() => setSelectedCategory(cat)}
					className={`px-4 py-2 rounded-full font-medium transition ${
						selectedCategory === cat
							? "bg-primary text-white"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					}`}
				>
					{cat}
				</button>
			))}
		</div>
	);
};
