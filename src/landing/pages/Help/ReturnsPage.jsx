export const ReturnsPage = () => {
	return (
		<section className="px-6 md:px-16 py-12 bg-gray-50 min-h-[80vh]">
			<h1 className="text-3xl font-title font-bold text-primary mb-6 text-center">Devoluciones</h1>

			<p className="text-gray-700 text-center max-w-240 mx-auto mb-10">
				En <strong>Woodline Living</strong> queremos que estés completamente satisfecho con tu compra.
				Si por algún motivo no es así, dispones de <strong>14 días naturales</strong> desde la recepción del pedido para solicitar una devolución.
			</p>

			<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
				<div className="bg-white p-6 rounded-xl shadow-sm">
					<h3 className="font-title font-semibold text-primary mb-2">📦 Condiciones</h3>
					<p className="text-gray-600 text-sm">
						El producto debe estar en perfecto estado, sin usar y con su embalaje original.
					</p>
				</div>

				<div className="bg-white p-6 rounded-xl shadow-sm">
					<h3 className="font-title font-semibold text-primary mb-2">💸 Reembolso</h3>
					<p className="text-gray-600 text-sm">
						Una vez recibido y comprobado el producto, realizaremos el reembolso mediante el mismo método de pago utilizado.
					</p>
				</div>

				<div className="bg-white p-6 rounded-xl shadow-sm">
					<h3 className="font-title font-semibold text-primary mb-2">📞 Solicitud</h3>
					<p className="text-gray-600 text-sm">
						Puedes solicitar tu devolución escribiéndonos a 
						<a href="mailto:info@woodlineliving.com" className="text-primary hover:underline">
							info@woodlineliving.com
						</a>.
					</p>
				</div>
			</div>
		</section>
	);
};
