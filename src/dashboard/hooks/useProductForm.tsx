import { useEffect, useMemo, useState } from "react";
import { api } from "../../core/http/axios";
import toast from "react-hot-toast";
import type { ProductFormState, ProductUpsertPayload, ProductWithBackendId } from "../../core/products/products.types";

type useProductFormReturn = {
	form: ProductFormState;
	preview: string | null;
	loading: boolean;
	showForm: boolean;
	setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
	handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
	resetForm: () => void;
};

export const useProductForm = (
	selectedProduct: ProductWithBackendId | null,
	onSaved?: () => void,
): useProductFormReturn => {
	const initialForm: ProductFormState = useMemo(
		() => ({
			_id: "",
			name: "",
			price: "",
			sku: "",
			description: "",
			longDescription: "",
			category: "",
			images: "",
		}),
		[],
	);

	const [form, setForm] = useState<ProductFormState>(initialForm);
	const [preview, setPreview] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [showForm, setShowForm] = useState<boolean>(false);

	useEffect(() => {
		const id = selectedProduct?._id ?? selectedProduct?.id;

		if (selectedProduct && id) {
			setShowForm(true);

			setForm({
				_id: selectedProduct._id || selectedProduct.id || "",
				name: selectedProduct.name || "",
				price: String(selectedProduct.price ?? ""),
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
				Array.isArray(selectedProduct.images) ? selectedProduct.images[0] : selectedProduct.images || null,
			);
		} else {
			resetForm();
		}
	}, [selectedProduct, initialForm]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const resetForm = () => {
		setForm(initialForm);
		setPreview(null);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
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

			const payload: ProductUpsertPayload = {
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

			const toastId = toast.loading(productId ? "Actualizando producto..." : "Creando producto...");

			if (productId) {
				await api.patch(`/products/${productId}`, payload);
				toast.success("Producto actualizado correctamente", { id: toastId });
			} else {
				await api.post("/products", payload);
				toast.success("Producto creado correctamente", { id: toastId });
			}

			onSaved?.();
			setShowForm(false);
			resetForm();
		} catch (error) {
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
