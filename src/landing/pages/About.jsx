import aboutImage from "../../assets/images/team-img.jpg";
import { FaLeaf, FaHandshake, FaCouch } from "react-icons/fa";

const aboutClass = "text-gray-700 leading-relaxed";

export const About = () => {
	return (
		<section className="bg-gradient-to-b from-white to-gray-50 py-20">
			<div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
				{/* Imagen principal */}
				<div className="md:w-1/2 relative group">
					<img
						src={aboutImage}
						alt="Equipo Woodline Living"
						className="rounded-3xl shadow-xl w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
					/>
					<div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-all" />
				</div>

				{/* Texto principal */}
				<div className="md:w-1/2 flex flex-col gap-5">
					<h2 className="text-4xl font-title font-bold text-primary mb-2">
						Sobre <span className="text-primary-pressed">Woodline Living</span>
					</h2>

					<p className={aboutClass}>
						En <strong className="text-primary">Woodline Living</strong> creemos en la armonía entre diseño y
						naturaleza. Cada mueble está creado para ofrecer <b>belleza, durabilidad y equilibrio</b>, cuidando
						cada detalle con materiales de la más alta calidad.
					</p>

					<p className={aboutClass}>
						Nuestro equipo está formado por <b>artesanos y diseñadores apasionados</b>, que trabajan cada día
						para transformar espacios en lugares únicos, cálidos y llenos de personalidad.
					</p>

					<p className={aboutClass}>
						Nos inspira la sostenibilidad, la innovación y el compromiso con las personas. Creemos que el diseño
						es una forma de conectar contigo y con tu hogar.
					</p>

					<div className="pt-6">
						<a
							href="/products"
							className="inline-block bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-light transition-all"
						>
							Descubre nuestros productos
						</a>
					</div>
				</div>
			</div>

			{/* Sección de valores */}
			<div className="max-w-6xl mx-auto px-6 mt-20">
				<h3 className="font-title font-semibold text-center text-primary mb-10">
					Nuestros valores nos definen
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
					<div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-all">
						<FaLeaf className="text-4xl text-primary mx-auto mb-4" />
						<h4 className="font-title font-semibold text-gray-800 mb-2">Sostenibilidad</h4>
						<p className="text-sm text-gray-600">
							Trabajamos con materiales responsables y procesos que respetan el entorno natural.
						</p>
					</div>

					<div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-all">
						<FaCouch className="text-4xl text-primary mx-auto mb-4" />
						<h4 className="font-title font-semibold text-gray-800 mb-2">Diseño y confort</h4>
						<p className="text-sm text-gray-600">
							Creamos piezas que combinan funcionalidad, estética y comodidad para tu día a día.
						</p>
					</div>

					<div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-all">
						<FaHandshake className="text-4xl text-primary mx-auto mb-4" />
						<h4 className="font-title font-semibold text-gray-800 mb-2">Compromiso humano</h4>
						<p className="text-sm text-gray-600">
							Cuidamos cada relación: desde nuestro equipo hasta cada cliente que confía en nosotros.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
