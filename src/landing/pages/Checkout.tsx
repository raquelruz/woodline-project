import { useCallback, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../core/cart/useCart";
import { useOrders } from "../../core/orders/useOrders";
import { AuthContext } from "../../contexts/AuthContext";
import { calculateTax } from "../../helpers/orders.helpers";
import { LoadingButton } from "../components/Buttons/LoadingButton";
import { PaymentModal } from "../components/Modals/PaymentModal";
import { useTranslate } from "../../translations/useTranslate";
import type { CartProduct } from "../../core/cart/cart.types";
import type { PaymentMethod } from "../../core/types/payment.types";
import type { AuthContextShape } from "../../core/auth/auth.type";

type CreateOrderOptions = {
	shippingAddress: string;
	billingAddress: string;
	paymentMethod: string;
};

type UseCartShape = {
	items: CartProduct[];
	clearCart: () => void;
};

type UseOrdersShape = {
	createOrder: (userId: string, items: CartProduct[], options: CreateOrderOptions) => Promise<unknown>;
};

const toCurrency = (value: number): string => value.toFixed(2);

const Checkout = () => {
	const { t } = useTranslate();
	const { items, clearCart } = useCart() as UseCartShape;
	const { createOrder } = useOrders() as UseOrdersShape;

	const auth = useContext(AuthContext) as AuthContextShape | null;
	const user = auth?.user ?? null;

	const navigate = useNavigate();

	const [shippingAddress, setShippingAddress] = useState<string>("");
	const [billingAddress, setBillingAddress] = useState<string>("");
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card");

	const [showPayment, setShowPayment] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const subtotal = useMemo<number>(() => {
		return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
	}, [items]);

	const tax = useMemo<number>(() => calculateTax(subtotal), [subtotal]);
	const total = useMemo<number>(() => subtotal + tax, [subtotal, tax]);

	const orderItems = useMemo(
		() =>
			items.map((item) => (
				<div key={item.productId || item.id} className="flex justify-between border-b pb-2">
					<span>
						{item.name} x {item.quantity}
					</span>
					<span>
						{(item.price * item.quantity).toFixed(2)} {t("common.currency")}
					</span>
				</div>
			)),
		[items, t],
	);

	const handlePaymentSuccess = useCallback(async (): Promise<void> => {
		setShowPayment(false);

		if (!user) {
			alert(t("auth.unauthorized"));
			return;
		}

		try {
			setLoading(true);

			await createOrder(user.id, items, {
				shippingAddress,
				billingAddress,
				paymentMethod,
			});

			clearCart();
			navigate("/order-success");
		} catch (error) {
			alert(t("product.error_confirmation_order"));
		} finally {
			setLoading(false);
		}
	}, [user, t, createOrder, items, shippingAddress, billingAddress, paymentMethod, navigate, clearCart]);

	const handleConfirm = useCallback((): void => {
		if (!user) {
			alert(t("auth.unauthorized"));
			return;
		}
		setShowPayment(true);
	}, [user, t]);

	return (
		<div className="min-h-screen bg-gray-50 py-10 px-4">
			<PaymentModal
				isOpen={showPayment}
				onClose={() => setShowPayment(false)}
				onSuccess={handlePaymentSuccess}
				paymentMethod={paymentMethod}
			/>

			<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="md:col-span-2 bg-white shadow-md rounded-xl p-6 space-y-4">
					<h2 className="text-2xl font-title font-bold text-primary mb-4">{t("orders.order_summary")}</h2>

					{items.length === 0 ? <p className="text-gray-500">{t("orders.cart_empty")}</p> : orderItems}
				</div>

				<div className="bg-white shadow-md rounded-xl p-6 space-y-4">
					<h2 className="font-title font-bold text-primary">{t("orders.shipping_information")}</h2>

					<div className="space-y-3">
						<div>
							<label className="block text-sm font-medium py-2">{t("orders.shipping_address")}</label>
							<input
								type="text"
								value={shippingAddress}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									setShippingAddress(event.target.value)
								}
								className="w-full px-3 py-2 border rounded-lg"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium py-2">{t("orders.billing_address")}</label>
							<input
								type="text"
								value={billingAddress}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									setBillingAddress(event.target.value)
								}
								className="w-full px-3 py-2 border rounded-lg"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium py-2">{t("orders.payment_method")}</label>
							<select
								value={paymentMethod}
								onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
									setPaymentMethod(event.target.value as PaymentMethod)
								}
								className="w-full px-3 py-2 border rounded-lg"
							>
								<option value="credit_card">{t("orders.credit_card")}</option>
								<option value="paypal">{t("orders.paypal")}</option>
							</select>
						</div>
					</div>

					<div className="pt-4 border-t border-primary text-gray-600 space-y-2">
						<div className="flex justify-between">
							<span>{t("orders.subtotal")}</span>
							<span>
								{toCurrency(subtotal)} {t("common.currency")}
							</span>
						</div>
						<div className="flex justify-between">
							<span>{t("orders.iva")} (21%)</span>
							<span>
								{toCurrency(tax)} {t("common.currency")}
							</span>
						</div>
						<div className="flex justify-between font-bold text-lg text-primary border-t pt-2">
							<span>{t("orders.total_order")}</span>
							<span>
								{toCurrency(total)} {t("common.currency")}
							</span>
						</div>
					</div>

					<LoadingButton
						onClick={handleConfirm}
						loading={loading}
						disabled={!shippingAddress || !billingAddress}
					>
						{t("orders.confirm_order")}
					</LoadingButton>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
