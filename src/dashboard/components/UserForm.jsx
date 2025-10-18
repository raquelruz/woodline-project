import { MdAdd, MdClose } from "react-icons/md";
import { useUserForm } from "../hooks/useUserForm";

export const UserForm = ({ selectedUser, onSaved }) => {
	const { form, loading, showForm, setShowForm, handleChange, handleSubmit, resetForm } =
		useUserForm(selectedUser, onSaved);

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			{!showForm && (
				<button
					onClick={() => setShowForm(true)}
					className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light transition"
				>
					<MdAdd size={20} />
					Crear usuario nuevo
				</button>
			)}

			{showForm && (
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
					<div className="flex items-center justify-between mb-2">
						<h3 className="font-title font-semibold text-primary">
							{selectedUser ? "Editar usuario" : "Nuevo usuario"}
						</h3>
						<MdClose
							size={22}
							className="text-gray-400 hover:text-primary cursor-pointer transition"
							onClick={() => {
								setShowForm(false);
								resetForm();
							}}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<input
							type="text"
							name="name"
							value={form.name}
							onChange={handleChange}
							placeholder="Nombre completo"
							className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary"
							required
						/>
						<input
							type="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							placeholder="Correo electrónico"
							className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary"
							required
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<select
							name="role"
							value={form.role}
							onChange={handleChange}
							className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary"
						>
							<option value="user">Usuario</option>
							<option value="admin">Administrador</option>
						</select>

						<input
							type="password"
							name="password"
							value={form.password}
							onChange={handleChange}
							placeholder="Contraseña (opcional)"
							className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="bg-primary text-white py-2 rounded-md hover:bg-primary-light transition"
					>
						{loading ? "Guardando..." : selectedUser ? "Guardar cambios" : "Crear usuario"}
					</button>
				</form>
			)}
		</div>
	);
};
