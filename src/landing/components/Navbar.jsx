import { NavLink } from "react-router-dom";
import logo from "../../assets/images/woodline-logo.png";
import { FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export const Navbar = () => {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<nav className="w-full shadow-md px-6 md:px-10 py-3 flex items-center justify-between">

			<div className="flex items-center">
				<img src={logo} alt="logo" className="h-12" />
			</div>

			{/* MENÚ DESKTOP */}
			<div className="hidden md:flex gap-8 font-medium font-title color-contrast">
				<NavLink to="/" className={({ isActive }) => (isActive ? "text-primary-pressed" : "hover:text-primary")}>
					Inicio
				</NavLink>
				<NavLink to="/products" className="hover:text-primary">
					Productos
				</NavLink>
				<NavLink to="/categories" className="hover:text-primary">
					Categorías
				</NavLink>
				<NavLink to="/about" className="hover:text-primary">
					Sobre nosotros
				</NavLink>
				<NavLink to="/contact" className="hover:text-primary">
					Contacto
				</NavLink>
                
			</div>

				{/* MENÚ MOBILE */}
				<div className="md:hidden ml-2">
					<button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
						{isMobileMenuOpen ? <FaTimes /> : <FaBars />}
					</button>
				</div>

			<div className="flex items-center gap-6 text-gray-700 text-lg">
				<FaSearch className="hover:text-primary-hover cursor-pointer" />
				<FaUser className="hover:text-primary-hover cursor-pointer" />
				<FaShoppingCart className="hover:text-primary-hover cursor-pointer" />
			</div>

			{isMobileMenuOpen && (
				<div className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 md:hidden z-10">
					<NavLink
						to="/"
						onClick={() => setMobileMenuOpen(false)}
						className="py-2 text-gray-700 hover:text-primary-hover"
					>
						Inicio
					</NavLink>
					<NavLink
						to="/products"
						onClick={() => setMobileMenuOpen(false)}
						className="py-2 text-gray-700 hover:text-primary-hover"
					>
						Productos
					</NavLink>
					<NavLink
						to="/categories"
						onClick={() => setMobileMenuOpen(false)}
						className="py-2 text-gray-700 hover:text-primary-hover"
					>
						Categorías
					</NavLink>
					<NavLink
						to="/about"
						onClick={() => setMobileMenuOpen(false)}
						className="py-2 text-gray-700 hover:text-primary-hover"
					>
						Sobre nosotros
					</NavLink>
					<NavLink
						to="/contact"
						onClick={() => setMobileMenuOpen(false)}
						className="py-2 text-gray-700 hover:text-primary-hover"
					>
						Contacto
					</NavLink>
				</div>
			)}
		</nav>
	);
};
