import { motion } from "framer-motion";
import { memo } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../translations/useTranslate";

export const Hero = memo(() => {
	const { t } = useTranslate();
	const navigate = useNavigate();

	// console.log("Render Hero");

	return (
		<section className="flex flex-col justify-center items-start max-h-[1080px] min-h-[600px] w-full bg-gradient-to-br from-primary/10 to-white px-6 rounded-b-4xl">
			<div className="max-w-[600px]">
				<motion.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="font-bold text-5xl text-primary leading-tight drop-shadow-md"
				>
					{t("pages.home.welcome_title")}{" "}
					<span className="text-primary-light">{t("pages.home.welcome_span")}</span>
				</motion.h1>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}
					className="mt-6 text-lg text-gray-600"
				>
					{t("pages.home.welcome_description")}
				</motion.p>

				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
					className="mt-10"
				>
					<button
						onClick={() => navigate("/products")}
						className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-light hover:translate-x-1 transition-all duration-300"
					>
						{t("pages.home.shop_now")} <FaArrowRight className="text-white text-sm" />
					</button>
				</motion.div>
			</div>
		</section>
	);
});
