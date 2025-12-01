import { memo, useMemo } from "react";

export const CartSummary = memo(({ subtotal, deliveryFee, discount, total, onCheckout }) => {
	const values = useMemo(() => {
		return {
			subtotal: subtotal.toFixed(2),
			deliveryFee: deliveryFee.toFixed(2),
			discountPercent: Math.round(discount * 100),
			total: total.toFixed(2),
		};
	}, [subtotal, deliveryFee, discount, total]);

	const buttonClasses = useMemo(
		() => "w-full mt-6 bg-primary-light text-white font-semibold py-3 rounded-xl hover:bg-primary transition",
		[]
	);

	// console.log("Render CartSummary");

	return (
		<div className="bg-white shadow-md rounded-xl p-6 h-fit">
			<h2 className="font-title text-xl font-bold text-primary-pressed mb-4">Resumen del pedido</h2>

			<div className="space-y-2 text-gray-600">
				<div className="flex justify-between">
					<span>Subtotal</span>
					<span>{values.subtotal} €</span>
				</div>

				<div className="flex justify-between">
					<span>Gastos de envío</span>
					<span>{values.deliveryFee} €</span>
				</div>

				<div className="flex justify-between text-success">
					<span>Descuento</span>
					<span>-{values.discountPercent}%</span>
				</div>
			</div>

			<div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-3 mt-3 text-gray-800">
				<span>Total</span>
				<span>{values.total} €</span>
			</div>

			<button onClick={onCheckout} className={buttonClasses} aria-label="Ir al checkout">
				Comprar ahora →
			</button>
		</div>
	);
});
