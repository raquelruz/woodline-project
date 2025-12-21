import { useState, useCallback } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		reason: "",
		message: "",
		privacy: false,
	});

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");

	const handleChange = useCallback((event) => {
		const { name, value, type, checked } = event.target;

		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));

		setError("");
	}, []);

	// VALIDACIONES
	const validateForm = useCallback((data) => {
		if (!data.name.trim()) return "Rellena el campo 'Nombre'";
		if (!data.email.trim()) return "Rellena el campo 'Email'";
		if (!data.reason) return "Selecciona un motivo de contacto";
		if (!data.message.trim()) return "Rellena el mensaje";
		if (!data.privacy) return "Debes aceptar la política de privacidad";
		return null;
	}, []);

	// ENVÍO MAIL
	const sendMailto = useCallback((data) => {
		const recipientEmail = "woodline@info.com";
		const subject = `${data.name} (${data.email}) - [${data.reason}]`;
		const body = data.message;

		const link = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

		const a = document.createElement("a");
		a.href = link;
		a.style.display = "none";
		document.body.appendChild(a);
		a.click();
		a.remove();
	}, []);

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault();

			const validationError = validateForm(formData);
			if (validationError) {
				setError(validationError);
				return;
			}

			sendMailto(formData);

			setFormData({
				name: "",
				email: "",
				reason: "",
				message: "",
				privacy: false,
			});

			setSubmitted(true);
		},
		[formData, validateForm, sendMailto]
	);

	// RENDER
	let formContent;

	// Si NO envía -> Muestra el formulario
	if (!submitted) {
		formContent = (
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Tu nombre"
						className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
					/>

					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="tu@correo.com"
						className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>

				<select
					name="reason"
					value={formData.reason}
					onChange={handleChange}
					className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
				>
					<option value="">--Selecciona un motivo--</option>
					<option value="consulta">Consulta general</option>
					<option value="soporte">Soporte técnico</option>
					<option value="colaboracion">Colaboración</option>
					<option value="otro">Otro</option>
				</select>

				<textarea
					name="message"
					value={formData.message}
					onChange={handleChange}
					placeholder="Escribe tu mensaje aquí..."
					rows="4"
					className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
				/>

				<label className="flex items-center gap-2 text-sm text-gray-600">
					<input
						type="checkbox"
						name="privacy"
						checked={formData.privacy}
						onChange={handleChange}
						className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
					/>
					Acepto la{" "}
					<a href="/privacidad" className="text-primary hover:underline">
						política de privacidad
					</a>
				</label>

				<button
					type="submit"
					className="bg-primary text-white font-semibold py-3 rounded-md hover:bg-primary-light transition-colors mt-4"
				>
					Enviar mensaje
				</button>
			</form>
		);
	}

	// Si envía -> Mensaje de éxito
	if (submitted) {
		formContent = (
			<div className="text-center text-primary-pressed font-medium py-10">
				<p className="text-lg">🎉 ¡Mensaje preparado!</p>
				<p>Se ha abierto tu aplicación de correo.</p>
				<p className="text-sm mt-2">
					<b>Revisa y envía el mensaje para completar el contacto.</b>
				</p>
			</div>
		);
	}

	return (
		<section className="relative bg-gradient-to-b from-white to-gray-100 py-20 px-6">
			<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
				<div className="flex flex-col justify-center px-4">
					<h2 className="text-4xl font-title font-bold text-primary mb-4">¿Hablamos?</h2>
					<p className="text-gray-700 mb-6 leading-relaxed">
						En <span className="text-primary font-semibold">Woodline Living</span> queremos ayudarte a crear
						el hogar perfecto.
					</p>

					<div className="flex flex-col gap-4 text-gray-600">
						<p className="flex items-center gap-3">
							<FaEnvelope className="text-primary" /> woodline@info.com
						</p>
						<p className="flex items-center gap-3">
							<FaPhoneAlt className="text-primary" /> +34 123 456 789
						</p>
						<p className="flex items-center gap-3">
							<FaMapMarkerAlt className="text-primary" /> Cádiz, España
						</p>
					</div>
				</div>

				<div className="bg-white shadow-lg rounded-3xl p-8 md:p-10 border border-gray-200">
					<h3 className="text-2xl font-title text-primary mb-6 text-center">Envíanos un mensaje</h3>

					{error && <p className="mb-4 text-error text-center font-medium">{error}</p>}

					{formContent}
				</div>
			</div>
		</section>
	);
};

export default Contact;