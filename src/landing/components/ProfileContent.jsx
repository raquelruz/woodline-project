import { ProfileHeader } from "../components/Profile/ProfileHeader.jsx"
import { ProfileForm } from "../components/Profile//ProfileForm.jsx"
import { ProfileOrders } from "../components/Profile/ProfileOrders.jsx"
import { FavoritesSection } from "../sections/FavoritesSection.jsx";

const inputClass =
    "w-full p-2 rounded border border-primary-light text-primary-light focus:ring-primary";
const saveButton =
    "bg-primary px-6 py-2 rounded text-white font-medium hover:bg-primary-light transition";

export const ProfileContent = ({ user, favorites, profileForm, orders }) => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="font-title text-center text-primary font-bold mb-6">
                Mi Perfil
            </h1>

            <div className="text-primary rounded-xl shadow-lg p-6 space-y-6">
                <ProfileHeader user={user} />

                <ProfileForm
                    {...profileForm}
                    inputClass={inputClass}
                    saveButton={saveButton}
                />

                <ProfileOrders
                    orders={orders.orders}
                    handleViewOrder={orders.viewOrder}
                />

                <FavoritesSection favorites={favorites} />
            </div>
        </div>
    );
};
