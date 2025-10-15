/**
 * Helpers de validación ficticia para la pasarela de pago.
 */

// Validar número de tarjeta (16 dígitos)
export function isValidCardNumber(input) {
	if (!input) return false;

	const normalized = String(input).replace(/\s+/g, "");

	if (normalized.length !== 16) return false;

	return !isNaN(normalized);
}

// Validar fecha de expiración en formato MM/AA (ficticio)
export function isValidExpiry(input) {
	if (!input) return false;

	const parts = input.split("/");
	if (parts.length !== 2) return false;

	const month = parseInt(parts[0], 10);
	const year = parseInt(parts[1], 10);

	if (isNaN(month) || month < 1 || month > 12) return false;

	if (isNaN(year) || parts[1].length !== 2) return false;

	return true;
}

// Validar CVV (3 dígitos)
export function isValidCVV(input) {
	if (!input) return false;

	const normalized = String(input).trim();

	if (normalized.length !== 3) return false;
	if (isNaN(normalized)) return false;

	return true;
}

// Validar titular de la tarjeta (mínimo 3 letras)
export function isValidHolder(input) {
	if (!input) return false;

	const normalized = String(input).trim();
	return normalized.length >= 3;
}

// Validar email de PayPal
export function isValidEmail(input) {
	if (!input) return false;

	const normalized = String(input).trim();

	return normalized.includes("@") && normalized.includes(".");
}
