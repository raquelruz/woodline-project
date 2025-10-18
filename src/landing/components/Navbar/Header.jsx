import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../../assets/images/woodline-logo.png";
import { Container } from "../Container.jsx";
import { Navbar } from "./Navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext.jsx";
import { LogoutButton } from "../Buttons/LogoutButton.jsx";

const linkBg = "text-primary hover:text-primary-light cursor-pointer transition-all p-1 rounded-full hover:bg-primary-ultralight"

export const Header = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

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
						<Link to={user ? "/profile" : "/login"} title="Mi cuenta" className={linkBg}>
							<FaUser className="text-xl" />
						</Link>

						<Link to="/cart" title="Mi carrito" className={linkBg}>
							<FaShoppingCart className="text-xl" />
						</Link>

						{user && <LogoutButton variant="icon" />}
					</div>
				</div>
			</Container>
		</header>
	);
};
