import { memo } from "react";

export const OrderItems = memo(({ items }) => {
    if (items.length === 0)
        return <p className="text-gray-500">Tu carrito está vacío.</p>;

    return (
        <>
            {items.map((item) => (
                <div
                    key={item.productId || item.id}
                    className="flex justify-between border-b pb-2"
                >
                    <span>{item.name} x {item.quantity}</span>
                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                </div>
            ))}
        </>
    );
});
