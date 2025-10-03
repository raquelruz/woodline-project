import { useState } from "react";
import { SectionContainer } from "../components/SectionContainer";

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

	const nextTestimonial = () => {
		setCurrent((prev) => (prev + 1) % testimonials.length);
	};

	const prevTestimonial = () => {
		setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	};

	return (
		<SectionContainer
			title={<span className="font-title font-bold text-primary">Lo que opinan nuestros clientes</span>}
			childrenContainerStyle="flex flex-col gap-2"
		>
			<p className="text-center text-primary text-lg">Más de 15.000 clientes satisfechos</p>

			<div className="relative w-full overflow-hidden">
				<div
					className="flex transition-transform duration-500 ease-in-out"
					style={{ transform: `translateX(-${current * 100}%)` }}
				>
					{testimonials.map((testimonial, index) => (
						<div
							key={index}
							className="min-w-full flex flex-col md:flex-row items-start gap-10 p-6"
						>
							<div className="relative flex-shrink-0">
								<span className="absolute -top-2 -left-3 text-8xl text-primary-light">“</span>
								<img
									src={testimonial.img}
									alt={testimonial.name}
									className="w-32 h-32 rounded-full object-cover bg-landing-brand-darker"
								/>
							</div>

							<div className="flex flex-col max-w-[400px] md:max-w-[800px] text-primary-pressed">
								<p className="text-lg mb-4">“{testimonial.quote}”</p>
								<p className="font-bold">{testimonial.name}</p>
								<p className="text-sm text-primary-hover">{testimonial.role}</p>
							</div>
						</div>
					))}
				</div>

				<div className="absolute right-8 top-1/2 flex flex-col gap-2 -translate-y-1/2">
					<button
						onClick={nextTestimonial}
						className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-ultralight text-primary cursor-pointer"
					>
						→
					</button>
					<button
						onClick={prevTestimonial}
						className="w-8 h-8 flex items-center justify-center rounded-full bg-error-light text-error cursor-pointer"
					>
						←
					</button>
				</div>
			</div>


			<div className="relative w-full flex justify-end items-center border-t border-bg-dark pt-2">
				<a href="#" className="text-md font-title text-primary hover:underline">
					Ver todas las reseñas →
				</a>
			</div>
		</SectionContainer>
	);
};
