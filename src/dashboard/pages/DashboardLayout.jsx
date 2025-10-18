import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { LogoutButton } from "../../landing/components/Buttons/LogoutButton";
import { MdMenu, MdClose, MdHome, MdShoppingBag, MdInventory, MdPeople } from "react-icons/md";

export const DashboardLayout = () => {
	const [open, setOpen] = useState(false);

	const navItems = [
		{ to: "/dashboard", label: "Inicio", icon: <MdHome /> },
		{ to: "/dashboard/orders", label: "Pedidos", icon: <MdShoppingBag /> },
		{ to: "/dashboard/products", label: "Productos", icon: <MdInventory /> },
		{ to: "/dashboard/users", label: "Usuarios", icon: <MdPeople /> },
	];

	return (
		<div className="flex min-h-screen bg-gray-50">
			{/* DESKTOP */}
			<aside
				className={`fixed md:static top-0 left-0 h-full w-60 bg-white shadow-md p-6 z-40 transition-transform duration-300 ${
					open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
				}`}
			>
				<div className="flex justify-between items-center mb-6">
					<p className="text-xl font-title font-bold text-primary">Woodline Admin</p>
					<button className="md:hidden" onClick={() => setOpen(false)}>
						<MdClose size={24} />
					</button>
				</div>

				<nav className="flex flex-col gap-4 text-gray-700 font-medium">
					{navItems.map(({ to, label, icon }) => (
						<Link
							key={to}
							to={to}
							onClick={() => setOpen(false)}
							className="flex items-center gap-3 hover:text-primary transition"
						>
							{icon}
							{label}
						</Link>
					))}

					<div className="mt-6">
						<LogoutButton />
					</div>
				</nav>
			</aside>

			{/* MOBILE */}
			{open && (
				<div
					className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
					onClick={() => setOpen(false)}
				/>
			)}

			<main className="flex-1 p-6 md:p-8 overflow-y-auto">
				<button
					className="md:hidden text-gray-600 hover:text-primary mb-4"
					onClick={() => setOpen(true)}
				>
					<MdMenu size={28} />
				</button>

				<Outlet />
			</main>
		</div>
	);
};
