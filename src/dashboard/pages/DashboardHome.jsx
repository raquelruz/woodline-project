import { useEffect, useState } from "react";
import { api } from "../../core/http/axios";
import { StatCard } from "../components/StatCard";
import { Loader } from "../../landing/components/Loader";

export const DashboardHome = () => {
	const [stats, setStats] = useState({ products: 0, users: 0, orders: 0 });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		fetchDashboardStats();
	}, []);

	const fetchDashboardStats = async () => {
		try {
			setLoading(true);
			setError("");

			const [productsRes, usersRes, ordersRes] = await Promise.all([
				api.get("/products"),
				api.get("/users"),
				api.get("/orders"),
			]);

			setStats({
				products: Array.isArray(productsRes.data) ? productsRes.data.length : 0,
				users: Array.isArray(usersRes.data) ? usersRes.data.length : 0,
				orders: Array.isArray(ordersRes.data) ? ordersRes.data.length : 0,
			});
		} catch (error) {
			// console.error("Error al cargar estadísticas:", error);
			setError("No se pudieron cargar los datos del panel. Inténtalo más tarde.");
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<section className="flex flex-col items-center justify-center text-center">
				<h1 className="font-title text-3xl font-bold text-primary mb-3">Panel de control</h1>
				<p className="text-gray-600">
					Bienvenido al panel de administración de <strong>Woodline Living</strong>. Aquí podrás gestionar
					productos, pedidos y usuarios.
				</p>
				<Loader text="Cargando estadísticas..." />
			</section>
		);
	}

	return (
		<section>
			<div className="text-center mb-8">
				<h1 className="font-title text-3xl font-bold text-primary mb-3">Panel de control</h1>
				<p className="text-gray-600">
					Bienvenido al panel de administración de <strong>Woodline Living</strong>. Aquí podrás gestionar
					productos, pedidos y usuarios.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
				<StatCard title="Productos activos" value={stats.products} />
				<StatCard title="Usuarios registrados" value={stats.users} />
				<StatCard title="Pedidos totales" value={stats.orders} />
			</div>
		</section>
	);
};
