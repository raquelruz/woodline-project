import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
	return (
		<div className="flex min-h-screen bg-gray-50">
			<aside className="w-64 bg-white shadow-md p-6">
				<h2 className="text-2xl font-bold text-primary mb-6">Woodline Admin</h2>
				<nav className="flex flex-col gap-3 text-gray-600 font-medium">
					<a href="/dashboard">Inicio</a>
					<a href="/dashboard/products">Productos</a>
					<a href="/dashboard/reviews">Reseñas</a>
					<a href="/dashboard/users">Usuarios</a>
				</nav>
			</aside>

			<main className="flex-1 p-8 overflow-y-auto">
				<Outlet />
			</main>
		</div>
	);
};
