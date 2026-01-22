export type CartProduct = {
    productId: string;
    quantity: number;
    price: number;
};

export type Cart = {
	_id?: string;  
	id?: string;     
	userId?: string; 
	products: CartProduct[];
	total: number;
	status: CartStatus | string;
	createdAt: string;
	updatedAt: string;
};

export type CartStatus = "active" | "paid" | "pending" | "error" | "abandoned";