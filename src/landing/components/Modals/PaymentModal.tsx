import { memo, useCallback, useMemo, useState } from "react";
import {
	isValidCardNumber,
	isValidExpiry,
	isValidCVV,
	isValidHolder,
	isValidEmail,
} from "../../../helpers/paymentValidators.helpers";
import { useTranslate } from "../../../translations/useTranslate";

type PaymentMethod = "credit_card" | "paypal";

type PaymentFormState = {
	cardNumber: string;
	expiry: string;
	cvv: string;
	holder: string;
	paypalEmail: string;
};

type PaymentModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: () => void;
	paymentMethod: PaymentMethod;
};

const inputClass = "w-full px-3 py-2 border rounded-lg focus:ring-primary";
const buttonClass = "px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary";

export const PaymentModal = memo(({
	isOpen,
	onClose,
	onSuccess,
	paymentMethod,
}: PaymentModalProps) => {
	const { t } = useTranslate();
	const [processing, setProcessing] = useState(false);
	const [error, setError] = useState("");
	const [form, setForm] = useState<PaymentFormState>({
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
			if (!isValidCardNumber(form.cardNumber)) return t("orders.invalid_card_number");
			if (!isValidExpiry(form.expiry)) return t("orders.invalid_date");
			if (!isValidCVV(form.cvv)) return t("orders.invalid_cvv");
			if (!isValidHolder(form.holder)) return t("orders.invalid_holder");
		}
		if (paymentMethod === "paypal") {
			if (!isValidEmail(form.paypalEmail)) return t("orders.invalid_paypal");
		}
		return null;
	}, [form, paymentMethod]);

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
				alert(t("orders.payment_error"));
				onClose();
			}
		}, 2000);
	}, [validate, onSuccess, onClose]);

	const processingContent = useMemo(
		() => (
			<div className="flex flex-col items-center justify-center py-6">
				<div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
				<p className="text-gray-600">{t("orders.processing_payment")}</p>
			</div>
		),
		[],
	);

	const creditCardContent = useMemo(
		() => (
			<div className="flex flex-col gap-4">
				<input
					type="text"
					name="cardNumber"
					value={form.cardNumber}
					onChange={handleChange}
					placeholder={t("orders.card_number")}
					className={inputClass}
				/>

				<div className="flex gap-3">
					<input
						type="text"
						name="expiry"
						value={form.expiry}
						onChange={handleChange}
						placeholder={t("orders.mm_aa")}
						className={inputClass}
					/>
					<input
						type="text"
						name="cvv"
						value={form.cvv}
						onChange={handleChange}
						placeholder={t("orders.cvv")}
						className={inputClass}
					/>
				</div>

				<input
					type="text"
					name="holder"
					value={form.holder}
					onChange={handleChange}
					placeholder={t("orders.card_holder")}
					className={inputClass}
				/>

				{error && <p className="text-red-600 text-sm">{error}</p>}

				<div className="flex justify-end gap-3 mt-4">
					<button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
						{t("orders.cancel")}
					</button>
					<button onClick={handlePayment} className={buttonClass}>
						{t("orders.pay_now")}
					</button>
				</div>
			</div>
		),
		[form, error, handleChange, handlePayment, onClose],
	);

	const paypalContent = useMemo(
		() => (
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
						{t("orders.cancel")}
					</button>
					<button onClick={handlePayment} className={buttonClass}>
						{t("orders.pay_now")}
					</button>
				</div>
			</div>
		),
		[form, error, handleChange, handlePayment, onClose],
	);

	if (!isOpen) return null;

	let content;

	if (processing) {
		content = processingContent;
	} else {
		if (paymentMethod === "credit_card") {
			content = creditCardContent;
		} else {
			content = paypalContent;
		}
	}

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
			<div className="bg-white w-[350px] rounded-2xl shadow-lg p-4">
				<h4 className="text-center font-semibold mb-6 text-gray-800">
					{t("orders.payment_with")}{" "}
					{paymentMethod === "paypal" ? t("orders.paypal") : t("orders.credit_card")}
				</h4>
				{content}
			</div>
		</div>
	);
});
