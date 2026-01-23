export type CartProduct = {
    productId: string;
	name: string;
	images: string[];
    quantity: number;
    price: number;
};

export type Cart = {
	_id?: string;  
	id?: string;     
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