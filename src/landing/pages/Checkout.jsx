import { useCart } from "../core/cart/useCart.js";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

export const Checkout = () => {
	const { items, checkout } = useCart();
	const { user } = useContext(AuthContext);

	const handleCheckout = async () => {
		try {
			const order = await checkout(user.id); 
			alert("Pedido creado con éxito 🚀");
			console.log(order);
		} catch (error) {
			console.error("Error al crear pedido");
		}
	};

	return (
		<div>
			<h2 className="text-xl font-bold">Resumen del carrito</h2>
			{items.map((item) => (
				<div key={item.productId}>
					{item.name} x {item.quantity}
				</div>
			))}

			<button onClick={handleCheckout} className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg">
				Confirmar pedido
			</button>
		</div>
	);
};
