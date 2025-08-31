import DropDownPicker from "react-native-dropdown-picker";
import {use, useEffect, useState} from "react";
import {Image, ImageStyle, StyleSheet, TouchableOpacity, View} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {styles} from "react-native-toast-message/lib/src/components/BaseToast.styles";
import {AppColors} from "../theme/AppTheme";
import i18n from "../utils/i18n";
import {saveLanguageUseCase} from "../../domain/use-cases/local-user/SaveLanguageUseCase";
import {getLanguageUseCase} from "../../domain/use-cases/local-user/GetLanguageUseCase";
import {UseUserLocalStorage} from "../hooks/UseUserLocalStorage";
import {LocalStorage} from "../../data/source/local/LocalStorage";
import {saveCurrencyUseCase} from "../../domain/use-cases/local-user/SaveCurrency";
import {stylesLanguageSelect} from "./LanguageSelect";


export const CurrencySelect = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>("ola");
    const {
        getCurrencyApp,
        currency} = UseUserLocalStorage()
    const [items, setItems] = useState([
        {
            label: "€",
            value: "€",
            icon: () => (
                <Image
                    source={require("../../../assets/eu-flag.png")}
                    style={stylesLanguageSelect.icon}
                />
            ),
        },
        {
            label: "$",
            value: "$",
            icon: () => (
                <Image
                    source={require("../../../assets/en-flag.png")}
                    style={stylesLanguageSelect.icon}
                />
            ),
        },
        {
            label: "£",
            value: "£",
            icon: () => (
                <Image
                    source={require("../../../assets/uk-flag.png")}
                    style={stylesLanguageSelect.icon}
                />
            ),
        },
        {
            label: "¥",
            value: "¥",
            icon: () => (
                <Image
                    source={require("../../../assets/japan-flag.png")}
                    style={stylesLanguageSelect.icon}
                />
            ),
        }
    ])

    return (
        <DropDownPicker
            setValue={(callback) => {
                const newValue = typeof callback === "function" ? callback(value) : callback;
                saveCurrencyUseCase(newValue);
                getCurrencyApp();
                console.log("newCurrency:", newValue);
            }}
            value={currency}
            items={items}
            setItems={setItems}
            open={open}
            labelStyle={stylesLanguageSelect.labelStyle}
            listItemLabelStyle={stylesLanguageSelect.labelStyle}
            containerStyle={stylesLanguageSelect.dropDownPicker}
            dropDownContainerStyle={stylesLanguageSelect.searchContainerStyle}
            style={stylesLanguageSelect.dropDownPicker}
            arrowIconStyle={stylesLanguageSelect.arrowStyle}
            tickIconStyle={stylesLanguageSelect.arrowStyle}
            setOpen={setOpen}/>
    )
}