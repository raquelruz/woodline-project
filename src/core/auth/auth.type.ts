import type { Order } from "../orders/orders.types";

export interface User {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
	name: string;
	displayName: string;
	email: string;
	bio?: string;
	phoneNumber?: string;
	avatar?: string;
	address?: string;
	role: Role;
	verified: boolean;
	isActive: boolean;
	favoritos: string[];
	orders: Order[];
	createdAt: string;
	updatedAt: string;
}

export type UserFormState = {
	name: string;
	email: string;
	role: Role;
	password: string;
};

export type UserUpsertPayload = {
	name: string;
	email: string;
	role: Role;
	password?: string;
};

// export type UserRole = "admin" | "user";

export const ROLES = {
	ADMIN: "admin",
	USER: "user",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export type AuthContextType = {
	user: User | null;
	setUser: (value: User | null) => void;
	loading: boolean;
}

export type LoginPayload = {
	email: string;
	password: string;
};

export type RegisterPayload = {
	name: string;
	email: string;
	password: string;
};

export type AuthContextValue = {
	user: User | null;
	loading: boolean;
}

export type AuthContextShape = {
	user: { id: string } | null;
};

export type AuthResponse = {
	user: User;
	token: string;
};

export type LogoutResponse = {
	logout: boolean;
};

export type UserBackend = User & { _id?: string };
