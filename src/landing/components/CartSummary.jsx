export const CartSummary = ({ subtotal, deliveryFee, discount, total }) => {
	return (
		<div className="bg-white shadow-md rounded-xl p-6 h-fit">
			<h2 className="font-title text-xl font-bold text-primary-pressed mb-4">Resumen del pedido</h2>

			<div className="space-y-2 text-gray-600">
				<div className="flex justify-between">
					<span>Subtotal</span>
					<span>{subtotal.toFixed(2)} €</span>
				</div>
				<div className="flex justify-between">
					<span>Gastos de envío</span>
					<span>{deliveryFee.toFixed(2)} €</span>
				</div>
				<div className="flex justify-between text-green-600">
					<span>Descuento</span>
					<span>-{Math.round(discount * 100)}%</span>
				</div>
			</div>

			<div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-3 mt-3 text-gray-800">
				<span>Total</span>
				<span>{total.toFixed(2)} €</span>
			</div>
			<button className="w-full mt-6 bg-primary-hover text-white font-semibold py-3 rounded-xl hover:bg-primary-pressed transition">
				Comprar ahora →
			</button>
		</div>
	);
};
