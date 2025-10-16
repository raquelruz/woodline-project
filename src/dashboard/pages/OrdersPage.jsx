import { useOrders } from "../hooks/useOrders";
import { OrderTable } from "../components/OrderTable";
import { Loader } from "../../landing/components/Loader";

export const OrdersPage = () => {
	const { orders, loading, updateStatus } = useOrders();

	if (loading) {
		return (
			<section>
				<h2 className="font-title text-center font-bold text-primary mb-6">Gestión de pedidos</h2>
				<p className="text-gray-600 text-center mb-6">
					Consulta, gestiona y actualiza el estado de los pedidos recibidos.
				</p>
				<Loader />
			</section>
		);
	}

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
