export interface Product {
    id: string;
    sku: string;
    name: string;
    description: string;
    longDescription?: string;
    price: number;
    releaseDate: Date;
    images: string[];
    reviews: Review[];
    category: string[];
    createdAt: string;
    updatedAt: string;
}

// Añadir reviews, no se usa (lo borraría en algún punto)
export type Review = unknown;

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
    role: UserRole;
    verified: boolean;
    isActive: boolean;
    favoritos: string[];
    orders: Order[];
    createdAt: string;
    updatedAt: string;
}

export type UserRole = "admin" | "user";

export interface Order {
    id: string;
    total: number;
    status: OrderStatus;
    createdAt: string;
    items: OrderItem[];
}

export type OrderItem = {
	productId: string;
	quantity: number;
	price: number;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

