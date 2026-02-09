export type CartProduct = {
	id?: string;
    productId: string;
	name: string;
	images: string[];
    quantity: number;
    price: number;
};

export type Cart = {
	_id?: string | null;  
	id: string | null;     
	userId?: string; 
	items: CartProduct[];
	total?: number;
	status?: CartStatusType | string;
	createdAt?: string;
	updatedAt?: string;
	products?: CartProduct[];
};

// export type CartStatus = "active" | "paid" | "pending" | "error" | "abandoned";

export const CARTSTATUS = {
	ACTIVE: "active",
	PAID: "paid",
	PENDING: "pending",
	ERROR: "error",
	ABANDONED: "abandoned",
} as const;

export type CartStatusType = typeof CARTSTATUS[keyof typeof CARTSTATUS];

export type EmptyCart = {
	id: null;
	items: [];
};