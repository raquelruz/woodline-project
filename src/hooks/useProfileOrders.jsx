import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../core/orders/useOrders";

export const useProfileOrders = (user) => {
    const navigate = useNavigate();
    const { getUserOrders } = useOrders();

    const [orders, setOrders] = useState([]);

    const loadOrders = useCallback(async () => {
        if (!user?.id) return;

        const response = await getUserOrders(user.id);
        const sorted = response
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

        setOrders(sorted);
    }, [user, getUserOrders]);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    const viewOrder = (orderId) => navigate(`/orders/${orderId}`);

    return { orders, viewOrder };
};
