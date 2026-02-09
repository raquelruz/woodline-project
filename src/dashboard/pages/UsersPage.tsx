import { memo, useState } from "react";
import { UserForm } from "../components/UserForm";
import { UserTable } from "../components/UserTable";
import { useTranslate } from "../../translations/useTranslate";
import type { User } from "../../core/auth/auth.type";

const UsersPage = memo(() => {
	const { t } = useTranslate();

    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleUserSaved = () => {
        window.location.reload();
    }

	return (
		<section>
			<h2 className="font-title text-center font-bold text-primary mb-4">{t("pages.dashboard.users_title")}</h2>
			<p className="text-gray-600 text-center mb-4">{t("pages.dashboard.users_description")}</p>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
				<UserForm selectedUser={selectedUser} onSaved={handleUserSaved} />
                <UserTable onEdit={(user) => setSelectedUser(user)} />
			</div>
		</section>
	);
});

export default UsersPage;