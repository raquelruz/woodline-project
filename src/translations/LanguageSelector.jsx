import { useTranslation } from "react-i18next";

const LANGUAGES = ["es", "en", "fr", "de"];

export const LanguageSelector = () => {
	const { i18n } = useTranslation();

	const currentIndex = LANGUAGES.indexOf(i18n.language);
	const nextLanguage =
		LANGUAGES[(currentIndex + 1) % LANGUAGES.length];

	return (
		<button
			type="button"
			onClick={() => i18n.changeLanguage(nextLanguage)}
			className="
				h-8 w-8
				flex items-center justify-center
				rounded-full
				border border-primary/30
				text-[11px] font-semibold
				text-primary
				bg-white
				hover:bg-primary hover:text-white
				transition-colors duration-200
			"
			aria-label="Change language"
		>
			{i18n.language.toUpperCase()}
		</button>
	);
};
