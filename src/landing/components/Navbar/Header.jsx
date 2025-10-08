import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../../assets/images/woodline-logo.png";
import { Container } from "../Container.jsx";
import { Navbar } from "./Navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext.jsx";
import { LogoutButton } from "../Buttons/LogoutButton.jsx";

const iconClass = "text-primary hover:text-primary-light cursor-pointer transition-all";

export const Header = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const [searchOpen, setSearchOpen] = useState(false);
	const [query, setQuery] = useState("");

	function handleSearch(event) {
		event.preventDefault();
		if (query.trim()) {
			navigate(`/products?search=${encodeURIComponent(query)}`);
			setSearchOpen(false);
			setQuery("");
		}
	}

	return (
		<header className="shadow-md relative bg-white">
			<Container>
				<div className="h-16 px-4 flex items-center justify-between">
					<img
						src={logo}
						alt="logo"
						className="h-12 cursor-pointer"
						onClick={() => navigate("/")}
					/>

					<Navbar />

					<div className="flex items-center gap-6 text-gray-700 text-lg">
						<FaSearch
							className={iconClass}
							onClick={() => setSearchOpen((prev) => !prev)}
							title="Buscar productos"
						/>

						<Link to={user ? "/profile" : "/login"} title="Mi cuenta">
							<FaUser className={iconClass} />
						</Link>

						<Link to="/cart" title="Mi carrito">
							<FaShoppingCart className={iconClass} />
						</Link>

						{user && <LogoutButton variant="icon" />}
					</div>
				</div>

				{/* Barra de búsqueda en mobile */}
				{searchOpen && (
					<div className="md:hidden px-4 pb-3">
						<form onSubmit={handleSearch} className="flex items-center gap-2">
							<div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-primary transition">
								<FaSearch className="text-gray-400 mr-2" />
								<input
									type="text"
									value={query}
									onChange={(event) => setQuery(event.target.value)}
									placeholder="Buscar productos..."
									className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
								/>
							</div>
						</form>
					</div>
				)}

				{/* Barra de búsqueda en desktop */}
				{searchOpen && (
					<form
						onSubmit={handleSearch}
						className="hidden md:flex absolute right-2 top-14 items-center w-96 bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-full px-4 py-2 z-50"
					>
						<FaSearch className="text-gray-400 mr-2" />
						<input
							type="text"
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Buscar productos..."
							className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
						/>
						<button
							type="submit"
							className="ml-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-light transition"
						>
							Buscar
						</button>
					</form>
				)}
			</Container>
		</header>
	);
};
