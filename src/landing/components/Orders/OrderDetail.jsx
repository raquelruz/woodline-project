import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrdersApi } from "../../../core/orders/orders.api";
import { Loader } from "../Loader";
import { OrderInfoCard } from "./OrderInfoCard";
import { OrderProductList } from "./OrderProductList";
import { OrderHeader } from "./OrderHeader";
import { BackButton } from "../Buttons/BackButton";
import { formatOrderId, translateStatus, getStatusClass,formatDate } from "../../../dashboard/utils/orderUtils";
import { IoCalendarOutline, IoCashOutline, IoInformationCircleOutline, IoCubeOutline } from "react-icons/io5";

export const OrderDetail = () => {
	const { id } = useParams();
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchOrder() {
			try {
				const response = await getOrdersApi();
				const pedidos = Array.isArray(response) ? response : response.data || [];
				const found = pedidos.find((pedido) => pedido._id === id || pedido.id === id);
				setOrder(found || null);
			} catch (error) {
				console.error("Error al obtener pedido:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchOrder();
	}, [id]);

	if (loading) return <Loader text="Cargando pedido..." />;
	if (!order)
		return <p className="text-error text-center mt-10">Pedido no encontrado.</p>;

	const formattedDate = formatDate(order.createdAt);
	const orderId = formatOrderId(order._id || order.id);
	const statusLabel = translateStatus(order.status);
	const statusClass = getStatusClass(order.status);

	return (
		<section className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-md border border-gray-100 mt-6">
			<OrderHeader orderId={orderId} />

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
				<OrderInfoCard
					icon={<IoCalendarOutline className="text-primary text-2xl" />}
					label="Fecha"
					value={formattedDate}
				/>
				<OrderInfoCard
					icon={<IoCashOutline className="text-primary text-2xl" />}
					label="Total"
					value={`${order.total} €`}
				/>
				<OrderInfoCard
					icon={<IoInformationCircleOutline className="text-primary text-2xl" />}
					label="Estado"
					value={<span className={statusClass}>{statusLabel}</span>}
				/>
			</div>

			<div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
				<h2 className="font-title font-semibold text-xl text-gray-800 mb-4 flex items-center gap-2">
					<IoCubeOutline className="text-primary text-2xl" />
					Productos del pedido
				</h2>
				<OrderProductList items={order.items} />
			</div>

			<BackButton />
		</section>
	);
};
