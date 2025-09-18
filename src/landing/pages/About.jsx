import aboutImage from "../../assets/images/team-img.jpg"

const aboutClass = "text-gray-700 text-md";

export const About = () => {
	return (
		<section className="py-12">
			<div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
				<div className="md:w-1/2">
					<img src={aboutImage} alt="Sobre nosotros" className="rounded-lg shadow-lg w-full object-cover" />
				</div>

				<div className="md:w-1/2 flex flex-col gap-4">
					<h4 className="font-bold text-gray-800">Sobre Nosotros</h4>
					<p className={aboutClass}>
						En <strong>Woodline Living</strong> creemos en la armonía entre diseño y naturaleza. Cada uno de
						nuestros muebles está pensado para ofrecer funcionalidad, belleza y durabilidad, cuidando cada
						detalle y utilizando materiales de la más alta calidad.
					</p>
					<p className={aboutClass}>
						Nuestro equipo está formado por profesionales apasionados por el diseño y la artesanía.
						Trabajamos día a día para crear productos que no solo decoren tu espacio, sino que también lo
						llenen de personalidad.
					</p>
					<p className={aboutClass}>
						Nos encanta escuchar a nuestros clientes, aprender de sus ideas y mejorar continuamente. Porque
						para nosotros, la verdadera diferencia está en el detalle y en la experiencia de quienes confían
						en nosotros.
					</p>
				</div>
			</div>
		</section>
	);
};
