export const PAYMENT_METHOD = {
	BIZUM: "bizum",
	CREDIT_CARD: "credit_card",
	PAYPAL: "paypal",
} as const;

export type PaymentMethod = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD] | (string & {});

export const PAYMENT_STATUS = {
	ERROR: "error",
	PAID: "paid",
	PENDING: "pending",
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
