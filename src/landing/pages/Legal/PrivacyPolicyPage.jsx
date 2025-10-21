export const PrivacyPolicyPage = () => {
	return (
		<section className="px-6 md:px-16 py-12 bg-gray-50 min-h-[80vh]">
			<h1 className="text-3xl font-title font-bold text-primary mb-6 text-center">
				Política de Privacidad
			</h1>

			<div className="max-w-240 mx-auto text-gray-700 leading-relaxed space-y-6">
				<p>
					En <strong>Woodline Living</strong> respetamos tu privacidad y nos comprometemos a proteger tus datos
					personales conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales.
				</p>

				<h2 className="text-xl font-semibold text-primary mt-6">1. Responsable del tratamiento</h2>
				<p>
					Woodline Living es responsable del tratamiento de tus datos.  
					Contacto:{" "}
					<a href="mailto:info@woodlineliving.com" className="text-primary hover:underline">
						info@woodlineliving.com
					</a>
				</p>

				<h2 className="text-xl font-semibold text-primary mt-6">2. Finalidad</h2>
				<p>
					Utilizamos tus datos para gestionar pedidos, procesar pagos, ofrecer atención al cliente y enviarte información
					sobre productos o promociones si así lo autorizas.
				</p>

				<h2 className="text-xl font-semibold text-primary mt-6">3. Conservación</h2>
				<p>
					Tus datos se conservarán durante el tiempo necesario para cumplir con las obligaciones legales y comerciales
					derivadas de la relación contractual.
				</p>

				<h2 className="text-xl font-semibold text-primary mt-6">4. Derechos</h2>
				<p>
					Puedes ejercer tus derechos de acceso, rectificación, supresión y oposición enviando un correo a{" "}
					<a href="mailto:info@woodlineliving.com" className="text-primary hover:underline">
						info@woodlineliving.com
					</a>.
				</p>

				<h2 className="text-xl font-semibold text-primary mt-6">5. Seguridad</h2>
				<p>
					Aplicamos medidas técnicas y organizativas para proteger tus datos frente a accesos no autorizados, pérdida
					o alteración.
				</p>
			</div>
		</section>
	);
};
