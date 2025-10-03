import { useState } from "react";

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

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
		setError(""); 
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const { name, email, reason, message, privacy } = formData;

		if (!name) return setError("Rellena el campo 'Nombre'");
		if (!email) return setError("Rellena el campo 'Email'");
		if (!reason) return setError("Selecciona un motivo de contacto");
		if (!message) return setError("Rellena el mensaje");
		if (!privacy) return setError("Debes aceptar la política de privacidad");

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
		setFormData({
			name: "",
			email: "",
			reason: "",
			message: "",
			privacy: false,
		});
	};

	return (
		<section className="py-12 px-12 bg-bg-gray">
			<div className="flex flex-col md:flex-row justify-center items-center gap-20">
				<div className="flex flex-col">
					<h2 className="font-title font-bold mb-2 text-primary">Contacto</h2>
					<p className="mb-2">
						En
						<span className="font-semibold text-primary font-title"> Woodline Living</span> nos encanta conectar con nuestros
						clientes.
					</p>
					<p className="">
						Si tienes preguntas sobre nuestros productos, necesitas soporte o quieres compartir tus ideas y
						sugerencias, este es el lugar para hacerlo. Rellena el formulario y nos pondremos en contacto
						contigo lo antes posible.
					</p>
                    
                    <br />

					<p className="">
						Tu opinión es importante para nosotros, y nos aseguramos de responder con atención y rapidez.
						¡Gracias por confiar en nosotros!
					</p>
				</div>

				{error && <p className="mb-4 text-error font-medium text-center">{error}</p>}

				{!submitted ? (
					<form
						className="bg-white shadow-md rounded-lg p-20 flex flex-col gap-4"
						onSubmit={handleSubmit}
						noValidate
					>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="Tu nombre"
							className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
							required
						/>

						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="tu@correo.com"
							className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
							required
						/>

						<select
							name="reason"
							value={formData.reason}
							onChange={handleChange}
							className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
							required
						>
							<option value="">--Selecciona un motivo--</option>
							<option value="consulta">Consulta</option>
							<option value="soporte">Soporte</option>
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
							required
						/>

						<label className="flex items-center gap-2 text-sm">
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
							className="bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
						>
							Enviar mensaje
						</button>
					</form>
				) : (
					<p className="mt-4 text-center text-primary-pressed font-medium">
						🎉 ¡Mensaje preparado! <br />
						Se ha abierto tu app de correo. <br />
						<b>Revisa y envía el mensaje para completar el contacto.</b>
					</p>
				)}
			</div>
		</section>
	);
};
