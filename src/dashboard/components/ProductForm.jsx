import { MdAdd, MdClose } from "react-icons/md";
import { useProductForm } from "../hooks/useProductForm";

export const ProductForm = ({ selectedProduct, onSaved }) => {
	const {
		form,
		loading,
		showForm,
		setShowForm,
		handleChange,
		handleSubmit,
		resetForm,
	} = useProductForm(selectedProduct, onSaved);

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			{!showForm && (
				<button
					onClick={() => setShowForm(true)}
					className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light transition"
				>
					<MdAdd size={20} />
					Crear producto nuevo
				</button>
			)}

			{/* Formulario de producto */}
			{showForm && (
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
					<div className="flex items-center justify-between mb-2">
						<h3 className="font-title font-semibold text-primary">
							{selectedProduct ? "Editar producto" : "Nuevo producto"}
						</h3>
						<MdClose
							size={22}
							className="text-gray-400 hover:text-primary cursor-pointer transition"
							onClick={() => {
								setShowForm(false);
								resetForm();
							}}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<input
							type="text"
							name="name"
							value={form.name}
							onChange={handleChange}
							placeholder="Nombre del producto"
							className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary"
							required
						/>

						<input
							type="number"
							name="price"
							value={form.price}
							onChange={handleChange}
							placeholder="Precio (€)"
							className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary"
							required
						/>

						<input
							type="text"
							name="sku"
							value={form.sku}
							onChange={handleChange}
							placeholder="SKU (Referencia interna)"
							className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary"
						/>
					</div>

					<textarea
						name="description"
						value={form.description}
						onChange={handleChange}
						placeholder="Descripción corta del producto"
						rows="3"
						className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary resize-none"
						required
					/>

					<textarea
						name="longDescription"
						value={form.longDescription}
						onChange={handleChange}
						placeholder="Descripción larga del producto"
						rows="4"
						className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary resize-none"
					/>

					<input
						type="text"
						name="category"
						value={form.category}
						onChange={handleChange}
						placeholder="Categorías (separadas por comas)"
						className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary"
					/>

					<input
						type="text"
						name="images"
						value={form.images || ""}
						onChange={handleChange}
						placeholder="URLs de imágenes (separadas por comas)"
						className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary"
					/>

					<button
						type="submit"
						disabled={loading}
						className="bg-primary text-white py-2 rounded-md hover:bg-primary-light transition"
					>
						{loading
							? "Guardando..."
							: selectedProduct
							? "Guardar cambios"
							: "Añadir producto"}
					</button>
				</form>
			)}
		</div>
	);
};
