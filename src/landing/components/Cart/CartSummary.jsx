import { memo, useMemo } from "react";

export const CartSummary = memo(({ subtotal, deliveryFee, discount, total, onCheckout, buttonClasses }) => {
	const summaryValues = useMemo(() => {
		return {
			formattedSubtotal: `${subtotal.toFixed(2)} €`,
			formattedDelivery: `${deliveryFee.toFixed(2)} €`,
			formattedDiscount: `-${Math.round(discount * 100)}%`,
			formattedTotal: `${total.toFixed(2)} €`,
		};
	}, [subtotal, deliveryFee, discount, total]);

	return (
		<div className="bg-white shadow-md rounded-xl p-6 h-fit">
			<h2 className="font-title text-xl font-bold text-primary-pressed mb-4">Resumen del pedido</h2>

			<div className="space-y-2 text-gray-600">
				<div className="flex justify-between">
					<span>Subtotal</span>
					<span>{summaryValues.formattedSubtotal}</span>
				</div>

				<div className="flex justify-between">
					<span>Gastos de envío</span>
					<span>{summaryValues.formattedDelivery}</span>
				</div>

				<div className="flex justify-between text-success">
					<span>Descuento</span>
					<span>{summaryValues.formattedDiscount}</span>
				</div>
			</div>

			<div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-3 mt-3 text-gray-800">
				<span>Total</span>
				<span>{summaryValues.formattedTotal}</span>
			</div>

			<button onClick={onCheckout} className={buttonClasses} aria-label="Ir al checkout">
				Comprar ahora →
			</button>
		</div>
	);
});
