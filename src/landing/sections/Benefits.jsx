import handsIcon from "../../assets/icons/payment-icon.png";
import returnIcon from "../../assets/icons/return-icon.png";
import customerIcon from "../../assets/icons/headphone-icon.png";
import { BenefitCard } from "../components/BenefitCard";
import { useMemo } from "react";

export const Benefits = () => {
	const benefits = useMemo(
		() => [
			{
				img: handsIcon,
				title: "Métodos de pago",
				description: "Ofrecemos opciones de pago flexibles para hacerlo más fácil.",
			},
			{
				img: returnIcon,
				title: "Devoluciones",
				description: "Puedes devolver un producto dentro de los 30 días posteriores a la compra.",
			},
			{
				img: customerIcon,
				title: "Atención al cliente",
				description: "Nuestro equipo está disponible 24/7 para ayudarte en lo que necesites.",
			},
		],
		[]
	);

	console.log("RENDER BENEFIT")

	return (
		<section className="py-24 bg-primary-ultralight">
			<div className="text-center mb-16">
				<h2 className="text-4xl font-title font-extrabold text-gray-800">
					<span className="text-primary">Nuestros Beneficios</span>
				</h2>
				<p className="text-gray-500 mt-3">
					Disfruta de una experiencia de compra segura, fácil y sin complicaciones.
				</p>
			</div>

			<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
				{benefits.map((benefit, index) => (
					<BenefitCard key={index} img={benefit.img} title={benefit.title} description={benefit.description} />
				))}
			</div>
		</section>
	);
};
