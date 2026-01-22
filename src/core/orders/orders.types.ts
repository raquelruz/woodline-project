export interface Order {
    id: string;
    _id?: string;
    total: number;
    status: OrderStatus;
    createdAt: string;
    items: OrderItem[];
};

export type OrderItem = {
	productId: string;
	quantity: number;
	price: number;
};

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type OrderWithBackendId = Order & {
    _id?: string;
}