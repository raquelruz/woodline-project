export const PAYMENT_METHOD = {
	CREDIT_CARD: "credit_card",
	PAYPAL: "paypal",
} as const;

export type PaymentMethod = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

export const PAYMENT_STATUS = {
	ERROR: "error",
	PAID: "paid",
	PENDING: "pending",
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
