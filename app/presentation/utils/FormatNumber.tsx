import UseUserLocalStorage from "../hooks/UseUserLocalStorage";
import i18n from "./i18n";

export const formatNumber = (number: number) => {
    return number > 1e4 ? number.toExponential(1) : new Intl.NumberFormat(i18n.language === "en" ?"en-US":"es-EN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number)
}