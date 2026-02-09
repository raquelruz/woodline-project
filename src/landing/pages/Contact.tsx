import React, { useState, useCallback } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslate } from "../../translations/useTranslate";

type ContactReason = "" | "consulta" | "soporte" | "colaboracion" | "otro";

type ContactFormData = {
	name: string;
	email: string;
	reason: ContactReason;
	message: string;
	privacy: boolean;
};

type ChangeEvt =
	| React.ChangeEvent<HTMLInputElement>
	| React.ChangeEvent<HTMLTextAreaElement>
	| React.ChangeEvent<HTMLSelectElement>;

const Contact = () => {
	const { t } = useTranslate();
	const [formData, setFormData] = useState<ContactFormData>({
		name: "",
		email: "",
		reason: "",
		message: "",
		privacy: false,
	});

	const [submitted, setSubmitted] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const handleChange = useCallback((event: ChangeEvt) => {
		const { name, value, type } = event.target;

		const checked =
			type === "checkbox" && event.target instanceof HTMLInputElement ? event.target.checked : undefined;

		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? (checked ?? false) : value,
		}));

		setError("");
	}, []);
	// VALIDACIONES
	const validateForm = useCallback((data: ContactFormData): string | null => {
		if (!data.name.trim()) return "Rellena el campo 'Nombre'";
		if (!data.email.trim()) return "Rellena el campo 'Email'";
		if (!data.reason) return "Selecciona un motivo de contacto";
		if (!data.message.trim()) return "Rellena el mensaje";
		if (!data.privacy) return "Debes aceptar la política de privacidad";
		return null;
	}, []);

	// ENVÍO MAIL
	const sendMailto = useCallback((data: ContactFormData): void => {
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
		(event: React.FormEvent<HTMLFormElement>) => {
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
		[formData, validateForm, sendMailto],
	);

	// RENDER
	let formContent: React.ReactNode;

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
						placeholder={t("pages.contact.name")}
						className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
					/>

					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="email@example.com"
						className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>

				<select
					name="reason"
					value={formData.reason}
					onChange={handleChange}
					className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
				>
					<option value="">{t("pages.contact.select")}</option>
					<option value="consulta">{t("pages.contact.consult")}</option>
					<option value="soporte">{t("pages.contact.support")}</option>
					<option value="colaboracion">{t("pages.contact.collaboration")}</option>
					<option value="otro">{t("pages.contact.other")}</option>
				</select>

				<textarea
					name="message"
					value={formData.message}
					onChange={handleChange}
					placeholder={t("pages.contact.message_placeholder")}
					rows={4}
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
					{t("pages.contact.contact_accept")}
				</label>

				<button
					type="submit"
					className="bg-primary text-white font-semibold py-3 rounded-md hover:bg-primary-light transition-colors mt-4"
				>
					{t("pages.contact.contactform_submit")}
				</button>
			</form>
		);
	}

	// Si envía -> Mensaje de éxito
	if (submitted) {
		formContent = (
			<div className="text-center text-primary-pressed font-medium py-10">
				<p className="text-lg">{t("pages.contact.success_message")}</p>
				<p>{t("pages.contact.mail_open")}</p>
				<p className="text-sm mt-2">
					<b>{t("pages.contact.check_message")}</b>
				</p>
			</div>
		);
	}

	return (
		<section className="relative bg-gradient-to-b from-white to-gray-100 py-20 px-6">
			<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
				<div className="flex flex-col justify-center px-4">
					<h2 className="text-4xl font-title font-bold text-primary mb-4">{t("pages.contact.title")}</h2>
					<p className="text-gray-700 mb-6 leading-relaxed">{t("pages.contact.description")}</p>

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
						{t("pages.contact.contactform_title")}
					</h3>

					{error && <p className="mb-4 text-error text-center font-medium">{error}</p>}

					{formContent}
				</div>
			</div>
		</section>
	);
};

export default Contact;
