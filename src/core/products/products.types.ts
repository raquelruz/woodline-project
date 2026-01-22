import type { Review } from "../types/types";

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

export type ProductWithBackendId = Product & {
    _id?: string;
}