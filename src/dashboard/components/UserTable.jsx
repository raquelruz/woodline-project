import { useEffect, useState } from "react";
import { api } from "../../core/http/axios";
import { MdEdit, MdDelete } from "react-icons/md";

export const UserTable = ({ onEdit }) => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			setLoading(true);
			const response = await api.get("/users");
			setUsers(Array.isArray(response.data) ? response.data : []);
		} catch (error) {
			console.error("Error al cargar usuarios:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (userId) => {
		if (!userId) return alert("ID de usuario inválido.");

		const confirmDelete = window.confirm("¿Seguro que deseas eliminar este usuario?");
		if (!confirmDelete) return;

		try {
			await api.delete(`/users/${userId}`);
			setUsers((prev) => prev.filter((u) => u._id !== userId));
			console.log(`✅ Usuario ${userId} eliminado correctamente`);
		} catch (error) {
			console.error("Error al eliminar usuario:", error);
			alert("No se pudo eliminar el usuario. Intenta de nuevo.");
		}
	};

	if (loading) return <p className="text-center mt-4">Cargando usuarios...</p>;

	return (
		<div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100 mt-6">
			<table className="min-w-full text-sm">
				<thead className="bg-primary text-white">
					<tr>
						<th className="text-left px-4 py-3 font-medium">Nombre</th>
						<th className="text-left px-4 py-3 font-medium">Email</th>
						<th className="text-left px-4 py-3 font-medium">Rol</th>
						<th className="text-center px-4 py-3 font-medium">Acciones</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-100">
					{users.map((user, index) => (
						<tr key={user._id || user.id || `user-${index}`} className="hover:bg-gray-50 transition">
							<td className="px-4 py-3 font-semibold text-gray-700">{user.name}</td>
							<td className="px-4 py-3 text-gray-500">{user.email}</td>
							<td className="px-4 py-3 text-primary font-semibold">{user.role}</td>
							<td className="px-4 py-3 text-center">
								<div className="flex justify-center gap-4">
									<button
										onClick={() => onEdit(user)}
										className="text-blue-500 hover:text-blue-700 transition"
										title="Editar"
									>
										<MdEdit size={18} />
									</button>
									<button
										onClick={() => handleDelete(user._id || user.id)}
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

			{users.length === 0 && <p className="text-center text-gray-500 py-6">No hay usuarios registrados.</p>}
		</div>
	);
};
