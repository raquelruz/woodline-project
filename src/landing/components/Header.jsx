import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../assets/images/woodline-logo.png";
import { Container } from "./Container";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
	const { user } = useContext(AuthContext);

	return (
		<header className="shadow-md">
			<Container>
				<div className="h-16 pr-4 pl-4 flex items-center justify-between">
					<img src={logo} alt="logo" className="h-12" />

					<Navbar />

					<div className="flex items-center gap-6 text-gray-700 text-lg">
						<FaSearch className="hover:text-primary-hover cursor-pointer" />

						<Link to={user ? "/profile" : "/login"}>
							<FaUser className="hover:text-primary-hover cursor-pointer" />
						</Link>

						<Link to="/cart">
						<FaShoppingCart className="hover:text-primary-hover cursor-pointer" />
						</Link>
					</div>
				</div>
			</Container>
		</header>
	);
};
