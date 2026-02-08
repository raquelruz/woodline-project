import { ProfileHeader } from "./ProfileHeader";
import { ProfileForm } from "./ProfileForm"
import { ProfileOrders } from "./ProfileOrders"
import { FavoritesSection } from "../../sections/FavoritesSection";
import { useTranslate } from "../../../translations/useTranslate";
import type { User } from "../../../core/auth/auth.type";
import type { Product } from "../../../core/products/products.types";
import type { Order } from "../../../core/orders/orders.types";

const inputClass =
    "w-full p-2 rounded border border-primary-light text-primary-light focus:ring-primary";
const saveButton =
    "bg-primary px-6 py-2 rounded text-white font-medium hover:bg-primary-light transition";

type ProfileContentProps = {
    user: User | null,
    favorites: Product[],
    profileForm: React.ComponentProps<typeof ProfileForm>,
    orders: {
        orders: Order[];
        viewOrder: (orderId: string | number) => void;
    }
}

export const ProfileContent = ({ user, favorites, profileForm, orders }: ProfileContentProps) => {
    const { t } = useTranslate();

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="font-title text-center text-primary font-bold mb-6">
                {t("auth.my_profile")}
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
