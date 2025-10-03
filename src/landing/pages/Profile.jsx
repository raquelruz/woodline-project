import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../../core/http/axios";
import { useOrders } from "../../core/orders/useOrders";
import { ProfileHeader } from "../components/Profile/ProfileHeader";
import { ProfileForm } from "../components/Profile/ProfileForm";
import { ProfileOrders } from "../components/Profile/ProfileOrders";

const inputClass = "w-full p-2 rounded border border-primary-light text-primary-light focus:ring-primary";
const saveButton = "bg-primary px-6 py-2 rounded text-white font-medium hover:bg-primary-light transition";

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
			getUserOrders(user.id).then((response) => {
				const sorted = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const { data } = await api.patch(`/users/${user.id}`, formData);
			setUser(data);
			setSuccess(true);
		} catch (error) {
			setError(error.response?.data?.message || "Error al guardar cambios");
		} finally {
			setLoading(false);
		}
	};

	const handleViewOrder = (orderId) => {
		navigate(`/orders/${orderId}`);
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="font-title text-center text-primary font-bold mb-6">Mi Perfil</h1>

			<div className="text-primary rounded-xl shadow-lg p-6 space-y-6">
				<ProfileHeader user={user} />
				<ProfileForm
					formData={formData}
					handleChange={handleChange}
					handleSave={handleSave}
					loading={loading}
					error={error}
					success={success}
					inputClass={inputClass}
					saveButton={saveButton}
				/>
				<ProfileOrders orders={orders} handleViewOrder={handleViewOrder} />
			</div>
		</div>
	);
};
