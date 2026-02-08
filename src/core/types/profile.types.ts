import type { Order, OrderWithBackendId } from "../orders/orders.types";

export interface ProfileFormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address: string;
}

export type UseProfileFormResult = {
	formData: ProfileFormData;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleSave: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
	loading: boolean;
	error: string | null;
	success: boolean;
};

export type UseProfileOrderResult = {
	orders: Order[];
	viewOrder: (orderId: string) => void;
	refetch: () => Promise<void>;
};

export type UseProfileOrdersResult = {
	orders: OrderWithBackendId[];
	viewOrder: (orderId: string) => void;
	refetch: () => Promise<void>;
};