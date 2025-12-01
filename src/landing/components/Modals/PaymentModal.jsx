import { memo, useCallback, useMemo, useState } from "react";
import {
	isValidCardNumber,
	isValidExpiry,
	isValidCVV,
	isValidHolder,
	isValidEmail,
} from "../../../helpers/paymentValidators.helpers";

const inputClass = "w-full px-3 py-2 border rounded-lg focus:ring-primary";
const buttonClass = "px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary";

export const PaymentModal = memo(({ isOpen, onClose, onSuccess, paymentMethod }) => {
	const [processing, setProcessing] = useState(false);
	const [error, setError] = useState("");
	const [form, setForm] = useState({
		cardNumber: "",
		expiry: "",
		cvv: "",
		holder: "",
		paypalEmail: "",
	});

	const handleChange = useCallback((event) => {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		setError("");
	}, []);

	const validate = useCallback(() => {
		if (paymentMethod === "credit_card") {
			if (!isValidCardNumber(form.cardNumber)) return "Número de tarjeta inválido";
			if (!isValidExpiry(form.expiry)) return "Fecha inválida (usa MM/AA)";
			if (!isValidCVV(form.cvv)) return "CVV inválido";
			if (!isValidHolder(form.holder)) return "Titular inválido";
		}

		if (paymentMethod === "paypal") {
			if (!isValidEmail(form.paypalEmail)) return "Correo PayPal inválido";
		}

		return null;
	}, [paymentMethod, form]);

	const handlePayment = useCallback(() => {
		const validationError = validate();
		if (validationError) {
			setError(validationError);
			return;
		}

		setProcessing(true);

		setTimeout(() => {
			setProcessing(false);

			if (Math.random() > 0.2) {
				onSuccess();
			} else {
				alert("Error en el pago. Intenta de nuevo.");
				onClose();
			}
		}, 2000);
	}, [validate, onSuccess, onClose]);

	const title = useMemo(
		() => `Pago con ${paymentMethod === "paypal" ? "PayPal" : "Tarjeta de crédito"}`,
		[paymentMethod]
	);

	const content = useMemo(() => {
		if (processing) {
			return (
				<div className="flex flex-col items-center justify-center py-6">
					<div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
					<p className="text-gray-600">Procesando pago...</p>
				</div>
			);
		}

		if (paymentMethod === "credit_card") {
			return (
				<div className="flex flex-col gap-4">
					<input
						type="text"
						name="cardNumber"
						value={form.cardNumber}
						onChange={handleChange}
						placeholder="Número de tarjeta (16 dígitos)"
						className={inputClass}
					/>

					<div className="flex gap-3">
						<input
							type="text"
							name="expiry"
							value={form.expiry}
							onChange={handleChange}
							placeholder="MM/AA"
							className={inputClass}
						/>
						<input
							type="text"
							name="cvv"
							value={form.cvv}
							onChange={handleChange}
							placeholder="CVV"
							className={inputClass}
						/>
					</div>

					<input
						type="text"
						name="holder"
						value={form.holder}
						onChange={handleChange}
						placeholder="Titular de la tarjeta"
						className={inputClass}
					/>

					{error && <p className="text-red-600 text-sm">{error}</p>}

					<div className="flex justify-end gap-3 mt-4">
						<button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
							Cancelar
						</button>

						<button onClick={handlePayment} className={buttonClass}>
							Pagar ahora
						</button>
					</div>
				</div>
			);
		}

		// PAYPAL
		return (
			<div className="space-y-4">
				<input
					type="email"
					name="paypalEmail"
					value={form.paypalEmail}
					onChange={handleChange}
					placeholder="Correo de PayPal"
					className={inputClass}
				/>

				{error && <p className="text-error text-sm">{error}</p>}

				<div className="flex justify-end gap-3 mt-4">
					<button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
						Cancelar
					</button>

					<button onClick={handlePayment} className={buttonClass}>
						Pagar ahora
					</button>
				</div>
			</div>
		);
	}, [processing, form, error, handleChange, onClose, handlePayment, paymentMethod]);

	if (!isOpen) return null;

	// console.log("Render PaymentModal");

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
			<div className="bg-white w-[350px] max-w-[1290px] rounded-2xl shadow-lg p-4">
				<h4 className="text-center font-semibold mb-6 text-gray-800">{title}</h4>

				{content}
			</div>
		</div>
	);
});
