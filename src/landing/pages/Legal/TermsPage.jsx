export const TermsPage = () => {
	return (
		<section className="px-6 md:px-16 py-12 bg-gray-50 min-h-[80vh]">
			<h1 className="text-3xl font-title font-bold text-primary mb-6 text-center">
				Términos y Condiciones
			</h1>

			<div className="max-w-240 mx-auto text-gray-700 leading-relaxed space-y-6">
				<p>
					El presente documento establece las condiciones generales de uso y contratación en el sitio web de{" "}
					<strong>Woodline Living</strong>. Al acceder y utilizar esta web, aceptas estos términos en su totalidad.
				</p>

				<h2 className="text-xl font-semibold text-primary mt-6">1. Identificación</h2>
				<p>
					Woodline Living es una marca dedicada al diseño y venta de muebles y decoración.  
					Si tienes cualquier consulta, puedes escribirnos a{" "}
					<a href="mailto:info@woodlineliving.com" className="text-primary hover:underline">
						info@woodlineliving.com
					</a>.
				</p>

				<h2 className="text-xl font-semibold text-primary mt-6">2. Uso del sitio web</h2>
				<p>
					El usuario se compromete a hacer un uso adecuado del sitio web y a no realizar actividades ilícitas,
					fraudulentas o que atenten contra los derechos de terceros o de la propia empresa.
				</p>

				<h2 className="text-xl font-semibold text-primary mt-6">3. Precios y pagos</h2>
				<p>
					Todos los precios incluyen IVA y están expresados en euros. Los pagos se realizan mediante pasarelas seguras
					que garantizan la protección de tus datos.
				</p>

				<h2 className="text-xl font-semibold text-primary mt-6">4. Propiedad intelectual</h2>
				<p>
					Todos los contenidos de este sitio (textos, imágenes, diseños, logotipos, etc.) son propiedad de Woodline Living
					o de sus respectivos autores, y están protegidos por la legislación vigente en materia de propiedad intelectual.
				</p>

				<h2 className="text-xl font-semibold text-primary mt-6">5. Legislación aplicable</h2>
				<p>
					Estas condiciones se rigen por la legislación española. Cualquier controversia será sometida a los juzgados
					y tribunales competentes de Cádiz.
				</p>
			</div>
		</section>
	);
};
