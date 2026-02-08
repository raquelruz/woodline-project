import { useState, useEffect } from "react";
import { api } from "../core/http/axios";
import type { ProfileFormData, UseProfileFormResult } from "../core/types/profile.types";
import type { User } from "../core/auth/auth.type";


export const useProfileForm = (
	user: User | null,
	setUser: React.Dispatch<React.SetStateAction<User | null>>,
): UseProfileFormResult => {
	const [formData, setFormData] = useState<ProfileFormData>({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		address: "",
	});

	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<boolean>(false);

	useEffect(() => {
		if (!user) return;

		setFormData({
			firstName: user.firstName ?? "",
			lastName: user.lastName ?? "",
			email: user.email ?? "",
			phone: user.phoneNumber ?? "",
			address: user.address ?? "",
		});
	}, [user]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!user) return;

		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const { data } = await api.patch<User>(`/users/${user.id}`, formData);
			setUser(data);
			setSuccess(true);
		} catch (error) {
			console.error(error);
			setError("Error al guardar cambios");
		} finally {
			setLoading(false);
		}
	};

	return {
		formData,
		handleChange,
		handleSave,
		loading,
		error,
		success,
	};
};
