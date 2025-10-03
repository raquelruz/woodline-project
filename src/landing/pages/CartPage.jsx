import { useNavigate } from "react-router-dom";
import { useCart } from "../../core/cart/useCart.jsx";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";

export const CartPage = () => {
	const { items, removeFromCart, incrementQty, decrementQty, clearCart } = useCart();
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	const subtotal = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
	const deliveryFee = 4.9;
	const discount = 0.2;
	const total = subtotal + deliveryFee - subtotal * discount;

	const handleCheckout = () => {
		if (!user) {
			navigate("/login");
		} else {
			navigate("/checkout");
		}
	}

	return (
		<div className="min-h-screen p-8 bg-gray-50">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Columna izquierda → lista de productos */}
				<div className="md:col-span-2 space-y-6">
					<h2 className="font-title font-bold text-primary mb-4">Carrito de compra</h2>

					{items.length === 0 ? (
						<p className="text-gray-500 text-lg">Tu carrito está vacío.</p>
					) : (
						items.map((item) => {
							const id = item.productId || item.id;
							return (
								<div
									key={id}
									className="flex flex-col bg-white md:flex-row items-center justify-between shadow-md rounded-xl p-4 hover:shadow-lg transition"
								>
									{/* Imagen + info */}
									<div className="flex items-center gap-4 w-full md:w-auto">
										{item.images?.[0] && (
											<img
												src={item.images[0]}
												alt={item.name}
												className="w-28 h-28 rounded-lg object-cover"
											/>
										)}
										<div>
											<h2 className="font-semibold font-title text-lg text-primary">
												{item.name}
											</h2>
											<p className="text-primary-pressed text-lg mt-1">
												{(item.price || 0).toFixed(2)} €
											</p>
										</div>
									</div>

									{/* Controles */}
									<div className="flex items-center gap-3 mt-4 md:mt-0">
										<button
											onClick={() => decrementQty(id)}
											className="px-3 py-1 border border-gray-300 rounded-full text-primary hover:text-primary-light disabled:opacity-40"
											disabled={(item.quantity || 1) <= 1}
										>
											−
										</button>
										<span className="w-8 text-center font-semibold">{item.quantity || 1}</span>
										<button
											onClick={() => incrementQty(id)}
											className="px-3 py-1 border border-gray-300 rounded-full bg-primary-hover text-primary hover:bg-primary-light"
										>
											+
										</button>
										<button
											onClick={() => removeFromCart(id)}
											className="font-bold ml-3 text-error"
											title="Remove"
										>
											✕
										</button>
									</div>
								</div>
							);
						})
					)}
				</div>

				{/* Columna derecha → resumen */}
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
						<div className="flex justify-between text-success">
							<span>Descuento</span>
							<span>-{Math.round(discount * 100)}%</span>
						</div>
					</div>

					<div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-3 mt-3 text-gray-800">
						<span>Total</span>
						<span>{total.toFixed(2)} €</span>
					</div>
					<button
					onClick={handleCheckout}
						className={"w-full mt-6 bg-primary-light text-white font-semibold py-3 rounded-xl hover:bg-primary transition"}
					>
						Comprar ahora →
					</button>
				</div>
			</div>
		</div>
	);
};
