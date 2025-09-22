import { useEffect, useState } from "react";
import { api } from "../../core/http/axios";

export const Users = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		api.get("/users")
			.then((response) => {
				console.log("Users data:", response.data);
				setUsers(response.data);
			})
			.catch((error) => {
				console.error("Error fetching users:", error);
				setError("Hubo un problema al cargar los usuarios.");
			})
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className="min-h-dvh bg-gray-100 px-6 py-12">
			<h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Página de Usuarios</h1>

			{loading ? (
				<p className="text-center text-gray-500">Cargando usuarios...</p>
			) : error ? (
				<p className="text-center text-red-500">{error}</p>
			) : users.length === 0 ? (
				<p className="text-center text-gray-500">No hay usuarios disponibles</p>
			) : (
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{users.map((user) => (
						<div
							key={user.id}
							className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
						>
							<h2 className="text-xl font-semibold text-gray-700 mb-2">{user.name}</h2>
							<p className="text-gray-600">{user.email}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
