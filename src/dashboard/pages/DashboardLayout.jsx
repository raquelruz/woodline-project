import { Outlet } from "react-router-dom";
import { LogoutButton } from "../../landing/components/Buttons/LogoutButton";

export const DashboardLayout = () => {
	return (
		<div className="flex min-h-screen bg-gray-50">
			<aside className="w-40 md:w-64 bg-white shadow-md p-6">
				<p className="text-lg font-title md:text-xl font-bold text-primary mb-6">Woodline Admin</p>
				<nav className="flex flex-col gap-3 text-gray-600 font-medium">
					<a href="/dashboard">Inicio</a>
					<a href="/dashboard/products">Productos</a>
					<a href="/dashboard/users">Usuarios</a>
					
					<LogoutButton />
				</nav>
			</aside>

			<main className="flex-1 p-8 overflow-y-auto">
				<Outlet />
			</main>
		</div>
	);
};
