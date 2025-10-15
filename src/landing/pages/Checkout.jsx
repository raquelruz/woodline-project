import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../core/cart/useCart.jsx";
import { useOrders } from "../../core/orders/useOrders.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { calculateSubtotal, calculateTax, toCurrency } from "../../helpers/orders.helpers.js";
import { LoadingButton } from "../components/Buttons/LoadingButton.jsx";
import { PaymentModal } from "../components/Modals/PaymentModal.jsx";

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

	// Cálculos del pedido
	const subtotal = calculateSubtotal(items);
	const tax = calculateTax(subtotal);
	const total = subtotal + tax;

	const handlePaymentSuccess = async () => {
		setShowPayment(false);

		if (!user) {
			alert("Debes iniciar sesión para confirmar tu pedido");
			return;
		}

		try {
			setLoading(true);
			const order = await createOrder(user.id, items, {
				shippingAddress,
				billingAddress,
				paymentMethod,
			});

			console.log("Pedido creado:", order);

			clearCart();
			navigate("/order-success"); // redirige a página de éxito
		} catch (error) {
			console.error("Error al crear pedido:", error);
			console.error("Backend:", error.response?.data);
			alert("Hubo un error al confirmar el pedido.");
		} finally {
			setLoading(false);
		}
	};

	const handleConfirm = () => {
		if (!user) {
			alert("Debes iniciar sesión para confirmar tu pedido");
			return;
		}
		setShowPayment(true);
	};

	return (
		<div className="min-h-screen bg-gray-50 py-10 px-4">
			{/* Modal de pago ficticio */}
			<PaymentModal
				isOpen={showPayment}
				onClose={() => setShowPayment(false)}
				onSuccess={handlePaymentSuccess}
				paymentMethod={paymentMethod}
			/>

			<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Resumen de productos */}
				<div className="md:col-span-2 bg-white shadow-md rounded-xl p-6 space-y-4">
					<h2 className="text-2xl font-title font-bold text-primary mb-4">Resumen del pedido</h2>

					{items.length === 0 && <p className="text-gray-500">Tu carrito está vacío.</p>}

					{items.length > 0 &&
						items.map((item) => (
							<div key={item.productId || item.id} className="flex justify-between border-b pb-2">
								<span>
									{item.name} x {item.quantity}
								</span>
								<span>{(item.price * item.quantity).toFixed(2)} €</span>
							</div>
						))}
				</div>

				{/* Formulario de envío/pago */}
				<div className="bg-white shadow-md rounded-xl p-6 space-y-4">
					<h2 className="font-title font-bold text-primary">Datos de envío</h2>

					<div className="space-y-3">
						<div>
							<label className="block text-sm font-medium py-2">Dirección de envío</label>
							<input
								type="text"
								value={shippingAddress}
								onChange={(event) => setShippingAddress(event.target.value)}
								placeholder="Calle Ejemplo, Nº 123"
								className="w-full px-3 py-2 border rounded-lg"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium py-2">Dirección de facturación</label>
							<input
								type="text"
								value={billingAddress}
								onChange={(event) => setBillingAddress(event.target.value)}
								placeholder="Calle Ejemplo, Nº 123"
								className="w-full px-3 py-2 border rounded-lg"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium py-2">Método de pago</label>
							<select
								value={paymentMethod}
								onChange={(event) => setPaymentMethod(event.target.value)}
								className="w-full px-3 py-2 border rounded-lg"
							>
								<option value="credit_card">Tarjeta de crédito</option>
								<option value="paypal">PayPal</option>
							</select>
						</div>
					</div>

					{/* Totales */}
					<div className="pt-4 border-t border-primary text-gray-600 space-y-2">
						<div className="flex justify-between">
							<span>Subtotal</span>
							<span>{toCurrency(subtotal)} €</span>
						</div>
						<div className="flex justify-between">
							<span>IVA (21%)</span>
							<span>{toCurrency(tax)} €</span>
						</div>
						<div className="flex justify-between font-bold text-lg text-primary border-t pt-2">
							<span>Total</span>
							<span>{toCurrency(total)} €</span>
						</div>
					</div>

					<LoadingButton
						onClick={handleConfirm}
						loading={loading}
						disabled={!shippingAddress || !billingAddress}
						loadingText="Confirmando..."
					>
						Confirmar pedido
					</LoadingButton>
				</div>
			</div>
		</div>
	);
};
