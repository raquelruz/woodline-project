import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import { useProfileForm } from "../../hooks/useProfileForm";
import { useProfileOrders } from "../../hooks/useProfileOrders";
import { ProfileContent } from "../components/ProfileContent";

const Profile = () => {
	const { user, setUser } = useContext(AuthContext);
	const { favorites } = useContext(FavoritesContext);

	const profileForm = useProfileForm(user, setUser);
	const orders = useProfileOrders(user);

	if (!user) return <Navigate to="/login" replace />;

	return <ProfileContent user={user} favorites={favorites} profileForm={profileForm} orders={orders} />;
};

export default Profile;