import { useEffect, useState } from "react";
import { api } from "../../core/http/axios";
import { MdEdit, MdDelete } from "react-icons/md";
import { Loader } from "../../landing/components/Loader";

export const ProductTable = ({ onEdit }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			setLoading(true);
			const response = await api.get("/products");
			setProducts(Array.isArray(response.data) ? response.data : []);
		} catch (error) {
			// console.error("Error al cargar productos:", error);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (productId) => {
		if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

		try {
			await api.delete(`/products/${productId}`);
			setProducts((prev) => prev.filter((p) => (p._id || p.id) !== productId));
		} catch (error) {
			// console.error("Error al eliminar producto:", error);
			alert("No se pudo eliminar el producto. Intenta de nuevo.");
		}
	};

	if (loading) return <Loader text="Cargando productos..."/>
	if (!products.length) return <p className="text-center mt-4 text-gray-500">No hay productos registrados.</p>;

	return (
		<div className="bg-white rounded-xl shadow-md border border-gray-100 mt-6">
			{/* DESKTOP */}
			<div className="hidden md:block overflow-x-auto">
				<table className="min-w-full text-sm">
					<thead className="bg-primary text-white">
						<tr>
							<th className="text-left px-4 py-3 font-medium">Producto</th>
							<th className="text-left px-4 py-3 font-medium">Categorías</th>
							<th className="text-left px-4 py-3 font-medium">Precio</th>
							<th className="text-center px-4 py-3 font-medium">Acciones</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{products.map((product) => {
							const productId = product._id || product.id;
							return (
								<tr key={productId} className="hover:bg-gray-50 transition">
									<td className="px-4 py-3 font-semibold text-gray-700">{product.name}</td>
									<td className="px-4 py-3 text-gray-500">
										{Array.isArray(product.category)
											? product.category.join(", ")
											: product.category}
									</td>
									<td className="px-4 py-3 text-primary font-bold">{product.price} €</td>
									<td className="px-4 py-3 text-center">
										<div className="flex justify-center gap-4">
											<button
												onClick={() => onEdit(product)}
												className="text-blue-500 hover:text-blue-700 transition"
											>
												<MdEdit size={18} />
											</button>
											<button
												onClick={() => handleDelete(productId)}
												className="text-red-500 hover:text-red-700 transition"
											>
												<MdDelete size={18} />
											</button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			{/* MOBILE */}
			<div className="md:hidden divide-y divide-gray-100">
				{products.map((product) => {
					const productId = product._id || product.id;
					return (
						<div key={productId} className="p-4">
							<p className="font-semibold text-gray-800">{product.name}</p>
							<p className="text-gray-500 text-sm mb-1">
								Categorías:{" "}
								{Array.isArray(product.category)
									? product.category.join(", ")
									: product.category}
							</p>
							<p className="text-primary font-bold mb-3">{product.price} €</p>

							<div className="flex gap-4">
								<button
									onClick={() => onEdit(product)}
									className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition"
								>
									<MdEdit /> Editar
								</button>
								<button
									onClick={() => handleDelete(productId)}
									className="flex items-center gap-1 text-red-500 hover:text-red-700 transition"
								>
									<MdDelete /> Eliminar
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
