export const DeliveryTimePage = () => {
	return (
		<section className="px-6 md:px-16 py-12 bg-gray-50 min-h-[80vh]">
			<h1 className="text-3xl font-title font-bold text-primary mb-6 text-center">Tiempo de Entrega</h1>

			<p className="text-gray-700 text-center max-w-240 mx-auto mb-10">
				Nuestros productos son elaborados con cuidado y enviados lo antes posible. El tiempo de entrega puede
				variar según la disponibilidad y el destino del envío.
			</p>

			<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
				<div className="bg-white p-6 rounded-xl shadow-sm">
					<h3 className="font-title font-semibold text-primary mb-2">🚛 Envíos estándar</h3>
					<p className="text-gray-600 text-sm">
						Entre <strong>5 y 10 días laborables</strong> desde la confirmación del pedido.
					</p>
				</div>

				<div className="bg-white p-6 rounded-xl shadow-sm">
					<h3 className="font-title font-semibold text-primary mb-2">🛠️ Productos personalizados</h3>
					<p className="text-gray-600 text-sm">
						Los pedidos hechos a medida pueden requerir entre <strong>15 y 25 días laborables</strong>.
					</p>
				</div>

				<div className="bg-white p-6 rounded-xl shadow-sm">
					<h3 className="font-title font-semibold text-primary mb-2">🌍 Envíos internacionales</h3>
					<p className="text-gray-600 text-sm">
						Los plazos varían según el país de destino. Escríbenos para más detalles.
					</p>
				</div>
			</div>
		</section>
	);
};
