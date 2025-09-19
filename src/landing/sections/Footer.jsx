import logo from "../../assets/images/woodline-logo.png";
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

export const Footer = () => {
	const sections = [
		{ title: "Mi cuenta", links: ["Iniciar sesión", "Registro", "Pedidos"] },
		{ title: "Ayuda", links: ["Envíos", "Devoluciones", "Tiempo de entrega"] },
		{ title: "Tienda", links: ["Todos los productos", "Dormitorio", "Salón"] },
		{ title: "Legal", links: ["Términos y Condiciones", "Política de privacidad", "Cookies"] },
	];

	const socialIcons = [FaFacebook, FaInstagram, FaLinkedin, FaTwitter];

	return (
		<footer className="bg-gray-100 py-8 px-6">
			<div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
				<div>
					<img src={logo} alt="logo" className="h-8 mb-4" />
					<div className="flex gap-4 mb-4">
						{socialIcons.map((Icon, idx) => (
							<Icon key={idx} className="text-primary-pressed hover:text-primary cursor-pointer" />
						))}
					</div>
					<div className="text-xs text-primary-pressed">
						<p className="font-semibold">Dirección</p>
						<p>+123 456 789</p>
						<p>123, Cádiz, España</p>
					</div>
				</div>

                {/* FOOTER LINKS */}
				{sections.map((section, idx) => (
					<div key={idx}>
						<p className="font-semibold mb-2 text-primary-pressed">{section.title}</p>
						{section.links.map((link, linkIdx) => (
							<p key={linkIdx} className="text-xs text-primary-pressed hover:text-primary cursor-pointer">
								{link}
							</p>
						))}
					</div>
				))}
			</div>

            <div className="py-8">
                    <p className="text-xs text-primary-pressed">Copyright © raquelruz inspired in Figma Design with ♥</p>
                </div>
		</footer>
	);
};
