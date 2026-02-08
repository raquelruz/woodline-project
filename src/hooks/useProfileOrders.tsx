import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../core/orders/useOrders";
import type { Order } from "../core/orders/orders.types";
import type { User } from "../core/auth/auth.type";

type UseProfileOrderResult = {
	orders: Order[];
	viewOrder: (orderId: string) => void;
	refetch: () => Promise<void>;
};

export const useProfileOrders = (user: User | null): UseProfileOrderResult => {
	const navigate = useNavigate();
	const { getUserOrders } = useOrders();

	const [orders, setOrders] = useState<Order[]>([]);

	const loadOrders = useCallback(async () => {
		if (!user?.id) return;

		const response = await getUserOrders(user.id);

		const sorted = [...response]
			.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
			.slice(0, 5);

		setOrders(sorted);
	}, [user?.id, getUserOrders]);

	useEffect(() => {
		void loadOrders();
	}, [loadOrders]);

	const viewOrder = (orderId: string) => {
		navigate(`/orders/${orderId}`);
	};

	return { orders, viewOrder, refetch: loadOrders };
};
