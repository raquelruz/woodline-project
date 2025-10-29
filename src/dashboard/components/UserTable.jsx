import { useEffect, useState } from "react";
import { api } from "../../core/http/axios";
import { MdEdit, MdDelete } from "react-icons/md";
import { Loader } from "../../landing/components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { CustomToaster } from "./CustomToaster";

export const UserTable = ({ onEdit }) => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			setLoading(true);
			toast.loading("Cargando usuarios...");
			const response = await api.get("/users");
			const data = Array.isArray(response.data) ? response.data : [];
			setUsers(data);
			toast.dismiss();
			toast.success("Usuarios cargados correctamente ✅");
		} catch (error) {
			toast.dismiss();
			toast.error("Error al cargar usuarios ❌");
			console.error("Error al cargar usuarios:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (userId) => {
		const confirmDelete = window.confirm("¿Seguro que deseas eliminar este usuario?");
		if (!confirmDelete) return;

		try {
			toast.loading("Eliminando usuario...");
			await api.delete(`/users/${userId}`);
			setUsers((prev) => prev.filter((u) => (u._id || u.id) !== userId));
			toast.dismiss();
			toast.success("Usuario eliminado correctamente 🗑️");
		} catch (error) {
			toast.dismiss();
			toast.error("Error al eliminar usuario ❌");
			console.error("Error al eliminar usuario:", error);
		}
	};

	if (loading) return <Loader text="Cargando usuarios..." />;
	if (!users.length)
		return <p className="text-center text-gray-500 mt-4">No hay usuarios registrados.</p>;

	return (
		<div className="bg-white rounded-xl shadow-md border border-gray-100 mt-6">
			<CustomToaster />

			{/* DESKTOP */}
			<div className="hidden md:block overflow-x-auto">
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
						{users.map((user) => {
							const userId = user._id || user.id;
							return (
								<tr key={userId} className="hover:bg-gray-50 transition">
									<td className="px-4 py-3 font-semibold text-gray-700">{user.name}</td>
									<td className="px-4 py-3 text-gray-500">{user.email}</td>
									<td className="px-4 py-3 text-primary font-semibold capitalize">
										{user.role === "admin" ? "Administrador" : "Usuario"}
									</td>
									<td className="px-4 py-3 text-center">
										<div className="flex justify-center gap-4">
											<button
												onClick={() => onEdit(user)}
												className="text-blue-500 hover:text-blue-700 transition"
												title="Editar usuario"
											>
												<MdEdit size={18} />
											</button>
											<button
												onClick={() => handleDelete(userId)}
												className="text-red-500 hover:text-red-700 transition"
												title="Eliminar usuario"
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
				{users.map((user) => {
					const userId = user._id || user.id;
					return (
						<div key={userId} className="p-4">
							<p className="font-semibold text-gray-800">{user.name}</p>
							<p className="text-gray-500 text-sm">{user.email}</p>
							<p className="text-primary font-medium mt-1 capitalize">
								{user.role === "admin" ? "Administrador" : "Usuario"}
							</p>

							<div className="flex gap-4 mt-3">
								<button
									onClick={() => onEdit(user)}
									className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition text-sm"
								>
									<MdEdit /> Editar
								</button>
								<button
									onClick={() => handleDelete(userId)}
									className="flex items-center gap-1 text-red-500 hover:text-red-700 transition text-sm"
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
