// Calcular subtotal
export const calculateSubtotal = (items) =>
	items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

// Calcular impuestos
export const calculateTax = (subtotal, rate = 0.21) => subtotal * rate;

// Normalizar número a 2 decimales
export const toCurrency = (num) => Number(num.toFixed(2));

// Construir payload de pedido
export const buildOrderPayload = (userId, items, { shippingAddress, billingAddress, paymentMethod }) => {
	const subtotal = calculateSubtotal(items);
	const tax = calculateTax(subtotal);
	const total = subtotal + tax;

	return {
		userId,
		products: items.map((item) => ({
			productId: item.productId || item.id,
			quantity: item.quantity || 1,
			price: toCurrency(item.price),
			name: item.name,
		})),
		subtotal: toCurrency(subtotal),
		tax: toCurrency(tax),
		total: toCurrency(total),
		status: "pending",
		shippingAddress: shippingAddress || "Dirección no especificada",
		billingAddress: billingAddress || shippingAddress || "Dirección no especificada",
		paymentMethod: paymentMethod || "credit_card",
	};
};
