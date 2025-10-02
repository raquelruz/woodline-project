export const ProfileHeader = ({ user }) => {
	return (
		<div className="flex items-center gap-4">
			<div className="w-16 h-16 rounded-full bg-primary-hover flex items-center justify-center text-2xl font-bold">
				{user.name?.[0] || "U"}
			</div>

			<div>
				<h2 className="text-xl font-semibold">{user.name || "Usuario"}</h2>
				<p className="text-gray-400">{user.email || "Email no disponible"}</p>
			</div>
		</div>
	);
};
