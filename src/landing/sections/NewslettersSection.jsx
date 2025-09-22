import { SectionContainer } from "../components/SectionContainer";
import banner from "../../assets/images/living-room-home.jpg";

export const NewslettersSection = () => {
	return (
		<SectionContainer>
			<div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 bg-emerald-50">

				<img
					src={banner}
					alt="Salón"
					className="w-full max-w-[400px] md:max-w-[400px] rounded-lg shadow-lg"
				/>

				<div className="flex flex-col gap-6 md:gap-10">
					<h2 className="font-title text-2xl md:text-3xl font-bold text-primary-pressed">
						Suscríbete a nuestra newsletter
					</h2>
					<p className="text-primary-pressed text-base md:text-lg">
						Recibe descuentos exclusivos y más ofertas directamente en tu correo.
					</p>

					<div className="flex flex-col md:flex-row gap-4">
						<input
							type="email"
							placeholder="Introduce tu email"
							className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-pressed transition-all"
						/>
						<button className="text-sm px-6 py-2 bg-primary-hover text-white font-semibold rounded-md shadow-md hover:bg-primary-pressed transition-all duration-300">
							Suscribirse
						</button>
					</div>
				</div>
			</div>
		</SectionContainer>
	);
};
