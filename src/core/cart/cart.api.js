import api from "../http/axios.js";

// Crear carrito vacío
export const createCartApi = async () => {
	const res = await api.post("/carts", { items: [], status: "active" });
	return res.data;
};

// Obtener todos los carritos (opcional)
export const getCartsApi = async () => {
	const res = await api.get("/carts");
	return res.data;
};

// Actualizar carrito existente
export const updateCartApi = async (cartId, items) => {
	console.log(`📡 PATCH /carts/${cartId}`, { items });

	const res = await api.patch(`/carts/${cartId}`, {
		items,
		status: "active",
	});

	console.log("✅ Carrito actualizado:", res.data);
	return res.data;
};

// Eliminar carrito
export const deleteCartApi = async (cartId) => {
	const res = await api.delete(`/carts/${cartId}`);
	return res.data;
};
