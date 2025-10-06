import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

export const Newsletters = () => {
	const [email, setEmail] = useState("");

	function handleSubmit(e) {
		e.preventDefault();

		if (!email) {
			alert("Por favor, introduce un correo electrónico válido.");
			return;
		}

		// Construir mailto con asunto y cuerpo personalizados
		const subject = encodeURIComponent("Suscripción a la newsletter");
		const body = encodeURIComponent(
			`Hola, me gustaría suscribirme a la newsletter con este correo: ${email}`
		);

		window.location.href = `mailto:info@tutienda.com?subject=${subject}&body=${body}`;
		setEmail("");
	}

	return (
		<section className="py-16 px-6 bg-primary-ultralight">
			<div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 bg-white rounded-2xl shadow-sm p-6 md:p-10">
				
				{/* Texto */}
				<div className="flex flex-col items-center md:items-start text-center md:text-left">
					<h2 className="font-title text-2xl md:text-3xl font-bold text-primary mb-2">
						¿Quieres recibir ofertas exclusivas?
					</h2>
					<p className="text-gray-600 text-sm md:text-base max-w-full">
						Suscríbete a nuestra newsletter y sé el primero en conocer descuentos,
						nuevas colecciones y consejos de decoración.
					</p>
				</div>

				{/* Formulario */}
				<form
					onSubmit={handleSubmit}
					className="flex w-full md:w-auto max-w-full bg-gray-50 border border-gray-200 rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-primary"
				>
					<div className="flex items-center gap-3 px-4 flex-1">
						<FaEnvelope className="text-primary text-base" />
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Introduce tu correo"
							className="w-full py-2.5 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm md:text-base"
						/>
					</div>
					<button
						type="submit"
						className="bg-primary text-white text-sm md:text-base font-semibold px-6 md:px-8 py-2.5 hover:bg-primary-light transition-all duration-300 rounded-r-full"
					>
						Suscribirme
					</button>
				</form>
			</div>

			<p className="text-center text-xs text-gray-500 mt-4">
				✨ Prometemos enviarte solo contenido útil y ofertas reales. Sin spam.
			</p>
		</section>
	);
};
