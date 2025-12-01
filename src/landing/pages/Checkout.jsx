import { useState, useCallback, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../core/cart/useCart";
import { useOrders } from "../../core/orders/useOrders";
import { AuthContext } from "../../contexts/AuthContext";
import { calculateSubtotal, calculateTax } from "../../helpers/orders.helpers";
import { LoadingButton } from "../components/Buttons/LoadingButton";
import { PaymentModal } from "../components/Modals/PaymentModal";
import { OrderItems } from "../components/Orders/OrderItems";
import { CheckoutForm } from "../components/Orders/CheckoutForm";
import { OrderSummary } from "../components/Orders/OrderSummary";

export const Checkout = () => {
	const { items, clearCart } = useCart();
	const { createOrder } = useOrders();
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const [shippingAddress, setShippingAddress] = useState("");
	const [billingAddress, setBillingAddress] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("credit_card");

	const [showPayment, setShowPayment] = useState(false);
	const [loading, setLoading] = useState(false);

	const { subtotal, tax, total } = useMemo(() => {
		const subtotal = calculateSubtotal(items);
		const tax = calculateTax(subtotal);
		return { subtotal, tax, total: subtotal + tax };
	}, [items]);

	const handlePaymentSuccess = useCallback(async () => {
		setShowPayment(false);

		if (!user) {
			alert("Debes iniciar sesión para confirmar tu pedido");
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
		} catch {
			alert("Error al confirmar el pedido.");
		} finally {
			setLoading(false);
		}
	}, [user, items, shippingAddress, billingAddress, paymentMethod, createOrder, clearCart, navigate]);

	const handleConfirm = useCallback(() => {
		if (!user) return alert("Debes iniciar sesión");
		setShowPayment(true);
	}, [user]);

	// console.log("Render Checkout")

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
					<h2 className="text-2xl font-title font-bold text-primary mb-4">Resumen del pedido</h2>

					<OrderItems items={items} />
				</div>

				<div className="bg-white shadow-md rounded-xl p-6 space-y-4">
					<h2 className="font-title font-bold text-primary">Datos de envío</h2>

					<CheckoutForm
						shippingAddress={shippingAddress}
						setShippingAddress={setShippingAddress}
						billingAddress={billingAddress}
						setBillingAddress={setBillingAddress}
						paymentMethod={paymentMethod}
						setPaymentMethod={setPaymentMethod}
					/>

					<OrderSummary subtotal={subtotal} tax={tax} total={total} />

					<LoadingButton
						onClick={handleConfirm}
						loading={loading}
						disabled={!shippingAddress || !billingAddress}
					>
						Confirmar pedido
					</LoadingButton>
				</div>
			</div>
		</div>
	);
};
