import { useNavigate } from "react-router-dom";
import { useCart } from "../../core/cart/useCart.jsx";
import { useCallback, useContext, useMemo } from "react";
import { AuthContext } from "../../contexts/AuthContext.js";

import { CartItem } from "../components/Cart/CartItem";
import { CartSummary } from "../components/Cart/CartSummary";
import { EmptyCart } from "../components/Cart/EmptyCart";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { useTranslate } from "../../translations/useTranslate";

const CartPage = () => {
	const { t } = useTranslate();
	const { items, removeFromCart, incrementQty, decrementQty } = useCart();
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	const handleCheckout = useCallback(() => {
		!user ? navigate("/login") : navigate("/checkout");
	}, [user, navigate]);

	const { subtotal, deliveryFee, discount, total } = useMemo(() => {
		const subtotalCalc = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

		const fee = 4.9;
		const disc = 0.2;
		const totalCalc = subtotalCalc + fee - subtotalCalc * disc;

		return {
			subtotal: subtotalCalc,
			deliveryFee: fee,
			discount: disc,
			total: totalCalc,
		};
	}, [items]);

	return (
		<div className="min-h-screen p-8 bg-gray-50">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="md:col-span-2 space-y-6">
					<h2 className="font-title font-bold text-primary mb-4">{t("products.cart")}</h2>

					{items.length === 0 && <EmptyCart />}

					{items.length > 0 &&
						items.map((item) => {
							const itemId = item.productId ?? item._id ?? item.id;

							return (
								<ErrorBoundary
									key={itemId}
									fallback={
										<div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-600">
											{t("products.error_display")}
											<button onClick={() => removeFromCart(itemId)} className="ml-2 underline">
												{t("common.delete")}
											</button>
										</div>
									}
								>
									<CartItem
										itemId={itemId}
										item={item}
										incrementQty={incrementQty}
										decrementQty={decrementQty}
										removeFromCart={removeFromCart}
									/>
								</ErrorBoundary>
							);
						})}
				</div>

				<CartSummary
					subtotal={subtotal}
					deliveryFee={deliveryFee}
					discount={discount}
					total={total}
					onCheckout={handleCheckout}
				/>
			</div>
		</div>
	);
};

export default CartPage;