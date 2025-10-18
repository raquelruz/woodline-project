import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
	{
		quote: "Mi experiencia en esta tienda ha sido excelente. El servicio al cliente es muy atento y los muebles de gran calidad. ¡Recomendado!",
		name: "Laura Martínez",
		role: "Diseñadora de interiores",
		img: "https://i.pinimg.com/736x/51/3f/63/513f63a00960b3c71cca5b20ad84d80d.jpg",
	},
	{
		quote: "Me encantó la variedad de productos y la rapidez en la entrega. Sin duda volveré a comprar aquí.",
		name: "Carlos Gómez",
		role: "Arquitecto",
		img: "https://i.pinimg.com/736x/dd/53/43/dd5343b1af6862a015633ff7338880e7.jpg",
	},
	{
		quote: "El equipo de atención al cliente resolvió todas mis dudas y me ayudó a elegir los muebles perfectos para mi casa.",
		name: "Ana Torres",
		role: "Emprendedora",
		img: "https://i.pinimg.com/736x/14/76/1b/14761bb5947cc8e68cff2be1ad77c3f4.jpg",
	},
	{
		quote: "Los muebles llegaron en perfecto estado y la experiencia de compra fue muy sencilla y agradable.",
		name: "Javier Fernández",
		role: "Consultor",
		img: "https://i.pinimg.com/736x/25/33/8f/25338f488af2c45912c15ebab325e363.jpg",
	},
	{
		quote: "Calidad, diseño y excelente trato al cliente. Estoy muy satisfecha con mi compra y recomiendo esta tienda.",
		name: "María López",
		role: "Decoradora",
		img: "https://i.pinimg.com/736x/a8/e9/d2/a8e9d2b3d136df556dff6ffbe579cbb7.jpg",
	},
];

export const Testimonials = () => {
	const [current, setCurrent] = useState(0);

	function nextTestimonial() {
		setCurrent((prev) => (prev + 1) % testimonials.length);
	}

	function prevTestimonial() {
		setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	}

	return (
		<section className="relative py-24 bg-gradient-to-b from-bg-light via-white to-bg-light overflow-hidden">
			<div className="text-center mb-16">
				<h2 className="text-4xl font-title font-extrabold text-gray-800">
					Lo que opinan <span className="text-primary">nuestros clientes</span>
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
					{testimonials.map((testimonial, index) => (
						<div
							key={index}
							className="min-w-full flex flex-col items-center justify-center text-center px-8 md:px-20"
						>
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
									<p className="mt-4 text-lg font-semibold text-primary">
										{testimonial.name}
									</p>
									<p className="text-sm text-gray-500">{testimonial.role}</p>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="absolute inset-0 flex items-center justify-between px-6 md:px-10">
					<button
						onClick={prevTestimonial}
						className="w-10 h-10 flex items-center justify-center bg-white text-primary rounded-full shadow-md hover:bg-primary hover:text-white transition-all duration-300"
						aria-label="Anterior"
					>
						<FaChevronLeft />
					</button>
					<button
						onClick={nextTestimonial}
						className="w-10 h-10 flex items-center justify-center bg-white text-primary rounded-full shadow-md hover:bg-primary hover:text-white transition-all duration-300"
						aria-label="Siguiente"
					>
						<FaChevronRight />
					</button>
				</div>
			</div>

			<div className="flex justify-center mt-8 gap-2">
				{testimonials.map((_, index) => (
					<span
						key={index}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${
							index === current ? "bg-primary" : "bg-gray-300"
						}`}
					></span>
				))}
			</div>
		</section>
	);
};
