import { Link } from "react-router-dom";
import logo from "../../assets/images/woodline-logo.png";
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { useMemo } from "react";
import { useTranslate } from "../../translations/useTranslate";
import type { IconType } from "react-icons";

type FooterLink = {
	name: string;
	to: string;
};

type FooterSection = {
	title: string;
	links: FooterLink[];
};

type SocialLink = {
	Icon: IconType;
	url: string;
	label: string;
};

export const Footer = () => {
	const { t } = useTranslate();

	const sections = useMemo<FooterSection[]>(
		() => [
			{
				title: t("pages.home.my_account"),
				links: [
					{ name: t("auth.login"), to: "/login" },
					{ name: t("auth.register"), to: "/register" },
					{ name: t("auth.my_profile"), to: "/profile" },
				],
			},
			{
				title: t("pages.home.help"),
				links: [
					{ name: t("pages.home.shipments"), to: "/shipping" },
					{ name: t("pages.home.returns"), to: "/returns" },
					{ name: t("orders.orders"), to: "/delivery-time" },
				],
			},
			{
				title: t("pages.home.shop"),
				links: [
					{ name: t("products.all_products"), to: "/products" },
					{ name: t("products.bedroom"), to: "/products?category=dormitorio" },
					{ name: t("products.living_room"), to: "/products?category=salon" },
				],
			},
			{
				title: t("pages.home.legal"),
				links: [
					{ name: t("pages.home.terms"), to: "/terms" },
					{ name: t("pages.home.privacy_policy"), to: "/privacy" },
					{ name: t("pages.home.cookies"), to: "/cookies" },
				],
			},
		],
		[t],
	);

	const socialLinks = useMemo<SocialLink[]>(
		() => [
			{ Icon: FaFacebook, url: "https://facebook.com", label: "Facebook" },
			{ Icon: FaInstagram, url: "https://instagram.com", label: "Instagram" },
			{ Icon: FaLinkedin, url: "https://linkedin.com", label: "LinkedIn" },
			{ Icon: FaTwitter, url: "https://twitter.com", label: "Twitter" },
		],
		[],
	);

	const socialLinksMemoized = useMemo(
		() =>
			socialLinks.map(({ Icon, url, label }) => (
				<a
					key={label}
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={label}
					className="text-primary-pressed hover:text-primary transition-all"
				>
					<Icon className="text-xl" />
				</a>
			)),
		[socialLinks],
	);

	const sectionsMemoized = useMemo(
		() =>
			sections.map((section) => (
				<div key={section.title}>
					<p className="font-semibold mb-2 text-primary-pressed">{section.title}</p>
					{section.links.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							className="block text-xs text-primary-pressed hover:text-primary transition-colors mb-1"
						>
							{link.name}
						</Link>
					))}
				</div>
			)),
		[sections],
	);

	return (
		<footer className="bg-gray-100 py-12 px-6 border-t border-gray-200">
			<div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10">
				<div>
					<img src={logo} alt="logo" className="h-16 mb-4" />
					<div className="flex gap-4 mb-4">{socialLinksMemoized}</div>
					<div className="text-xs text-primary-pressed">
						<p className="font-semibold">{t("auth.address")}</p>
						<p>+34 123 456 789</p>
						<p>Jerez de la Frontera, Cádiz, España</p>
					</div>
				</div>

				{sectionsMemoized}
			</div>

			<div className="pt-10 text-center border-t border-gray-200 mt-10">
				<p className="text-xs text-primary-pressed">
					Copyright © {new Date().getFullYear()} Raquel Ruz — Inspired by Figma Design with{" "}
					<span className="text-primary">♥</span>
				</p>
			</div>
		</footer>
	);
};
