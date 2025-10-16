import { useEffect, useState } from "react";
import { api } from "../../core/http/axios";

export const useProductForm = (selectedProduct, onSaved) => {
	const initialForm = {
		name: "",
		price: "",
		sku: "",
		description: "",
		longDescription: "",
		category: "",
	};

	const [form, setForm] = useState(initialForm);
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		if (selectedProduct) {
			setShowForm(true);
			setForm({
				name: selectedProduct.name || "",
				price: selectedProduct.price || "",
				sku: selectedProduct.sku || "",
				description: selectedProduct.description || "",
				longDescription: selectedProduct.longDescription || "",
				category: selectedProduct.category?.join(", ") || "",
			});
			setPreview(selectedProduct.images?.[0] || null);
		} else {
			resetForm();
		}
	}, [selectedProduct]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setImage(file);
			setPreview(URL.createObjectURL(file));
		}
	};

	const resetForm = () => {
		setForm(initialForm);
		setImage(null);
		setPreview(null);
	};

	const handleSubmit = async (event) => {
	event.preventDefault();
	setLoading(true);

	try {
		const categoryArray = form.category
			.split(",")
			.map((c) => c.trim())
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

		console.log("Enviando producto a la API (JSON)");
		console.log(JSON.stringify(payload, null, 2));
		console.groupEnd();

		if (selectedProduct?._id) {
			await api.put(`/products/${selectedProduct._id}`, payload);
			console.log("Producto actualizado correctamente");
		} else {
			await api.post("/products", payload);
			console.log("Producto creado correctamente");
		}

		onSaved();
		setShowForm(false);
		resetForm();
	} catch (error) {
		console.error("Error al guardar el producto:", error.response?.data || error);
		alert("Error al guardar el producto.");
	} finally {
		setLoading(false);
	}
};

	return {
		form,
		image,
		preview,
		loading,
		showForm,
		setShowForm,
		handleChange,
		handleImageChange,
		handleSubmit,
		resetForm,
	};
};
