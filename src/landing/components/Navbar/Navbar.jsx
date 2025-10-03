import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { LogoutButton } from "../Buttons/LogoutButton"

const linkClass = "text-primary hover:text-primary-light"

export const Navbar = () => {
	const { user } = useContext(AuthContext);
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<nav className="w-full px-6 md:px-10 py-3 flex items-center justify-center" >

			{/* MENU DESKTOP */}
			<div className="hidden md:flex gap-8 items-center font-medium font-title text-primary">
				<NavLink
					to="/"
					className={({ isActive }) => (isActive ? "text-primary" : "hover:text-primary-light")}
				>
					Inicio
				</NavLink>
				<NavLink to="/products" className={linkClass}>
					Productos
				</NavLink>
				<NavLink to="/about" className={linkClass}>
					Sobre nosotros
				</NavLink>
				<NavLink to="/contact" className={linkClass}>
					Contacto
				</NavLink>
				
				{!isMobileMenuOpen && <LogoutButton />}
			</div>

			{/* MENÚ MOBILE */}

			<div className="md:hidden ml-2">
				<button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
					{isMobileMenuOpen ? <FaTimes /> : <FaBars />}
				</button>
			</div>

			{isMobileMenuOpen && (
				<div className="absolute top-10 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 md:hidden z-10">
					<NavLink
						to="/"
						onClick={() => setMobileMenuOpen(false)}
						className="py-2 text-gray-700 hover:text-primary"
					>
						Inicio
					</NavLink>

					<NavLink
						to="/products"
						onClick={() => setMobileMenuOpen(false)}
						className="py-2 text-gray-700 hover:text-primary"
					>
						Productos
					</NavLink>

					<NavLink
						to="/about"
						onClick={() => setMobileMenuOpen(false)}
						className="py-2 text-gray-700 hover:text-primary"
					>
						Sobre nosotros
					</NavLink>

					<NavLink
						to="/contact"
						onClick={() => setMobileMenuOpen(false)}
						className="py-2 text-gray-700 hover:text-primary"
					>
						Contacto
					</NavLink>

					{user && (
						<div className="mt-4">
							<LogoutButton />
						</div>
					)}
				</div>
			)}
		</nav>
	);
};
