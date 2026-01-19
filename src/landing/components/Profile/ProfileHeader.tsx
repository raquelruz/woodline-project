import { memo } from "react";

export const ProfileHeader = memo(({ user }) => {
	return (
		<div className="flex items-center gap-4">
			<div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
				{user.name?.[0] || "U"}
			</div>

			<div>
				<h2 className="text-xl font-semibold">{user.name || t("users.user")}</h2>
				<p className="text-gray-400">{user.email || t("auth.email_required")}</p>
			</div>
		</div>
	);
});
