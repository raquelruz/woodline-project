import { useEffect, useState } from "react";
import { api } from "../../core/http/axios";
import toast from "react-hot-toast";

export const useUserForm = (selectedUser, onSaved) => {
	const initialForm = {
		_id: "",
		name: "",
		email: "",
		role: "user",
		password: "",
	};

	const [form, setForm] = useState(initialForm);
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		if (selectedUser && (selectedUser._id || selectedUser.id)) {
			setShowForm(true);
			setForm({
				_id: selectedUser._id || selectedUser.id || "",
				name: selectedUser.name || "",
				email: selectedUser.email || "",
				role: selectedUser.role || "user",
				password: "",
			});
		} else {
			resetForm();
		}
	}, [selectedUser]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const resetForm = () => {
		setForm(initialForm);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		try {
			const payload = {
				name: form.name.trim(),
				email: form.email.trim(),
				role: form.role.trim(),
				...(form.password ? { password: form.password.trim() } : {}),
			};

			const userId = form._id || selectedUser?._id || selectedUser?.id;

			toast.loading(userId ? "Actualizando usuario..." : "Creando usuario...");

			if (userId) {
				await api.put(`/users/${userId}`, payload);
				toast.dismiss();
				toast.success("Usuario actualizado correctamente");
			} else {
				await api.post("/auth/register", payload);
				toast.dismiss();
				toast.success("Usuario creado correctamente");
			}

			onSaved?.();
			setShowForm(false);
			resetForm();
		} catch (error) {
			// console.error("Error al guardar el usuario:", error);
			toast.dismiss();
			toast.error("Error al guardar el usuario");
		} finally {
			setLoading(false);
		}
	};

	return {
		form,
		loading,
		showForm,
		setShowForm,
		handleChange,
		handleSubmit,
		resetForm,
	};
};
