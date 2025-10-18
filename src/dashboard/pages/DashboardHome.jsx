import { StatCard } from "../components/StatCard";
import { dashboardStats } from "../data/dashboardData";

export const DashboardHome = () => {
	return (
		<section>
			<h1 className="text-3xl font-bold text-primary mb-6">Panel de control</h1>

			<p className="text-gray-600">
				Bienvenido al panel de administración de <strong>Woodline Living</strong>. Aquí podras gestionar
				productos, reseñas y usuarios.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<StatCard title="Productos activos" value={dashboardStats.products} />
				<StatCard title="Usuarios registrados" value={dashboardStats.users} />
				<StatCard title="Reseñas totales" value={dashboardStats.reviews} />
			</div>
		</section>
	);
};
