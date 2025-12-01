import { memo } from "react";
import { toCurrency } from "../../../helpers/orders.helpers";

export const OrderSummary = memo(({ subtotal, tax, total }) => {
    // console.log("Render OrderSummary")

    return (
        <div className="pt-4 border-t border-primary text-gray-600 space-y-2">
            <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{toCurrency(subtotal)} €</span>
            </div>

            <div className="flex justify-between">
                <span>IVA (21%)</span>
                <span>{toCurrency(tax)} €</span>
            </div>

            <div className="flex justify-between font-bold text-lg text-primary border-t pt-2">
                <span>Total</span>
                <span>{toCurrency(total)} €</span>
            </div>
        </div>
    );
});
