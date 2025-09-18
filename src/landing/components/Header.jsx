import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../assets/images/woodline-logo.png";
import { Container } from "./Container";
import { Navbar } from "./Navbar";

export const Header = () => {
	return (
		<header className="shadow-md">
			<Container>
				<div className="h-16 flex items-center justify-between">
					<img src={logo} alt="logo" className="h-12" />

					<Navbar />

					<div className="flex items-center gap-6 text-gray-700 text-lg">
						<FaSearch className="hover:text-primary-hover cursor-pointer" />
						<FaUser className="hover:text-primary-hover cursor-pointer" />
						<FaShoppingCart className="hover:text-primary-hover cursor-pointer" />
					</div>
				</div>
			</Container>
		</header>
	);
};
