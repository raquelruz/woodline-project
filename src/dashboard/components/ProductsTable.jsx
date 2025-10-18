import { useEffect, useState } from "react";
import { api } from "../../core/http/axios";
import { MdEdit, MdDelete } from "react-icons/md";

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
			if (Array.isArray(response.data)) {
				setProducts(response.data);
			} else {
				console.warn("La API no devolvió un array de productos:", response.data);
				setProducts([]);
			}
		} catch (error) {
			console.error("Error al cargar productos:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (productId) => {
		if (!productId) {
			console.error("No se ha pasado un ID de producto válido:", productId);
			alert("Error: no se pudo identificar el producto.");
			return;
		}

		const confirmDelete = window.confirm("¿Seguro que deseas eliminar este producto?");
		if (!confirmDelete) return;

		try {
			console.log(`Eliminando producto con ID: ${productId}`);
			const response = await api.delete(`/products/${productId}`);

			if (response.status === 200) {
				setProducts((prev) => prev.filter((p) => (p._id || p.id) !== productId));
				console.log(`Producto ${productId} eliminado correctamente`);
			} else {
				console.warn("La API no devolvió estado 200:", response);
				alert("No se pudo eliminar el producto. Intenta de nuevo.");
			}
		} catch (error) {
			console.error("Error al eliminar producto:", error);
			alert("No se pudo eliminar el producto. Intenta de nuevo.");
		}
	};

	if (loading) return <p className="text-center mt-4">Cargando productos...</p>;

	return (
		<div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
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
					{products.map((product, index) => {
						const productId = product._id || product.id;
						return (
							<tr key={productId || index} className="hover:bg-gray-50 transition">
								<td className="px-4 py-3 font-semibold text-gray-700">{product.name}</td>
								<td className="px-4 py-3 text-gray-500">
									{Array.isArray(product.category) ? product.category.join(", ") : product.category}
								</td>
								<td className="px-4 py-3 text-primary font-bold">{product.price} €</td>
								<td className="px-4 py-3 text-center">
									<div className="flex justify-center gap-4">
										<button
											onClick={() => onEdit(product)}
											className="text-blue-500 hover:text-blue-700 transition"
											title="Editar"
										>
											<MdEdit size={18} />
										</button>
										<button
											onClick={() => handleDelete(productId)}
											className="text-red-500 hover:text-red-700 transition"
											title="Eliminar"
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
	);
};
