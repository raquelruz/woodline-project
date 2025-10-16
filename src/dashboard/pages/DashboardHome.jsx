import { useEffect, useState } from "react";
import { api } from "../../core/http/axios";
import { StatCard } from "../components/StatCard";

export const DashboardHome = () => {
	const [stats, setStats] = useState({
		products: 0,
		users: 0,
		reviews: 0,
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchDashboardStats();
	}, []);

	const fetchDashboardStats = async () => {
		try {
			setLoading(true);

			const productsRes = await api.get("/products");
			const products = Array.isArray(productsRes.data) ? productsRes.data : [];

			const usersRes = await api.get("/users");
			const users = Array.isArray(usersRes.data) ? usersRes.data : [];

			setStats({
				products: products.length,
				users: users.length,
			});
		} catch (error) {
			console.error("Error al cargar estadísticas:", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<section>
				<h1 className="font-title text-center font-bold text-primary mb-6">Panel de control</h1>
				<p className="text-gray-600 text-center mb-8">
					Bienvenido al panel de administración de <strong>Woodline Living</strong>.  
					Aquí podrás gestionar productos, reseñas y usuarios.
				</p>
				<p className="text-gray-500">Cargando estadísticas...</p>
			</section>
		);
	}

	return (
		<section>
			<h1 className="font-title text-center font-bold text-primary mb-6">Panel de control</h1>
			<p className="text-gray-600 text-center mb-8">
				Bienvenido al panel de administración de <strong>Woodline Living</strong>.  
				Aquí podrás gestionar productos, reseñas y usuarios.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<StatCard title="Productos activos" value={stats.products} />
				<StatCard title="Usuarios registrados" value={stats.users} />
			</div>
		</section>
	);
};
