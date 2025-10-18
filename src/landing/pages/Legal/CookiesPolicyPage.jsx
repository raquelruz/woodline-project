export const CookiesPolicyPage = () => {
	return (
		<section className="px-6 md:px-16 py-12 bg-gray-50 min-h-[80vh]">
			<h1 className="text-3xl font-title font-bold text-primary mb-6 text-center">
				Política de Cookies
			</h1>

			<div className="max-w-240 mx-auto text-gray-700 leading-relaxed space-y-6">
				<p>
					En <strong>Woodline Living</strong> utilizamos cookies para mejorar tu experiencia de navegación, analizar el tráfico
					y personalizar el contenido.
				</p>

				<h2 className="text-xl font-semibold text-primary mt-6">1. ¿Qué son las cookies?</h2>
				<p>
					Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web.
					Permiten recordar tus preferencias y mejorar el funcionamiento de la página.
				</p>

				<h2 className="text-xl font-semibold text-primary mt-6">2. Tipos de cookies utilizadas</h2>
				<ul className="list-disc list-inside space-y-2">
					<li><strong>Cookies técnicas:</strong> necesarias para el funcionamiento básico del sitio.</li>
					<li><strong>Cookies analíticas:</strong> nos ayudan a entender cómo se usa nuestra web.</li>
					<li><strong>Cookies de personalización:</strong> recuerdan tus preferencias (como idioma o región).</li>
				</ul>

				<h2 className="text-xl font-semibold text-primary mt-6">3. Cómo controlar las cookies</h2>
				<p>
					Puedes permitir, bloquear o eliminar las cookies desde la configuración de tu navegador.  
					Si las desactivas, algunas partes del sitio podrían no funcionar correctamente.
				</p>

				<h2 className="text-xl font-semibold text-primary mt-6">4. Consentimiento</h2>
				<p>
					Al continuar navegando por nuestro sitio, aceptas el uso de cookies conforme a esta política.
				</p>
			</div>
		</section>
	);
};
