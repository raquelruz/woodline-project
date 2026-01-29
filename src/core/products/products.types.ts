import type { Review } from "../types/reviews.types";
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
};

export type Filters = {
    minPrice?: number;
    maxPrice?: number;
    sort?: SortOption;
};

export const SORT = {
    NONE: "none",
    PRICE_ASC: "priceAsc",
    PRICE_DESC: "priceDesc",
} as const;

export type SortOption = typeof SORT[keyof typeof SORT];

export type ProductWithBackendId = Product & {
    _id?: string;
};