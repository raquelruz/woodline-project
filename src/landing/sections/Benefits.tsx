import handsIcon from "../../assets/icons/payment-icon.png";
import returnIcon from "../../assets/icons/return-icon.png";
import customerIcon from "../../assets/icons/headphone-icon.png";
import { BenefitCard } from "../components/BenefitCard";
import { useMemo } from "react";
import { useTranslate } from "../../translations/useTranslate";

export const Benefits = () => {
	const { t } = useTranslate();
	const benefits = useMemo(
		() => [
			{
				img: handsIcon,
				title: t("pages.home.payment_title"),
				description: t("pages.home.payment_description"),
			},
			{
				img: returnIcon,
				title: t("pages.home.returns"),
				description: t("pages.home.returns_description"),
			},
			{
				img: customerIcon,
				title: t("pages.home.customerservice_title"),
				description: t("pages.home.customerservice_description"),
			},
		],
		[]
	);

	return (
		<section className="py-24 bg-primary-ultralight">
			<div className="text-center mb-16">
				<h2 className="text-4xl font-title font-extrabold text-gray-800">
					<span className="text-primary">{t("pages.home.benefits_title")}</span>
				</h2>
				<p className="text-gray-500 mt-3">
					{t("pages.home.benefits_description")}
				</p>
			</div>

			<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
				{benefits.map((benefit, index) => (
					<BenefitCard key={index} img={benefit.img} title={benefit.title} description={benefit.description} />
				))}
			</div>
		</section>
	);
};
