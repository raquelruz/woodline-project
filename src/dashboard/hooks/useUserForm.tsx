import { useEffect, useMemo, useState } from "react";
import { api } from "../../core/http/axios";
import toast from "react-hot-toast";
import type { Role, UserBackend, UserFormState, UserUpsertPayload } from "../../core/auth/auth.type";

type UseUserFormReturn = {
	form: UserFormState & { _id?: string };
	loading: boolean;
	showForm: boolean;
	setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
	handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
	resetForm: () => void;
};

export const useUserForm = (selectedUser: UserBackend | null, onSaved?: () => void): UseUserFormReturn => {
	const initialForm = useMemo(
		() => ({
			_id: "",
			name: "",
			email: "",
			role: "user" as Role,
			password: "",
		}),
		[],
	);

	const [form, setForm] = useState<UserFormState & { _id: string }>(initialForm);
	const [loading, setLoading] = useState<boolean>(false);
	const [showForm, setShowForm] = useState<boolean>(false);

	useEffect(() => {
		const id = selectedUser?._id ?? selectedUser?.id;

		if (selectedUser && id) {
			setShowForm(true);
			setForm({
				_id: id,
				name: selectedUser.name ?? "",
				email: selectedUser.email ?? "",
				role: (selectedUser.role ?? "user") as Role,
				password: "",
			});
		} else {
			resetForm();
		}
	}, [selectedUser, initialForm]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		const { name, value } = event.target;

		setForm((prev) => {
			if (name === "role") {
				return { ...prev, role: value as Role };
			}
			return { ...prev, [name]: value } as typeof prev;
		});
	};

	const resetForm = () => {
		setForm(initialForm);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		setLoading(true);

		try {
			const payload: UserUpsertPayload = {
				name: form.name.trim(),
				email: form.email.trim(),
				role: form.role,
				...(form.password ? { password: form.password.trim() } : {}),
			};

			const userId = form._id || selectedUser?._id || selectedUser?.id;

			const toastId = toast.loading(userId ? "Actualizando usuario..." : "Creando usuario...");

			if (userId) {
				await api.put(`/users/${userId}`, payload);
				(toast.success("Usuario actualizado correctamente"), { id: toastId });
			} else {
				await api.post("/auth/register", payload);
				(toast.success("Usuario creado correctamente"), { id: toastId });
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
