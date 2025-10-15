import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		reason: "",
		message: "",
		privacy: false,
	});

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");

	function handleChange(event) {
		const { name, value, type, checked } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
		setError("");
	}

	function handleSubmit(event) {
		event.preventDefault();
		const { name, email, reason, message, privacy } = formData;

		if (!name) {
			setError("Rellena el campo 'Nombre'");
			return;
		}
		if (!email) {
			setError("Rellena el campo 'Email'");
			return;
		}
		if (!reason) {
			setError("Selecciona un motivo de contacto");
			return;
		}
		if (!message) {
			setError("Rellena el mensaje");
			return;
		}
		if (!privacy) {
			setError("Debes aceptar la política de privacidad");
			return;
		}

		const recipientEmail = "woodline@info.com";
		const subject = `${name} (${email}) - [${reason}]`;
		const body = message;

		const mailToLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
			body
		)}`;

		const tempLink = document.createElement("a");
		tempLink.href = mailToLink;
		tempLink.style.display = "none";
		document.body.appendChild(tempLink);
		tempLink.click();
		document.body.removeChild(tempLink);

		setSubmitted(true);
		setFormData({ name: "", email: "", reason: "", message: "", privacy: false });
	}

	return (
		<section className="relative bg-gradient-to-b from-white to-gray-100 py-20 px-6">
			<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
				<div className="flex flex-col justify-center px-4">
					<h2 className="text-4xl font-title font-bold text-primary mb-4">¿Hablamos?</h2>
					<p className="text-gray-700 mb-6 leading-relaxed">
						En <span className="text-primary font-semibold">Woodline Living</span> queremos ayudarte a crear
						el hogar de tus sueños. Cuéntanos en qué podemos asistirte y nuestro equipo se pondrá en contacto contigo.
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
					<h3 className="text-2xl font-title text-primary mb-6 text-center">
						Envíanos un mensaje
					</h3>

					{error && (
						<p className="mb-4 text-error text-center font-medium">{error}</p>
					)}

					{submitted === false && (
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
								<a
									href="/privacidad"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary hover:underline"
								>
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
					)}

					{submitted === true && (
						<div className="text-center text-primary-pressed font-medium py-10">
							<p className="text-lg">🎉 ¡Mensaje preparado!</p>
							<p>Se ha abierto tu aplicación de correo.</p>
							<p className="text-sm mt-2">
								<b>Revisa y envía el mensaje para completar el contacto.</b>
							</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};
