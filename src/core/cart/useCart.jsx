import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { getCartApi, addToCartApi, updateCartItemApi, removeFromCartApi } from "./cart.api";
import { saveCartInLocalStorage } from "./cart.service";

export const useCart = () => {
	const { cart, setCart } = useContext(CartContext);

	// Obtener carrito del usuario
	const getCart = async () => {
		console.log("Carrito obtenido");
		const data = await getCartApi();
		setCart(data);
		saveCartInLocalStorage(data);
	};

	// Añadir un producto
	const addToCart = async (productId, quantity = 1) => {
		console.log(`Producto añadido: ${productId}, cantidad: ${quantity}`);
		const data = await addToCartApi(productId, quantity);
		setCart(data);
		saveCartInLocalStorage(data);
	};

	// Actualizar cantidad de productos
	const updateCartItem = async (productId, quantity) => {
		console.log(`Cantidad actualizada: ${productId}, cantidad: ${quantity}`);
		const data = await updateCartItemApi(productId, quantity);
		setCart(data);
		saveCartInLocalStorage(data);
	};

	// Eliminar un producto
	const removeFromCart = async (productId) => {
		console.log(`Producto eliminado: ${productId}`);
		const data = await removeFromCartApi(productId);
		setCart(data);
		saveCartInLocalStorage(data);
	};

	return {
		cart,
		getCart,
		addToCart,
		updateCartItem,
		removeFromCart,
	};
};
