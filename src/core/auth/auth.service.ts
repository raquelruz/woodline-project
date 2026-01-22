import type { User } from "./auth.type";

export const saveUserInLocalStorage = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const getUserFromLocalStorage = (): User | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) as User : null;
};

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
};

export const saveTokenInLocalStorage = (token: string) => {
    localStorage.setItem("token", token);
};

export const getTokenFromLocalStorage = (): string | null => {
    return localStorage.getItem("token");
};

export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("token");
};
