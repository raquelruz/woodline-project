export const Hero = () => {
	return (
		<section className="flex flex-col justify-center max-h-[1080px] min-h-[600px] w-full bg-landing-brand-darker px-6 rounded-b-4xl">
			<div className="max-w-[500px]">
				<h1 className="text-xl md:text-xl font-bold text-primary-pressed leading-tight drop-shadow-lg">
					Ofertas exclusivas en Colección de <span className="text-primary-hover">Muebles</span>
				</h1>
				<p className="mt-6 text-sm md:text-sm text-primary-pressed/90">
					Explora diferentes categorías y encuentra las mejores ofertas para tu hogar.
				</p>

				<div className="mt-10">
					<button className="text-sm px-8 py-sm bg-primary-hover text-white font-semibold rounded-md shadow-md hover:bg-primary-pressed transition-all duration-300">
						Compra ahora
					</button>
				</div>
			</div>
		</section>
	);
};
