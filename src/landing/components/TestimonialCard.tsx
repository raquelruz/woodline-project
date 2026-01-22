import { memo } from "react";
import { FaQuoteLeft } from "react-icons/fa";

type TestimonialCard = {
	quote: string;
	img: string;
	name: string;
	role: string;
}

type TestimonialCardProp = {
	testimonial: TestimonialCard;
}

export const TestimonialCard = memo(({ testimonial }: TestimonialCardProp) => {
	return (
		<div className="min-w-full flex flex-col items-center justify-center text-center px-8 md:px-20">
			<div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-10 md:p-14 border border-primary/10 transition-transform duration-500 hover:-translate-y-2">
				<FaQuoteLeft className="absolute top-6 left-8 text-primary-light text-5xl opacity-30" />

				<p className="text-lg text-gray-700 leading-relaxed italic mb-10">
					“{testimonial.quote}”
				</p>

				<div className="flex flex-col items-center">
					<div className="relative">
						<img
							src={testimonial.img}
							alt={testimonial.name}
							className="w-24 h-24 rounded-full object-cover border-4 border-primary-light shadow-md"
						/>
						<span className="absolute bottom-1 right-1 w-3 h-3 bg-primary rounded-full border-2 border-white"></span>
					</div>
					<p className="mt-4 text-lg font-semibold text-primary">{testimonial.name}</p>
					<p className="text-sm text-gray-500">{testimonial.role}</p>
				</div>
			</div>
		</div>
	);
});