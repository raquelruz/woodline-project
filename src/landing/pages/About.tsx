import { memo } from "react";
import aboutImage from "../../assets/images/team-img.jpg";
import { FaLeaf, FaHandshake, FaCouch } from "react-icons/fa";
import { useTranslate } from "../../translations/useTranslate";

const aboutClass = "text-gray-700 leading-relaxed";

const About = memo(() => {
	const { t } = useTranslate();

	return (
		<section className="bg-gradient-to-b from-white to-gray-50 py-20">
			<div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
				<div className="md:w-1/2 relative group">
					<img
						src={aboutImage}
						alt="Equipo Woodline Living"
						className="rounded-3xl shadow-xl w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
					/>
					<div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-all" />
				</div>

				<div className="md:w-1/2 flex flex-col gap-5">
					<h2 className="text-4xl font-title font-bold text-primary mb-2">{t("pages.about.about_title")}</h2>

					<p className={aboutClass}>{t("pages.about.about_description")}</p>

					<div className="pt-6">
						<a
							href="/products"
							className="inline-block bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-light transition-all"
						>
							{t("pages.about.about_button")}
						</a>
					</div>
				</div>
			</div>

			<div className="max-w-6xl mx-auto px-6 mt-20">
				<h3 className="font-title font-semibold text-center text-primary mb-10">
					{t("pages.about.values_title")}
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
					<div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-all">
						<FaLeaf className="text-4xl text-primary mx-auto mb-4" />
						<h4 className="font-title font-semibold text-gray-800 mb-2">
							{t("pages.about.sustainability_title")}
						</h4>
						<p className="text-sm text-gray-600">{t("pages.about.sustainability_description")}</p>
					</div>

					<div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-all">
						<FaCouch className="text-4xl text-primary mx-auto mb-4" />
						<h4 className="font-title font-semibold text-gray-800 mb-2">{t("pages.about.design_title")}</h4>
						<p className="text-sm text-gray-600">{t("pages.about.design_description")}</p>
					</div>

					<div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-all">
						<FaHandshake className="text-4xl text-primary mx-auto mb-4" />
						<h4 className="font-title font-semibold text-gray-800 mb-2">
							{t("pages.about.commitment_title")}
						</h4>
						<p className="text-sm text-gray-600">{t("pages.about.commitment_description")}</p>
					</div>
				</div>
			</div>
		</section>
	);
});

export default About;
