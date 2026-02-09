import { memo } from "react";
import type { User } from "../../../core/auth/auth.type";
import { useTranslate } from "../../../translations/useTranslate";

type ProfileHeaderProps = {
	user: User | null;
};

export const ProfileHeader = memo(({ user }: ProfileHeaderProps) => {
	const { t } = useTranslate();

	const initial = user?.name?.[0]?.toUpperCase() ?? "U";

	return (
		<div className="flex items-center gap-4">
			<div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
				{initial}
			</div>

			<div>
				<h2 className="text-xl font-semibold">{user?.name || t("users.user")}</h2>
				<p className="text-gray-400">{user?.email || t("auth.email_required")}</p>
			</div>
		</div>
	);
});
