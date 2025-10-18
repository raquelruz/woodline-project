import { Link } from "react-router-dom";
import logo from "../../assets/images/woodline-logo.png";
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

export const Footer = () => {
	const sections = [
		{
			title: "Mi cuenta",
			links: [
				{ name: "Iniciar sesión", to: "/login" },
				{ name: "Registro", to: "/register" },
				{ name: "Pedidos", to: "/profile" },
			],
		},
		{
			title: "Ayuda",
			links: [
				{ name: "Envíos", to: "/help/envios" },
				{ name: "Devoluciones", to: "/help/devoluciones" },
				{ name: "Tiempo de entrega", to: "/help/tiempo-entrega" },
			],
		},
		{
			title: "Tienda",
			links: [
				{ name: "Todos los productos", to: "/products" },
				{ name: "Dormitorio", to: "/products?category=dormitorio" },
				{ name: "Salón", to: "/products?category=salon" },
			],
		},
		{
			title: "Legal",
			links: [
				{ name: "Términos y Condiciones", to: "/legal/terminos" },
				{ name: "Política de privacidad", to: "/legal/privacidad" },
				{ name: "Cookies", to: "/legal/cookies" },
			],
		},
	];

	const socialLinks = [
		{ Icon: FaFacebook, url: "https://facebook.com", label: "Facebook" },
		{ Icon: FaInstagram, url: "https://instagram.com", label: "Instagram" },
		{ Icon: FaLinkedin, url: "https://linkedin.com", label: "LinkedIn" },
		{ Icon: FaTwitter, url: "https://twitter.com", label: "Twitter" },
	];

	return (
		<footer className="bg-gray-100 py-12 px-6 border-t border-gray-200">
			<div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10">
				<div>
					<img src={logo} alt="logo" className="h-10 mb-4" />
					<div className="flex gap-4 mb-4">
						{socialLinks.map(({ Icon, url, label }, idx) => (
							<a
								key={idx}
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={label}
								className="text-primary-pressed hover:text-primary transition-all"
							>
								<Icon className="text-xl" />
							</a>
						))}
					</div>
					<div className="text-xs text-primary-pressed">
						<p className="font-semibold">Dirección</p>
						<p>+34 123 456 789</p>
						<p>Jerez de la Frontera, Cádiz, España</p>
					</div>
				</div>

				{sections.map((section, idx) => (
					<div key={idx}>
						<p className="font-semibold mb-2 text-primary-pressed">
							{section.title}
						</p>
						{section.links.map((link, linkIdx) => (
							<Link
								key={linkIdx}
								to={link.to}
								className="block text-xs text-primary-pressed hover:text-primary transition-colors mb-1"
							>
								{link.name}
							</Link>
						))}
					</div>
				))}
			</div>

			<div className="pt-10 text-center border-t border-gray-200 mt-10">
				<p className="text-xs text-primary-pressed">
					Copyright © {new Date().getFullYear()} Raquel Ruz — Inspired by Figma
					Design with <span className="text-primary">♥</span>
				</p>
			</div>
		</footer>
	);
};
