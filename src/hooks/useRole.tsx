import { useCallback } from "react";
import type { Role } from "../core/auth/auth.type";
import { useAuthContext } from "./useAuthContext";

type RoleInput = Role | Role[];

type UseRoleResult = {
	hasRole: (roles: RoleInput) => boolean;
};

export const useRole = (): UseRoleResult => {
	const { user } = useAuthContext();

	const hasRole = useCallback(
		(roles: RoleInput) => {
			if (!user?.role) return false;

			return Array.isArray(roles) ? roles.includes(user.role) : user.role === roles;
		},
		[user?.role],
	);

	return { hasRole };
};
