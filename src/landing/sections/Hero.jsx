import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export const Hero = () => {
	return (
		<section className="flex flex-col justify-center items-start max-h-[1080px] min-h-[600px] w-full bg-gradient-to-br from-primary/10 to-white px-6 rounded-b-4xl">
			<div className="max-w-[600px]">
				<motion.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="font-bold text-5xl text-primary leading-tight drop-shadow-md"
				>
					Ofertas exclusivas en nuestra <span className="text-primary-light">Colección de Muebles</span>
				</motion.h1>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}
					className="mt-6 text-lg text-gray-600"
				>
					Explora diferentes categorías y encuentra las mejores ofertas para tu hogar.  
					Diseños modernos, materiales de alta calidad y precios irresistibles.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
					className="mt-10"
				>
					<button className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-light hover:translate-x-1 transition-all duration-300">
						Compra ahora <FaArrowRight className="text-white text-sm" />
					</button>
				</motion.div>
			</div>
		</section>
	);
};
