import { useState, useMemo, memo, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TestimonialCard } from "../components/TestimonialCard";
import { TESTIMONIALS } from "../../helpers/testimonials";
import { useTranslate } from "../../translations/useTranslate";

export const Testimonials = memo(() => {
	const { t } = useTranslate();
	const [current, setCurrent] = useState<number>(0);

	const testimonialList = useMemo(() => {
		return TESTIMONIALS.map((testimonial) => (
			<TestimonialCard key={`${testimonial.name}-${testimonial.img}`} testimonial={testimonial} />
		));
	}, []);

	const nextTestimonial = useCallback(() => {
		setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
	}, []);

	const prevTestimonial = useCallback(() => {
		setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
	}, []);

	return (
		<section className="relative py-24 bg-gradient-to-b from-bg-light via-white to-bg-light overflow-hidden">
			<div className="text-center mb-16">
				<h2 className="text-4xl font-title font-extrabold text-gray-800">
					{t("pages.home.testimonials_title")}
				</h2>
				<p className="text-gray-500 mt-3">
					Más de <span className="font-semibold text-primary">15.000 clientes satisfechos</span>
				</p>
			</div>

			<div className="relative max-w-5xl mx-auto overflow-hidden">
				<div
					className="flex transition-transform duration-700 ease-in-out"
					style={{ transform: `translateX(-${current * 100}%)` }}
				>
					{testimonialList}
				</div>

				<div className="absolute inset-0 flex items-center justify-between px-6 md:px-10">
					<button
						type="button"
						onClick={prevTestimonial}
						className="w-10 h-10 flex items-center justify-center bg-white text-primary rounded-full shadow-md hover:bg-primary hover:text-white transition-all duration-300"
						aria-label="Anterior"
					>
						<FaChevronLeft />
					</button>

					<button
						type="button"
						onClick={nextTestimonial}
						className="w-10 h-10 flex items-center justify-center bg-white text-primary rounded-full shadow-md hover:bg-primary hover:text-white transition-all duration-300"
						aria-label="Siguiente"
					>
						<FaChevronRight />
					</button>
				</div>
			</div>

			<div className="flex justify-center mt-8 gap-2">
				{TESTIMONIALS.map((tst, index) => (
					<span
						key={`${tst.name}-${tst.img}-dot`}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${
							index === current ? "bg-primary" : "bg-gray-300"
						}`}
					/>
				))}
			</div>
		</section>
	);
});
