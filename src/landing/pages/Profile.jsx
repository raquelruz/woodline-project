import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../../core/http/axios";
import { useOrders } from "../../core/orders/useOrders";

const inputClass = "w-full p-2 rounded border border-primary-hover text-primary-hover";
const saveButton = "bg-primary-hover px-6 py-2 rounded text-white font-medium hover:bg-primary-hover transition";

export const Profile = () => {
	const { user, setUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		address: "",
	});

	const { getUserOrders } = useOrders();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (user?.id) {
			console.log("Usuario logueado:", user);

			getUserOrders(user.id).then((response) => {
				console.log("Pedidos recibidos en Profile:", response);

				const sorted = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

				console.log("Pedidos ordenados:", sorted);

				setOrders(sorted.slice(0, 5));
			});
		}
	}, [user]);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	if (!user) return <Navigate to="/login" replace />;

	useEffect(() => {
		setFormData({
			firstName: user.name || "",
			lastName: user.lastName || "",
			email: user.email || "",
			phone: user.phone || "",
			address: user.address || "",
		});
	}, [user]);

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSave = async (event) => {
		event.preventDefault();
		console.log("Guardando datos de perfil:", formData);

		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const { data } = await api.patch(`/users/${user.id}`, formData);
			console.log("Perfil actualizado en la API:", data);
			setUser(data);
			setSuccess(true);
		} catch (error) {
			console.error("Error al guardar cambios:", error.response?.data || error.message);
			setError(error.response?.data?.message || "Error al guardar cambios");
		} finally {
			setLoading(false);
		}
	};

	// Navegar a detalle de pedido
	const handleViewOrder = (orderId) => {
		console.log("Ver detalle del pedido:", orderId);
		navigate(`/orders/${orderId}`);
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="font-title text-center text-primary-pressed font-bold mb-6">Mi Perfil</h1>

			<div className=" text-primary-pressed rounded-xl shadow-lg p-6 space-y-6">
				{/* Cabecera usuario */}
				<div className="flex items-center gap-4">
					<div className="w-16 h-16 rounded-full bg-primary-hover flex items-center justify-center text-2xl font-bold">
						{user.name?.[0] || "U"}
					</div>
					<div>
						<h2 className="text-xl font-semibold">{user.name || "Usuario"}</h2>
						<p className="text-gray-400">{user.email || "Email no disponible"}</p>
					</div>
				</div>

				{/* Información de usuario */}
				<form className="space-y-4" onSubmit={handleSave}>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-primary-hover mb-1">Nombre</label>
							<input
								type="text"
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								className={inputClass}
							/>
						</div>
						<div>
							<label className="block text-primary-hover mb-1">Apellidos</label>
							<input
								type="text"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								className={inputClass}
							/>
						</div>
					</div>

					<div>
						<label className="block text-primary-hover mb-1">Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className={inputClass}
						/>
					</div>

					<div>
						<label className="block text-primary-hover mb-1">Teléfono</label>
						<input
							type="text"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							className={inputClass}
						/>
					</div>

					<div>
						<label className="block text-primary-hover mb-1">Dirección</label>
						<input
							type="text"
							name="address"
							value={formData.address}
							onChange={handleChange}
							className={inputClass}
						/>
					</div>

					{error && <p className="text-red-500">{error}</p>}
					{success && <p className="text-green-500">Perfil actualizado correctamente</p>}

					<button type="submit" disabled={loading} className={saveButton}>
						{loading ? "Guardando..." : "Guardar cambios"}
					</button>
				</form>

				{/* Últimos pedidos */}
				<div className="mt-10">
					<h2 className="text-2xl font-semibold mb-4">Últimos pedidos</h2>
					{orders.length === 0 ? (
						<p className="text-gray-500">No tienes pedidos recientes.</p>
					) : (
						<ul className="space-y-4">
							{orders.map((order, index) => (
								<li
									key={order._id || order.id || index}
									className="border rounded p-4 shadow-sm flex justify-between items-center"
								>
									<div>
										<p className="font-medium">Pedido #{order._id || order.id}</p>
										<p className="text-sm text-gray-500">
											{new Date(order.createdAt).toLocaleDateString()}
										</p>
									</div>
									<div className="text-right flex flex-col gap-2">
										<p className="font-semibold text-primary-hover">{order.total} €</p>
										<button
											onClick={() => handleViewOrder(order._id || order.id)}
											className="text-sm text-blue-600 hover:underline"
										>
											Ver detalle
										</button>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};
