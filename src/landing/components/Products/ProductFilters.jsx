import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

export const ProductFilters = ({
	categories,
	selectedCategory,
	setSelectedCategory,
	onFilterChange,
	onSearchChange,
}) => {
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const [sortOrder, setSortOrder] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	function handleApplyFilters() {
		onFilterChange({
			minPrice: Number(minPrice) || 0,
			maxPrice: Number(maxPrice) || Infinity,
			sort: sortOrder,
		});
		onSearchChange(searchTerm);
	}

	return (
		<div className="w-full max-w-6xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-5 mb-10">
			<div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
				{/* Buscador */}
				<div className="flex items-center w-full md:w-1/3 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-primary">
					<FaSearch className="text-primary text-sm mr-3" />
					<input
						type="text"
						placeholder="Buscar productos..."
						value={searchTerm}
						onChange={(event) => setSearchTerm(event.target.value)}
						className="w-full bg-transparent outline-none text-sm text-gray-700"
					/>
				</div>

				{/* Orden y precio */}
				<div className="flex flex-wrap justify-center md:justify-end items-center gap-3">
					<select
						value={sortOrder}
						onChange={(event) => setSortOrder(event.target.value)}
						className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 focus:ring-2 focus:ring-primary"
					>
						<option value="">Ordenar</option>
						<option value="priceAsc">Precio: menor a mayor</option>
						<option value="priceDesc">Precio: mayor a menor</option>
					</select>

					<div className="flex items-center gap-2 text-sm">
						<label className="text-gray-600">Desde:</label>
						<input
							type="number"
							value={minPrice}
							onChange={(event) => setMinPrice(event.target.value)}
							className="w-20 border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-primary"
						/>
						<label className="text-gray-600">Hasta:</label>
						<input
							type="number"
							value={maxPrice}
							onChange={(event) => setMaxPrice(event.target.value)}
							className="w-20 border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-primary"
						/>
					</div>

					<button
						onClick={handleApplyFilters}
						className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-primary-light transition-all"
					>
						<FaFilter />
						Aplicar
					</button>
				</div>
			</div>

			{/* Categorías */}
			<div className="flex flex-wrap justify-center gap-2">
				{["all", ...categories].map((category) => (
					<button
						key={category}
						onClick={() => setSelectedCategory(category)}
						className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
							selectedCategory === category
								? "bg-primary text-white"
								: "bg-gray-100 hover:bg-gray-200 text-gray-700"
						}`}
					>
						{category === "all" ? "Todas" : category}
					</button>
				))}
			</div>
		</div>
	);
};
