import { useCart } from "../../core/cart/useCart.jsx";
import { CartItem } from "../components/CartItem.jsx";
import { CartSummary } from "../components/CartSummary.jsx";

export const CartPage = () => {
	const { items, removeFromCart, incrementQty, decrementQty, clearCart } = useCart();

	const subtotal = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
	const deliveryFee = 4.9;
	const discount = 0.2;
	const total = subtotal + deliveryFee - subtotal * discount;

	return (
		<div className="min-h-screen p-8">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Columna izquierda → productos */}
				<div className="md:col-span-2 space-y-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="font-title font-bold text-primary-pressed">Carrito de compra</h2>
						{items.length > 0 && (
							<button
								onClick={clearCart}
								className="text-md text-red-500 hover:text-red-700 transition font-medium"
							>
								🗑 Vaciar carrito
							</button>
						)}
					</div>

					{items.length === 0 ? (
						<p className="text-h6 text-gray-500">Tu carrito está vacío.</p>
					) : (
						items.map((item) => (
							<CartItem
								key={item._id || item.id}
								item={item}
								incrementQty={incrementQty}
								decrementQty={decrementQty}
								removeFromCart={removeFromCart}
							/>
						))
					)}
				</div>

				{/* Columna derecha → resumen */}
				<CartSummary subtotal={subtotal} deliveryFee={deliveryFee} discount={discount} total={total} />
			</div>
		</div>
	);
};
