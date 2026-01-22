import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { memo, useMemo, useContext, useState, useCallback } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useTranslate } from "../../../translations/useTranslate";

const linkClass = "text-primary hover:text-primary-light";

type NavItem = {
	path: string;
	label: string;
}

export const Navbar = memo(() => {
	const { t } = useTranslate();
	const { user } = useContext(AuthContext);
	const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

	const closeMenu = useCallback(() => {
		setMobileMenuOpen(false);
	}, []);

	const desktopLinks = useMemo<NavItem[]>(
		() => [
			{ path: "/", label: t("navigation.home") },
			{ path: "/products", label: t("navigation.products") },
			{ path: "/about", label: t("navigation.about") },
			{ path: "/contact", label: t("navigation.contact") },
		],
		[]
	);

	const mobileLinks = useMemo<NavItem[]>(() => {
		const baseLinks: NavItem[] = [
			{ path: "/", label: t("navigation.home") },
			{ path: "/products", label: t("navigation.products") },
			{ path: "/about", label: t("navigation.about") },
			{ path: "/contact", label: t("navigation.contact") },
		];

		if (user?.role === "admin") {
			baseLinks.push({ path: "/dashboard", label: t("navigation.dashboard") });
		}

		return baseLinks;
	}, [user?.role]);

	return (
		<nav className="w-full px-6 md:px-10 py-3 flex items-center justify-center">
			{/* DESKTOP MENU */}
			<div className="hidden md:flex gap-8 items-center font-medium font-title text-primary">
				{desktopLinks.map((link) => (
					<NavLink
						key={link.path}
						to={link.path}
						className={({ isActive }) =>
							isActive ? "text-primary font-semibold border-b-2 border-primary" : linkClass
						}
					>
						{link.label}
					</NavLink>
				))}

				{/* ADMINS */}
				{user?.role === "admin" && (
					<NavLink
						to="/dashboard"
						className={({ isActive }) =>
							isActive
								? "text-primary font-semibold border-b-2 border-primary"
								: "hover:text-primary-light"
						}
					>
						{t("navigation.dashboard")}
					</NavLink>
				)}
			</div>

			{/* BOTÓN MOBILE */}
			<div className="md:hidden">
				<button
					onClick={() => setMobileMenuOpen((prev) => !prev)}
					className="text-primary"
					aria-label="Toggle menu"
				>
					{isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
				</button>
			</div>

			{/* MOBILE MENU */}
			{isMobileMenuOpen && (
				<div className="absolute top-14 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 md:hidden z-50">
					{mobileLinks.map((link) => (
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
});
