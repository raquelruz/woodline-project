import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en.json";
import translationES from "./locales/es.json";
import translationFR from "./locales/fr.json";
import translationDE from "./locales/de.json";


// i + 18letras + n
// i nternacionalizatio n

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ["es", "en", "fr", "de"],
        resources: {
            es: { translation: translationES },
            en: { translation: translationEN },
            fr: { translation: translationFR },
            de: { translation: translationDE }
        },
        fallbackLng: "es",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
