import { useState } from "react";
import { Link } from "react-router-dom";
import { FormInput } from "../components/FormInput";
import { useAuth } from "../../core/auth/useAuth";
import { useTranslate } from "../../translations/useTranslate";

const INITIAL_FORM = {
	email: "",
	password: "",
};

const Login = () => {
	const { t } = useTranslate();
	const { login } = useAuth();
	const [form, setForm] = useState(INITIAL_FORM);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		await login(form);
		setForm(INITIAL_FORM);
	};

	const LOGIN_FIELDS = [
		{
			name: "email",
			type: "email",
			placeholder: "admin@admin.com",
			label: t("auth.email_label"),
		},
		{
			name: "password",
			type: "password",
			placeholder: "123456",
			label: t("auth.password"),
		},
	];

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[450px]">
				<h2 className="font-title text-primary text-center pb-10">{t("auth.login")}</h2>

				<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
					{LOGIN_FIELDS.map(({ name, type, placeholder, label }) => (
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
						{t("auth.login")}
					</button>
				</form>

				<p className="mt-4 text-center text-gray-600 text-sm">
					{t("auth.dont_have_account")}{" "}
					<Link to="/register" className="text-primary hover:underline">
						{t("auth.register")}
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
