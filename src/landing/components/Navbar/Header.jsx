import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../../assets/images/woodline-logo.png";
import { Container } from "../Container.jsx";
import { Navbar } from "./Navbar.jsx";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext.jsx";

const iconClass = "text-primary hover:text-primary-light cursor-pointer";

export const Header = () => {
	const { user } = useContext(AuthContext);

	return (
		<header className="shadow-md">
			<Container>
				<div className="h-16 pr-4 pl-4 flex items-center justify-between">
					<img src={logo} alt="logo" className="h-12" />

					<Navbar />

					<div className="flex items-center gap-6 text-gray-700 text-lg">
						<FaSearch className={iconClass} />

						<Link to={user ? "/profile" : "/login"}>
							<FaUser className={iconClass} />
						</Link>

						<Link to="/cart">
						<FaShoppingCart className={iconClass}  />
						</Link>
					</div>
				</div>
			</Container>
		</header>
	);
};
