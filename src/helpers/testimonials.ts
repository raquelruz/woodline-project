export const TESTIMONIALS = [
	{
		quote: "Mi experiencia en esta tienda ha sido excelente...",
		name: "Laura Martínez",
		role: "Diseñadora de interiores",
		img: "https://i.pinimg.com/736x/51/3f/63/513f63a00960b3c71cca5b20ad84d80d.jpg",
	},
	{
		quote: "Me encantó la variedad de productos...",
		name: "Carlos Gómez",
		role: "Arquitecto",
		img: "https://i.pinimg.com/736x/dd/53/43/dd5343b1af6862a015633ff7338880e7.jpg",
	},
	{
		quote: "El equipo de atención al cliente resolvió todas mis dudas...",
		name: "Ana Torres",
		role: "Emprendedora",
		img: "https://i.pinimg.com/736x/14/76/1b/14761bb5947cc8e68cff2be1ad77c3f4.jpg",
	},
	{
		quote: "Los muebles llegaron en perfecto estado...",
		name: "Javier Fernández",
		role: "Consultor",
		img: "https://i.pinimg.com/736x/25/33/8f/25338f488af2c45912c15ebab325e363.jpg",
	},
	{
		quote: "Calidad, diseño y excelente trato al cliente...",
		name: "María López",
		role: "Decoradora",
		img: "https://i.pinimg.com/736x/a8/e9/d2/a8e9d2b3d136df556dffbe579cbb7.jpg",
	},
] as const;

export type Testimonial = (typeof TESTIMONIALS)[number];