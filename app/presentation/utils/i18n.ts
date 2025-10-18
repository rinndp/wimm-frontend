import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "../languages/en/translation.json";
import es from "../languages/es/translation.json";
import suo from "../languages/suo/translation.json";
import {useState} from "react";
import {getLanguageUseCase} from "../../domain/use-cases/local-user/GetLanguageUseCase";
import {UseUserLocalStorage} from "../hooks/UseUserLocalStorage";

const resources = {
    en: { translation: en },
    es: { translation: es },
    suo: { translation: suo },
};


const initI18n = async () => {
    const savedLanguage = await AsyncStorage.getItem("wimm_language");
    const language = savedLanguage ? JSON.parse(savedLanguage) : "en";

    i18n.use(initReactI18next).init({
        resources,
        lng: language,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });
};

initI18n();

export default i18n;
