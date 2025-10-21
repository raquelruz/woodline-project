import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const linkClass = "text-primary hover:text-primary-light ";

export const Navbar = () => {
	const { user } = useContext(AuthContext);
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

	const closeMenu = () => setMobileMenuOpen(false);

	return (
		<nav className="w-full px-6 md:px-10 py-3 flex items-center justify-center">
			{/* MENU DESKTOP */}
			<div className="hidden md:flex gap-8 items-center font-medium font-title text-primary">
				<NavLink
					to="/"
					className={({ isActive }) => (isActive ? "text-primary font-semibold border-b-2" : linkClass)}
				>
					Inicio
				</NavLink>
				<NavLink
					to="/products"
					className={({ isActive }) => (isActive ? "text-primary font-semibold border-b-2" : linkClass)}
				>
					Productos
				</NavLink>
				<NavLink
					to="/about"
					className={({ isActive }) => (isActive ? "text-primary font-semibold border-b-2" : linkClass)}
				>
					Sobre nosotros
				</NavLink>
				<NavLink
					to="/contact"
					className={({ isActive }) => (isActive ? "text-primary font-semibold border-b-2" : linkClass)}
				>
					Contacto
				</NavLink>
				{/* DASHBOARD SOLO ADMINS */}
				{user?.role === "admin" && (
					<NavLink
						to="/dashboard"
						className={({ isActive }) =>
							isActive
								? "text-primary font-semibold border-b-2 border-primary"
								: "hover:text-primary-light"
						}
					>
						Panel de control
					</NavLink>
				)}
			</div>

			{/* MENÚ MOBILE */}
			<div className="md:hidden">
				<button
					onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
					className="text-primary focus:outline-none"
					aria-label="Toggle menu"
				>
					{isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
				</button>
			</div>

			{isMobileMenuOpen && (
				<div className="absolute top-14 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 md:hidden z-50">
					{[
						{ path: "/", label: "Inicio" },
						{ path: "/products", label: "Productos" },
						{ path: "/about", label: "Sobre nosotros" },
						{ path: "/contact", label: "Contacto" },
						user?.role === "admin" && { path: "/dashboard", label: "Panel de control" },
					]
						.filter(Boolean)
						.map((link) => (
							<NavLink
								key={link.path}
								to={link.path}
								onClick={closeMenu}
								className="py-2 text-gray-700 hover:text-primary w-full text-center border-b border-gray-100"
							>
								{link.label}
							</NavLink>
						))}
				</div>
			)}
		</nav>
	);
};