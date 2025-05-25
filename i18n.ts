import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import esTranslation from "./locales/es.json";
import frTranslation from "./locales/fr.json";
import ptTranslation from "./locales/pt.json";
import cnTranslation from "./locales/cn.json";
import jpTranslation from "./locales/jp.json";
import deTranslation from "./locales/de.json";
import hiTranslation from "./locales/hi.json";
import koTranslation from "./locales/ko.json";
import itTranslation from "./locales/it.json";
import ruTranslation from "./locales/ru.json";


i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    es: { translation: esTranslation },
    fr: { translation: frTranslation },
    pt: { translation: ptTranslation },
    cn: { translation: cnTranslation },
    jp: { translation: jpTranslation },
    de: { translation: deTranslation },
    ko: { translation: koTranslation },
    ru: { translation: ruTranslation },
    it: { translation: itTranslation },
    hi: { translation: hiTranslation },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
