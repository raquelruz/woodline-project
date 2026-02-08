import { useContext, type Dispatch, type SetStateAction } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import { useProfileForm } from "../../hooks/useProfileForm";
import { useProfileOrders } from "../../hooks/useProfileOrders";
import { ProfileContent } from "../components/Profile/ProfileContent";
import type { User } from "../../core/auth/auth.type";
import type { FavoritesContextType } from "../../core/favorites/favorites.types";

type AuthContextShape = {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
};

const Profile = () => {
	const { user, setUser } = useContext(AuthContext) as AuthContextShape;
	const { favorites } = useContext(FavoritesContext) as FavoritesContextType;

	if (!user) return <Navigate to="/login" replace />;

	const profileForm = useProfileForm(user, setUser);
	const orders = useProfileOrders(user);

	return <ProfileContent user={user} favorites={favorites} profileForm={profileForm} orders={orders} />;
};

export default Profile;
