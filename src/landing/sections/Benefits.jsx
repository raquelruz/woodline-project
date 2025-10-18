import handsIcon from "../../assets/icons/payment-icon.png";
import returnIcon from "../../assets/icons/return-icon.png";
import customerIcon from "../../assets/icons/headphone-icon.png";

const benefits = [
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
];

export const Benefits = () => {
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
					<div
						key={index}
						className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 p-8 flex flex-col items-center text-center hover:-translate-y-2"
					>
						<div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-tr from-primary to-primary-light mb-6 shadow-md">
							<img src={benefit.img} alt={benefit.title} className="w-10 h-10" />
						</div>

						<h5 className="text-xl font-title font-semibold text-primary mb-2">{benefit.title}</h5>

						<p className="text-gray-600 font-landing leading-relaxed">{benefit.description}</p>
					</div>
				))}
			</div>
		</section>
	);
};
