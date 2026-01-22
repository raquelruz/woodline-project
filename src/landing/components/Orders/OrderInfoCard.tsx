import { memo, type ReactNode } from "react";

type OrderInfoCard = {
	icon: ReactNode;
	label: string;
	value: ReactNode | string | number;
}

export const OrderInfoCard = memo(({ icon, label, value }: OrderInfoCard) => (
	<div className="bg-border border-gray-200 rounded-xl p-5 flex flex-col items-start shadow-sm">
		<div className="mb-2">{icon}</div>
		<p className="text-sm text-gray-500">{label}</p>
		<p className="text-lg font-semibold text-gray-800 mt-1">{value}</p>
	</div>
));
