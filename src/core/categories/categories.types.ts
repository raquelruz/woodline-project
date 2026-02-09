export type Category = {
    name: string;
    slug: string;
    description: string;
    image: string;
};

export type ProductForCategories = {
    category?: string[];
    images?: string[];
};