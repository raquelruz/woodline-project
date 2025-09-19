import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});
	const [success, setSuccess] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const newErrors = {};
		if (!formData.email) newErrors.email = "El email es obligatorio";
		if (!formData.password) newErrors.password = "La contraseña es obligatoria";

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			// LÓGICA DE LOGIN CON API
			setSuccess(true);
			console.log("Usuario logueado:", formData);
			setFormData({ email: "", password: "" });
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[350px]">
				<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar sesión</h2>

				{success && (
					<div className="bg-green-100 text-green-700 p-3 mb-4 rounded">Login simulado exitoso 🎉</div>
				)}

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div>
						<label className="block text-gray-700 mb-1">Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
						/>
						{errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
					</div>

					<div>
						<label className="block text-gray-700 mb-1">Contraseña</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
						/>
						{errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
					</div>

					<button
						type="submit"
						className="mt-4 bg-primary-hover text-white font-semibold py-2 rounded-md shadow hover:bg-primary-pressed transition-all"
					>
						Iniciar sesión
					</button>
				</form>

				<p className="mt-4 text-center text-gray-600 text-sm">
					¿No tienes cuenta?{" "}
					<Link to="/register" className="text-primary-hover hover:underline">
						Regístrate
					</Link>
				</p>
			</div>
		</div>
	);
};
