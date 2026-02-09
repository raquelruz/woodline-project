import { MdAdd, MdClose } from "react-icons/md";
import { useProductForm } from "../hooks/useProductForm";
import { useTranslate } from "../../translations/useTranslate";
import type { Product } from "../../core/products/products.types";

type ProductFormProps = {
    selectedProduct: Product | null;
    onSaved: (product: Product) => void;
};

export const ProductForm = ({ selectedProduct, onSaved }: ProductFormProps) => {
	const { t } = useTranslate();
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
					{t("pages.dashboard.create_product")}
				</button>
			)}

			{/* Formulario de producto */}
			{showForm && (
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
					<div className="flex items-center justify-between mb-2">
						<h3 className="font-title font-semibold text-primary">
							{selectedProduct ? t("products.edit_product") : t("products.new_product")}
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
							placeholder={t("products.product_name")}
							className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary"
							required
						/>

						<input
							type="number"
							name="price"
							value={form.price}
							onChange={handleChange}
							placeholder={t("products.price_label")}
							className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary"
							required
						/>

						<input
							type="text"
							name="sku"
							value={form.sku}
							onChange={handleChange}
							placeholder={t("products.sku")}
							className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary"
						/>
					</div>

					<textarea
						name="description"
						value={form.description}
						onChange={handleChange}
						placeholder={t("products.product_short_description")}
						rows={3}
						className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary resize-none"
						required
					/>

					<textarea
						name="longDescription"
						value={form.longDescription}
						onChange={handleChange}
						placeholder={t("products.product_long_description")}
						rows={4}
						className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary resize-none"
					/>

					<input
						type="text"
						name="category"
						value={form.category}
						onChange={handleChange}
						placeholder={t("products.categories_info")}
						className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary"
					/>

					<input
						type="text"
						name="images"
						value={form.images || ""}
						onChange={handleChange}
						placeholder={t("products.image_urls")}
						className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary"
					/>

					<button
						type="submit"
						disabled={loading}
						className="bg-primary text-white py-2 rounded-md hover:bg-primary-light transition"
					>
						{loading
							? t("common.saving")
							: selectedProduct
							? t("common.save")
							: t("products.add_product")}
					</button>
				</form>
			)}
		</div>
	);
};
