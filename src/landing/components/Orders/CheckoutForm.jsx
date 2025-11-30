export const CheckoutForm = ({
    shippingAddress,
    setShippingAddress,
    billingAddress,
    setBillingAddress,
    paymentMethod,
    setPaymentMethod
}) => {

    return (
        <div className="space-y-3">
            <div>
                <label className="block text-sm font-medium py-2">Dirección de envío</label>
                <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Calle Ejemplo, Nº 123"
                />
            </div>

            <div>
                <label className="block text-sm font-medium py-2">Dirección de facturación</label>
                <input
                    type="text"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Calle Ejemplo, Nº 123"
                />
            </div>

            <div>
                <label className="block text-sm font-medium py-2">Método de pago</label>
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                >
                    <option value="credit_card">Tarjeta de crédito</option>
                    <option value="paypal">PayPal</option>
                </select>
            </div>
        </div>
    );
};
