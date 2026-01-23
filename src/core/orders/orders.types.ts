export interface Order {
	id: string;
	_id?: string;
	userId?: string;
	products?: OrderProductPayload[];
	items?: OrderItem[];
	total: number;
	subtotal: number;
	tax: number;
	status: OrderStatus;
	createdAt: string;
}

export type OrderItem = {
	productId: string;
	quantity: number;
	price: number;
};

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type OrderWithBackendId = Order & {
	_id?: string;
};

export type OrderProductPayload = {
	productId: string;
	quantity: number;
	price: number;
	name: string;
};

export type CreateOrderPayload = {
	userId: string;
	products: OrderProductPayload[];
	subtotal: number;
	tax: number;
	total: number;
	status: "pending" | "paid" | "error";
	shippingAddress: string;
	billingAddress: string;
	paymentMethod: "credit_card" | "paypal" | string;
};