import { NavLink } from "react-router-dom"
import logo from "../../assets/images/woodline-logo.png"
import { FaSearch, FaUser, FaShoppingCart, FaBars } from "react-icons/fa";

export const Navbar = () => {
    return (
        <nav className="w-full flex flex-row items-center justify-between shadow-sm">
            <div className="flex y-4 px-6 md:px-4">
                <img src={logo} alt="logo" className="h-16"/>
            </div>

            <div className="hidden md:flex gap-10">
                <NavLink to="/">Home</NavLink>
                {/* <NavLink to="/products">Products</NavLink>
                <NavLink to="/categories">Categorías</NavLink>
                <NavLink to="/about">Sobre nosotros</NavLink>
                <Navlink to="/contact">Contacto</Navlink> */}
            </div>

            <div className="flex flex-row gap-8 md:pr-4">
                <FaSearch />
                <FaUser />
                <FaShoppingCart />
            </div>
        </nav>
    )
}