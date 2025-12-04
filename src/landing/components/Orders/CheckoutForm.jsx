import { memo, useCallback } from "react";

export const CheckoutForm = memo(
	({ shippingAddress, setShippingAddress, billingAddress, setBillingAddress, paymentMethod, setPaymentMethod }) => {
		const handleShippingChange = useCallback((event) => setShippingAddress(event.target.value), [setShippingAddress]);
		const handleBillingChange = useCallback((event) => setBillingAddress(event.target.value), [setBillingAddress]);
		const handlePaymentChange = useCallback((event) => setPaymentMethod(event.target.value), [setPaymentMethod]);

		// console.log("Render CheckoutForm");

		return (
			<div className="space-y-3">
				<div>
					<label className="block text-sm font-medium py-2">Dirección de envío</label>
					<input
						type="text"
						value={shippingAddress}
						onChange={handleShippingChange}
						className="w-full px-3 py-2 border rounded-lg"
						placeholder="Calle Ejemplo, Nº 123"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium py-2">Dirección de facturación</label>
					<input
						type="text"
						value={billingAddress}
						onChange={handleBillingChange}
						className="w-full px-3 py-2 border rounded-lg"
						placeholder="Calle Ejemplo, Nº 123"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium py-2">Método de pago</label>
					<select
						value={paymentMethod}
						onChange={handlePaymentChange}
						className="w-full px-3 py-2 border rounded-lg"
					>
						<option value="credit_card">Tarjeta de crédito</option>
						<option value="paypal">PayPal</option>
					</select>
				</div>
			</div>
		);
	}
);
