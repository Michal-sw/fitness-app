import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import englishTranslation from "./locales/en.json";
import polishTranslation from "./locales/pl.json";

// eslint-disable-next-line import/no-named-as-default-member
i18next.use(initReactI18next).init({
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

i18next.addResourceBundle("en", "translation", englishTranslation);
i18next.addResourceBundle("pl", "translation", polishTranslation);

export default i18next;
