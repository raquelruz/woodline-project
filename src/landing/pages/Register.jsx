import { useState } from "react";
import { Container } from "../components/Container";
import { FormInput } from "../components/FormInput";
import { Link } from "react-router-dom";

const INITIAL_FORM = { name: "", email: "", adress: "", password: "", role: "" };

const REGISTER_FORM_FIELDS = [
	{
		containerClass: "flex flex-col gap-2",
		input: {
			name: "name",
			type: "text",
			placeholder: "Raquel Ruiz",
			label: "Nombre Completo",
			required: true,
		},
		label: {
			text: "Nombre completo",
			className: "",
		},
	},
	{
		containerClass: "flex flex-col gap-2",
		input: {
			name: "email",
			type: "email",
			placeholder: "admin@admin.com",
			label: "Email",
			required: true,
		},
		label: {
			text: "Email",
			className: "",
		},
	},
	{
		containerClass: "flex flex-col gap-2",
		input: {
			name: "adress",
			type: "text",
			placeholder: "C/ Nazaret, 18, Jerez, 11408",
			label: "Dirección",
			required: true,
		},
		label: {
			text: "Dirección",
			className: "",
		},
	},
	{
		containerClass: "flex flex-col gap-2",
		input: {
			name: "password",
			type: "password",
			placeholder: "1234",
			label: "Contraseña",
			required: true,
		},
		label: {
			text: "Contraseña",
			className: "",
		},
	},
	{
		containerClass: "flex flex-col gap-2",
		input: {
			name: "role",
			type: "text",
			placeholder: "admin",
			label: "Rol (admin / user)",
			required: true,
		},
		label: {
			text: "Rol (admin / user)",
			className: "",
		},
	},
];

export const Register = () => {
	const [form, setForm] = useState(INITIAL_FORM);

	const onInputChange = (event) => {
		const { name, value } = event.target;

		setForm({ ...form, [name]: value });
	};

	const onRegisterSubmit = (event) => {
		event.preventDefault();

		alert(
			`Name: ${form.name} Email: ${form.email}\nPassword: ${form.password}, role: ${form.role} nombre: ${form.name}`
		);
		setForm(INITIAL_FORM);
	};

	return (
		<Container className="flex items-center justify-center min-h-screen bg-gray-100 px-4 pt-20">
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[350px]">
				<h2 className="font-title text-primary-pressed text-center pb-10">Crear cuenta</h2>

				<form className="flex flex-col gap-5" onSubmit={onRegisterSubmit}>
					{REGISTER_FORM_FIELDS.map(({ label, input, containerClass }) => (
						<FormInput
							key={input.name}
							containerClass={containerClass}
							input={{
								name: input.name,
								type: input.type,
								placeholder: input.placeholder,
								value: form[input.name],
								onChange: onInputChange,
								required: input.required,
							}}
							label={{
								text: label.text,
								className: label.className,
							}}
						/>
					))}

					<button type="submit" className="mt-4 bg-primary-hover text-white font-semibold py-2 rounded-md shadow hover:bg-primary-pressed transition-all">Crear cuenta</button>
				</form>

								<p className="mt-4 text-center text-gray-600 text-sm">
					¿Ya tienes una cuenta?{" "}
					<Link to="/login" className="text-primary-hover hover:underline">
						Inicia sesión
					</Link>
				</p>
			</div>
		</Container>
	);
};