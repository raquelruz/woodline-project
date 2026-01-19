import { useEffect, useState } from "react";
import { api } from "../../core/http/axios";
import toast from "react-hot-toast";

export const useProductForm = (selectedProduct, onSaved) => {
	const initialForm = {
		_id: "",
		name: "",
		price: "",
		sku: "",
		description: "",
		longDescription: "",
		category: "",
		images: "",
	};

	const [form, setForm] = useState(initialForm);
	const [preview, setPreview] = useState(null);
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		if (selectedProduct && (selectedProduct._id || selectedProduct.id)) {
			setShowForm(true);
			setForm({
				_id: selectedProduct._id || selectedProduct.id || "",
				name: selectedProduct.name || "",
				price: selectedProduct.price || "",
				sku: selectedProduct.sku || "",
				description: selectedProduct.description || "",
				longDescription: selectedProduct.longDescription || "",
				category: Array.isArray(selectedProduct.category)
					? selectedProduct.category.join(", ")
					: selectedProduct.category || "",
				images: Array.isArray(selectedProduct.images)
					? selectedProduct.images.join(", ")
					: selectedProduct.images || "",
			});
			setPreview(
				Array.isArray(selectedProduct.images)
					? selectedProduct.images[0]
					: selectedProduct.images || null
			);
		} else {
			resetForm();
		}
	}, [selectedProduct]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const resetForm = () => {
		setForm(initialForm);
		setPreview(null);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		try {
			const categoryArray = form.category
				.split(",")
				.map((category) => category.trim())
				.filter(Boolean);

			const imageArray = form.images
				?.split(",")
				.map((url) => url.trim())
				.filter(Boolean);

			const payload = {
				sku: form.sku.trim(),
				name: form.name.trim(),
				description: form.description.trim(),
				longDescription: form.longDescription.trim(),
				price: Number(form.price),
				releaseDate: new Date().toISOString(),
				category: categoryArray,
				images: imageArray,
			};

			const productId = form._id || selectedProduct?._id || selectedProduct?.id;

			toast.loading(productId ? "Actualizando producto..." : "Creando producto...");

			if (productId) {
				await api.patch(`/products/${productId}`, payload);
				toast.dismiss();
				toast.success("Producto actualizado correctamente");
			} else {
				await api.post("/products", payload);
				toast.dismiss();
				toast.success("Producto creado correctamente");
			}

			onSaved?.();
			setShowForm(false);
			resetForm();
		} catch (error) {
			// console.error("Error al guardar producto:", error);
			toast.dismiss();
			toast.error("Error al guardar el producto. Inténtalo más tarde.");
		} finally {
			setLoading(false);
		}
	};

	return {
		form,
		preview,
		loading,
		showForm,
		setShowForm,
		handleChange,
		handleSubmit,
		resetForm,
	};
};
