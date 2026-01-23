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
	status?: CartStatus | string;
	createdAt?: string;
	updatedAt?: string;
	products?: CartProduct[];
};

export type CartStatus = "active" | "paid" | "pending" | "error" | "abandoned";

export type EmptyCart = {
	id: null;
	items: [];
};