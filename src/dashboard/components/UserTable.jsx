import { memo, useEffect, useState } from "react";
import { api } from "../../core/http/axios";
import { MdEdit, MdDelete } from "react-icons/md";
import { Loader } from "../../landing/components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { CustomToaster } from "./CustomToaster";
import { useTranslate } from "../../translations/useTranslate";

export const UserTable = memo(({ onEdit }) => {
	const { t } = useTranslate();
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			setLoading(true);
			toast.loading(t("users.loading_users"));
			const response = await api.get("/users");
			const data = Array.isArray(response.data) ? response.data : [];
			setUsers(data);
			toast.dismiss();
			toast.success(t("users.loaded_users"));
		} catch (error) {
			toast.dismiss();
			toast.error(t("users.error_loading_users"));
			// console.error("Error al cargar usuarios:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (userId) => {
		const confirmDelete = window.confirm(t("users.confirm_delete_users"));
		if (!confirmDelete) return;

		try {
			toast.loading(t("users.deleting_users"));
			await api.delete(`/users/${userId}`);
			setUsers((prev) => prev.filter((u) => (u._id || u.id) !== userId));
			toast.dismiss();
			toast.success(t("users.deleted_user_success"));
		} catch (error) {
			toast.dismiss();
			toast.error(t("users.error_deleting_user"));
			// console.error(t("users.error_deleting_user"), error);
		}
	};

	if (loading) return <Loader text={t("users.loading_users")} />;
	if (!users.length)
		return <p className="text-center text-gray-500 mt-4">{t("users.no_registered_users")}</p>;

	return (
		<div className="bg-white rounded-xl shadow-md border border-gray-100 mt-6">
			<CustomToaster />

			{/* DESKTOP */}
			<div className="hidden md:block overflow-x-auto">
				<table className="min-w-full text-sm">
					<thead className="bg-primary text-white">
						<tr>
							<th className="text-left px-4 py-3 font-medium">{t("auth.name")}</th>
							<th className="text-left px-4 py-3 font-medium">{t("auth.email")}</th>
							<th className="text-left px-4 py-3 font-medium">{t("users.role")}</th>
							<th className="text-center px-4 py-3 font-medium">{t("common.actions")}</th>
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
										{user.role === "admin" ? t("users.admin") : t("users.user")}
									</td>
									<td className="px-4 py-3 text-center">
										<div className="flex justify-center gap-4">
											<button
												onClick={() => onEdit(user)}
												className="text-blue-500 hover:text-blue-700 transition"
												title={t("users.edit_user")}
											>
												<MdEdit size={18} />
											</button>
											<button
												onClick={() => handleDelete(userId)}
												className="text-red-500 hover:text-red-700 transition"
												title={t("users.delete_user")}
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
});
