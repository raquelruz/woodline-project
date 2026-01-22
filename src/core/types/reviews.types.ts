export interface Review {
	_id: string;
	userId?: {
		displayName?: string;
		name?: string;
		username?: string;
	} | string;
	rating: number;
	comment: string;
	createdAt: string;
	updatedAt: string;
};