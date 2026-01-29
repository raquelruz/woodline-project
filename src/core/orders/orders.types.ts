export const ORDER_STATUS = {
	PENDING: "pending",
	PROCESSING: "processing",
	DELIVERED: "delivered",
	CANCELLED: "cancelled",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const PAYMENT_STATUS = {
	PENDING: "pending",
	PAID: "paid",
	ERROR: "error",
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export type OrderItem = {
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
