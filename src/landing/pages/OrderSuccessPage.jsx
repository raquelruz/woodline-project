import { Link } from "react-router-dom";
import { useTranslate } from "../../translations/useTranslate";

const OrderSuccessPage = () => {
	const { t } = useTranslate();

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-bg-light px-6">
			<div className="bg-white rounded-2xl shadow-lg p-8 w-[350px] max-w-[1290px] text-center">
				<div className="flex justify-center mb-6">
					<div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary-light">
						<span className="text-white text-3xl">✔</span>
					</div>
				</div>

				<h1 className="font-title font-bold text-primary mb-3">¡{t("orders.successful_order")}</h1>
				<p className="text-gray-600 mb-6">{t("orders.successful_order_message")}</p>

				<Link
					to="/products"
					className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition"
				>
					{t("orders.continue_shopping")}
				</Link>
			</div>
		</div>
	);
};

export default OrderSuccessPage;
