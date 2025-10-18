import { useOrders } from "../hooks/useOrders";
import { OrderTable } from "../components/OrderTable";

export const OrdersPage = () => {
	const { orders, updateStatus } = useOrders();

	return (
		<section>
			<h2 className="font-title text-center font-bold text-primary mb-4">Gestión de pedidos</h2>
			<p className="text-gray-600 text-center mb-6">
				Consulta, gestiona y actualiza el estado de los pedidos recibidos.
			</p>

			<OrderTable orders={orders} onUpdate={updateStatus} />
		</section>
	);
};
