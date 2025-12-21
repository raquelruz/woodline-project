import { useState, useEffect } from "react";
import { api } from "../core/http/axios";

export const useProfileForm = (user, setUser) => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		address: "",
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (!user) return;
		setFormData({
			firstName: user.name ?? "",
			lastName: user.lastName ?? "",
			email: user.email ?? "",
			phone: user.phone ?? "",
			address: user.address ?? "",
		});
	}, [user]);

	const handleChange = (event) => {
		setFormData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSave = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const { data } = await api.patch(`/users/${user.id}`, formData);
			setUser(data);
			setSuccess(true);
		} catch (error) {
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
