
const shopNowBtn = "text-sm px-8 py-sm bg-primary text-white font-semibold rounded-md shadow-md hover:bg-primary-light transition-all duration-300";

export const Hero = () => {
	return (
		<section className="flex flex-col justify-center max-h-[1080px] min-h-[600px] w-full bg-bg-light px-6 rounded-b-4xl">
			<div className="max-w-[500px]">
				<h1 className="font-bold text-primary leading-tight drop-shadow-lg">
					Ofertas exclusivas en Colección de <span className="text-primary-light">Muebles</span>
				</h1>
				<p className="mt-6 text-primary">
					Explora diferentes categorías y encuentra las mejores ofertas para tu hogar.
				</p>

				<div className="mt-10">
					<button className={shopNowBtn}>
						Compra ahora
					</button>
				</div>
			</div>
		</section>
	);
};
