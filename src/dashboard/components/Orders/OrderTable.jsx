import { useOrders } from "../../hooks/useOrders";
import { Loader } from "../../../landing/components/Loader";
import { OrderRow } from "./OrderRow";
import { OrderCard } from "./OrderCard";
import toast, { Toaster } from "react-hot-toast";

export const OrderTable = () => {
	const { orders, loading, updateStatus } = useOrders();

	const handleStatusChange = async (orderId, newStatus) => {
		try {
			toast.loading("Actualizando estado...");
			await updateStatus(orderId, newStatus);
			toast.dismiss();
			toast.success("Estado actualizado correctamente");
		} catch {
			toast.dismiss();
			toast.error("Error al actualizar el estado");
		}
	};

	if (loading) return <Loader text="Cargando pedidos..." />;
	if (!orders.length) return <p className="text-center mt-4 text-gray-500">No hay pedidos registrados.</p>;

	return (
		<div className="bg-white rounded-xl shadow-md border border-gray-100 mt-6 overflow-hidden">
			<Toaster
				position="top-center"
				toastOptions={{
					style: {
						background: "#07484a",
						color: "#fff",
						borderRadius: "10px",
						fontFamily: "var(--font-landing)",
					},
					success: {
						iconTheme: { primary: "#3a7d3a", secondary: "#fff" },
					},
					error: {
						iconTheme: { primary: "#a23e48", secondary: "#fff" },
					},
				}}
			/>

			{/* Desktop */}
			<div className="hidden md:block overflow-x-auto">
				<table className="min-w-full text-sm">
					<thead className="bg-primary text-white">
						<tr>
							<th className="text-left px-4 py-3 font-medium">Nº Pedido</th>
							<th className="text-left px-4 py-3 font-medium">Fecha</th>
							<th className="text-left px-4 py-3 font-medium">Total (€)</th>
							<th className="text-left px-4 py-3 font-medium">Estado actual</th>
							<th className="text-left px-4 py-3 font-medium">Actualizar estado</th>
							<th className="text-left px-4 py-3 font-medium">Acciones</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{orders.map((order) => (
							<OrderRow
								key={order._id || order.id || order.orderId}
								order={order}
								onChange={handleStatusChange}
							/>
						))}
					</tbody>
				</table>
			</div>

			{/* Mobile */}
			<div className="md:hidden flex flex-col gap-4 p-4">
				{orders.map((order) => (
					<OrderCard
						key={order._id || order.id || order.orderId}
						order={order}
						onChange={handleStatusChange}
					/>
				))}
			</div>
		</div>
	);
};
