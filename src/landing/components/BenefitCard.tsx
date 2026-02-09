type BenefitCardProps = {
	img: string;
	title: string;
	description: string;
};

export const BenefitCard = ({ img, title, description }: BenefitCardProps) => {
	return (
		<div className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 p-8 flex flex-col items-center text-center hover:-translate-y-2">
			<div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-tr from-primary to-primary-light mb-6 shadow-md">
				<img src={img} alt={title} className="w-10 h-10" />
			</div>

			<h5 className="text-xl font-title font-semibold text-primary mb-2">{title}</h5>

			<p className="text-gray-600 font-landing leading-relaxed">{description}</p>
		</div>
	);
};
