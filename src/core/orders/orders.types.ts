import type { PaymentStatus } from "../types/payment.types";

export const ORDER_STATUS = {
	PENDING: "pending",
	PROCESSING: "processing",
	DELIVERED: "delivered",
	CANCELLED: "cancelled",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export type OrderItem = {
	name: string;
	productId: string;
	quantity: number;
	price: number;
};

export type OrderProductPayload = {
	productId: string;
	quantity: number;
	price: number; // number para backend
	name: string;
};

export interface Order {
	id: string;
	_id?: string;
	orderId?: string;
	userId?: string;
	products?: OrderProductPayload[];
	items?: OrderItem[];
	total: number;
	subtotal: number;
	tax: number;
	status: OrderStatus;
	createdAt: string;
	placedAt?: string;
}

export type CreateOrderPayload = {
	userId: string;
	products: OrderProductPayload[];
	subtotal: number;
	tax: number;
	total: number;
	status: OrderStatus;
	paymentStatus: PaymentStatus;
	shippingAddress: string;
	billingAddress: string;
	paymentMethod: "credit_card" | "paypal" | (string & {});
};

export type OrderStatusChangeHandler = (orderId: string, newStatus: OrderStatus) => void;

export type OrderComponentProps = {
	order: Order;
	onChange: OrderStatusChangeHandler;
};
