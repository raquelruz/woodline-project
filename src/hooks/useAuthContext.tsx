import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import type { AuthContextValue } from "../core/auth/auth.type";

export const useAuthContext = (): AuthContextValue => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext debe ser usado dentro de un AuthProvider");
    }

    return context;
};
