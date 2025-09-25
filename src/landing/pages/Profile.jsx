import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { api } from "../../core/http/axios";

const inputClass = "w-full p-2 rounded border border-primary-hover text-primary-hover";
const saveButton = "bg-primary-hover px-6 py-2 rounded text-white font-medium hover:bg-primary-hover transition";

export const Profile = () => {
	const { user, setUser } = useContext(AuthContext);
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

	// Si el usuario no está logueado, redirige a Login para iniciar sesión
	if (!user) return <Navigate to="/login" replace />;


	useEffect(() => {
		// console.log("Cargando datos del usuario en el formulario:", user);
		setFormData({
			firstName: user.name || "",
			lastName: user.lastName || "",
			email: user.email || "",
			phone: user.phone || "",
			address: user.address || "",
		});
	}, [user]);

	const handleChange = (event) => {
		// console.log("Cambio en input:", event.target.name, event.target.value);
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

    // Envía los cambios a la API
	const handleSave = async (event) => {
		event.preventDefault();
		// console.log("Enviando datos a la API:", formData);

		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const { data } = await api.patch(`/users/${user.id}`, formData);
			// console.log("Respuesta de la API:", data);
			setUser(data);
			setSuccess(true);
		} catch (error) {
			// console.error("Error al guardar cambios:", error.response?.data || error.message);
			setError(error.response?.data?.message || "Error al guardar cambios");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="font-title text-center text-primary-pressed font-bold mb-6">Mi Perfil</h1>

			<div className=" text-primary-pressed rounded-xl shadow-lg p-6 space-y-6">
				<div className="flex items-center gap-4">
					<div className="w-16 h-16 rounded-full bg-primary-hover flex items-center justify-center text-2xl font-bold">
						{/* Accede al nombre, y luego a la primera letra. si es undefined muestra "U" */}
                        {user.name?.[0] || "U"}
					</div>
					<div>
						<h2 className="text-xl font-semibold">{user.name || "Usuario"}</h2>
						<p className="text-gray-400">{user.email || "Email no disponible"}</p>
					</div>
				</div>

				{/* Información de usuario */}
				<form className="space-y-4" onSubmit={handleSave}>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-primary-hover mb-1">Nombre</label>
							<input
								type="text"
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								className={inputClass}
							/>
						</div>
						<div>
							<label className="block text-primary-hover mb-1">Apellidos</label>
							<input
								type="text"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								className={inputClass}
							/>
						</div>
					</div>

					<div>
						<label className="block text-primary-hover mb-1">Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className={inputClass}
						/>
					</div>

					<div>
						<label className="block text-primary-hover mb-1">Teléfono</label>
						<input
							type="text"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							className={inputClass}
						/>
					</div>

					<div>
						<label className="block text-primary-hover mb-1">Dirección</label>
						<input
							type="text"
							name="address"
							value={formData.address}
							onChange={handleChange}
							className={inputClass}
						/>
					</div>

					{error && <p className="text-red-500">{error}</p>}
					{success && <p className="text-green-500">Perfil actualizado correctamente</p>}

					<button
						type="submit"
						disabled={loading}
						className={saveButton}
					>
						{loading ? "Guardando..." : "Guardar cambios"}
					</button>
				</form>
			</div>
		</div>
	);
};
