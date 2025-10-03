import { SectionContainer } from "../components/SectionContainer";
import handsIcon from "../../assets/icons/payment-icon.png";
import returnIcon from "../../assets/icons/return-icon.png";
import customerIcon from "../../assets/icons/headphone-icon.png";

const benefits = [
	{
		img: handsIcon,
		title: "Métodos de pago",
		description: "Ofrecemos opciones de pago flexibles para hacerlo más fácil",
	},
	{
		img: returnIcon,
		title: "Devoluciones",
		description: "Puedes devolver un producto dentro de 30 días",
	},
	{
		img: customerIcon,
		title: "Atención al cliente",
		description: "Nuestra atención al cliente está disponible 24/7",
	},
];

export const Benefits = () => {
	return (
		<SectionContainer
			bg="bg-primary-ultralight"
			title={<span className="font-title font-semibold text-primary">Nuestros Beneficios</span>}
			childrenContainerStyle="grid grid-cols-1 md:grid-cols-3 gap-8"
		>
			{benefits.map((benefit, index) => (
				<div key={index} className="flex flex-col items-center text-center p-6">
					<img src={benefit.img} alt={benefit.title} className="w-16 h-16 mb-4" />
					<h5 className="font-title font-semibold text-primary mb-2">{benefit.title}</h5>
					<p className="text-gray-600">{benefit.description}</p>
				</div>
			))}
		</SectionContainer>
	);
};
