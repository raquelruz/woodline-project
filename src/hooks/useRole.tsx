import { useCallback, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useRole() {
    const { user } = useContext(AuthContext);

    const hasRole = useCallback(
        (roles) => {
            if (!user || !user.role) return false;
            if (Array.isArray(roles)) return roles.includes(user.role);
            return user.role === roles;
        },
        [user]
    );

    return { hasRole };
}
