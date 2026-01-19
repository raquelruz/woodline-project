import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../components/Container";
import { FormInput } from "../components/FormInput";
import { useAuth } from "../../core/auth/useAuth";
import { useTranslate } from "../../translations/useTranslate";

const INITIAL_FORM = {
	name: "",
	email: "",
	address: "",
	password: "",
	role: "",
};

const Register = () => {
	const { t } = useTranslate();
	const { register } = useAuth();
	const [form, setForm] = useState(INITIAL_FORM);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		register(form);
		setForm(INITIAL_FORM);
	};

	const REGISTER_FORM_FIELDS = [
		{
			name: "name",
			type: "text",
			placeholder: "Raquel Ruiz",
			label: t("auth.name"),
		},
		{
			name: "email",
			type: "email",
			placeholder: "admin@admin.com",
			label: t("auth.email_label"),
		},
		{
			name: "address",
			type: "text",
			placeholder: "C/ Nazaret, 18, Jerez, 11408",
			label: t("auth.address"),
		},
		{
			name: "password",
			type: "password",
			placeholder: "1234",
			label: t("auth.password"),
		},
		{
			name: "role",
			type: "text",
			placeholder: "admin",
			label: t("auth.role"),
		},
	];

	return (
		<Container className="flex items-center justify-center min-h-screen bg-gray-100 p-12">
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[500px]">
				<h2 className="font-title text-primary text-center pb-10">
					{t("auth.register_title")}
				</h2>

				<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
					{REGISTER_FORM_FIELDS.map(({ name, type, placeholder, label }) => (
						<FormInput
							key={name}
							containerClass="flex flex-col gap-2"
							input={{
								name,
								type,
								placeholder,
								value: form[name],
								onChange: handleInputChange,
								required: true,
							}}
							label={{ text: label }}
						/>
					))}

					<button
						type="submit"
						className="mt-4 bg-primary-light text-white font-semibold py-2 rounded-md shadow hover:bg-primary transition-all"
					>
						{t("auth.register_title")}
					</button>
				</form>

				<p className="mt-4 text-center text-gray-600 text-sm">
					{t("auth.have_account")}{" "}
					<Link to="/login" className="text-primary hover:underline">
						{t("auth.login")}
					</Link>
				</p>
			</div>
		</Container>
	);
};

export default Register;
