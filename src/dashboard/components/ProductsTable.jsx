import { useEffect, useState } from "react";
import { api } from "../../core/http/axios";
import { MdEdit, MdDelete } from "react-icons/md";

export const ProductTable = ({ onEdit }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const { data } = await api.get("/products");
				setProducts(data);
			} catch (err) {
				console.error(err);
				setError("Error al cargar productos.");
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	async function handleDelete(id) {
		if (!confirm("¿Seguro que quieres eliminar este producto?")) return;
		try {
			await api.delete(`/products/${id}`);
			setProducts((prev) => prev.filter((product) => product._id !== id));
		} catch (error) {
			console.error(error);
			alert("Error al eliminar producto.");
		}
	}

	if (loading) return <p className="text-gray-500">Cargando productos...</p>;
	if (error) return <p className="text-red-500">{error}</p>;
	if (!products.length) return <p className="text-gray-400 italic">No hay productos disponibles.</p>;

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
					{products.map((product) => (
						<tr key={product._id} className="hover:bg-gray-50 transition">
							<td className="px-4 py-3 font-semibold text-gray-700">{product.name}</td>
							<td className="px-4 py-3 text-gray-500">{product.category?.join(", ")}</td>
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
										onClick={() => handleDelete(product._id)}
										className="text-red-500 hover:text-red-700 transition"
										title="Eliminar"
									>
										<MdDelete size={18} />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
