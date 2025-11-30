import { memo } from "react";

export const ShippingPage = memo(() => {
	console.log("RENDER SHIPPINGPAGE")
	
	return (
		<section className="px-6 md:px-16 py-12 bg-gray-50 min-h-[80vh]">
			<h1 className="text-3xl font-title font-bold text-primary mb-6 text-center">Envíos</h1>

			<p className="text-gray-700 text-center max-w-240 mx-auto mb-10">
				En <strong>Woodline Living</strong> trabajamos con las mejores empresas de transporte para garantizarte una entrega segura, rápida y en perfecto estado. 
				Todos nuestros envíos se preparan con cuidado y se embalan adecuadamente para proteger tus muebles durante el transporte.
			</p>

			<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
				<div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-3xl">🚚</p>
					<h3 className="font-title font-semibold text-primary mb-2">Envíos Nacionales</h3>
					<p className="text-gray-600 text-sm">
						Enviamos a toda España (península y Baleares). Los gastos de envío se calculan automáticamente al finalizar tu compra.
					</p>
				</div>

				<div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-3xl">📦</p>
					<h3 className="font-title font-semibold text-primary mb-2">Embalaje Seguro</h3>
					<p className="text-gray-600 text-sm">
						Cada producto se revisa cuidadosamente antes de salir de nuestro almacén y se embala para minimizar cualquier riesgo.
					</p>
				</div>

				<div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-3xl">📍</p>
					<h3 className="font-title font-semibold text-primary mb-2">Seguimiento del Pedido</h3>
					<p className="text-gray-600 text-sm">
						Recibirás un número de seguimiento por email tan pronto como tu pedido salga del almacén.
					</p>
				</div>
			</div>
		</section>
	);
});
