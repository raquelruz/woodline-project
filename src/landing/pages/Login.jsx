import { useState } from "react";
import { Container } from "../components/Container";
import { FormInput } from "../components/FormInput";
import { Link } from "react-router-dom";
import { useAuth } from "../../core/auth/useAuth";

const INITIAL_FORM = { email: "", password: "" };

const LOGIN_FIELDS = [
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
			name: "password",
			type: "password",
			placeholder: "1234",
			required: true,
		},
		label: {
			text: "Contraseña",
			className: "",
		},
	},
];

export const Login = () => {
	const [form, setForm] = useState(INITIAL_FORM);
	const { login } = useAuth();

	const onInputChange = (event) => {
		const { name, value } = event.target;

		setForm({ ...form, [name]: value });
	};

	const onLoginSubmit = async (event) => {
		event.preventDefault();
		alert(`Email: ${form.email}\nPassword: ${form.password}`);
		await login(form);
		setForm(INITIAL_FORM);
	};

	return (
		<Container className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[450px]">
				<h2 className="font-title text-primary text-center pb-10">Iniciar sesión</h2>

				<form className="flex flex-col gap-5" onSubmit={onLoginSubmit}>
					{LOGIN_FIELDS.map(({ label, input, containerClass }) => (
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

					<button
						type="submit"
						className="mt-4 bg-primary-light text-white font-semibold py-2 rounded-md shadow hover:bg-primary transition-all"
					>
						Iniciar sesión
					</button>
				</form>

				<p className="mt-4 text-center text-gray-600 text-sm">
					¿No tienes cuenta?{" "}
					<Link to="/register" className="text-primary hover:underline">
						Regístrate
					</Link>
				</p>
			</div>
		</Container>
	);
};
