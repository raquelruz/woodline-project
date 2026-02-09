import type { InputValue } from "../core/types/types";

/**
 * Helpers de validación ficticia para la pasarela de pago.
 */

// Validar número de tarjeta (16 dígitos)
export const isValidCardNumber = (input: InputValue): boolean => {
	if (!input) return false;

	const normalized = String(input).replace(/\s+/g, "");

	if (normalized.length !== 16) return false;

	return !Number.isNaN(Number(normalized));
};

// Validar fecha de expiración en formato MM/AA (ficticio)
export const isValidExpiry = (input: InputValue): boolean => {
	if (!input) return false;

	const parts = String(input).split("/");
	if (parts.length !== 2) return false;

	const [monthStr, yearStr] = parts;
	const month = Number(monthStr);
	const year = Number(yearStr);

	if (Number.isNaN(month) || month < 1 || month > 12) return false;
	if (Number.isNaN(year) || yearStr.length !== 2) return false;

	return true;
};

// Validar CVV (3 dígitos)
export const isValidCVV = (input: InputValue): boolean => {
	if (!input) return false;

	const normalized = String(input).trim();

	if (normalized.length !== 3) return false;

	return !Number.isNaN(Number(normalized));
};

// Validar titular de la tarjeta (mínimo 3 letras)
export const isValidHolder = (input: InputValue): boolean => {
	if (!input) return false;

	const normalized = String(input).trim();

	return normalized.length >= 3;
};

// Validar email de PayPal
export const isValidEmail = (input: InputValue): boolean => {
	if (!input) return false;

	const normalized = String(input).trim();

	return normalized.includes("@") && normalized.includes(".");
};