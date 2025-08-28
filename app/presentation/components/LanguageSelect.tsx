import DropDownPicker from "react-native-dropdown-picker";
import {use, useEffect, useState} from "react";
import {Image, ImageStyle, StyleSheet, View} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {styles} from "react-native-toast-message/lib/src/components/BaseToast.styles";
import {AppColors} from "../theme/AppTheme";
import i18n from "../utils/i18n";
import {saveLanguageUseCase} from "../../domain/use-cases/local-user/SaveLanguageUseCase";
import {getLanguageUseCase} from "../../domain/use-cases/local-user/GetLanguageUseCase";
import {UseUserLocalStorage} from "../hooks/UseUserLocalStorage";
import {LocalStorage} from "../../data/source/local/LocalStorage";


export const LanguageSelect = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>("ola");
    const {
        setLanguageApp,
        language} = UseUserLocalStorage()
    const [items, setItems] = useState([
        {
            label: "EN",
            value: "en",
            icon: () => (
                <Image
                    source={require("../../../assets/en-flag.png")}
                    style={stylesLanguageSelect.icon}
                />
            ),
        },
        {
            label: "ES",
            value: "es",
            icon: () => (
                <Image
                    source={require("../../../assets/es-flag.png")}
                    style={stylesLanguageSelect.icon}
                />
            ),
        },
        {
            label: "SUO",
            value: "suo",
            icon: () => (
                <Image
                    source={require("../../../assets/suo-flag.png")}
                    style={stylesLanguageSelect.icon}
                />
            ),
        }
    ])

    return (
        <DropDownPicker
            setValue={(callback) => {
                const newValue = typeof callback === "function" ? callback(value) : callback;
                saveLanguageUseCase(newValue);
                setLanguageApp();
                console.log("newValue:", newValue);
                if (newValue) {
                    i18n.changeLanguage(newValue);
                }
            }}
            value={language}
            items={items}
            setItems={setItems}
            open={open}
            labelStyle={stylesLanguageSelect.labelStyle}
            listItemLabelStyle={stylesLanguageSelect.labelStyle}
            dropDownContainerStyle={stylesLanguageSelect.searchContainerStyle}
            style={stylesLanguageSelect.dropDownPicker}
            arrowIconStyle={stylesLanguageSelect.arrowStyle}
            tickIconStyle={stylesLanguageSelect.arrowStyle}
            setOpen={setOpen}/>
    )
}

const stylesLanguageSelect = StyleSheet.create({
    icon: {
        width: wp("5%"),
        resizeMode: "contain",
    },

    dropDownPicker: {
        backgroundColor: AppColors.darkGreen,
        color: AppColors.white,
        borderColor: AppColors.gray,
        width: wp("26%"),
        height: wp("1%"),
    },

    searchContainerStyle: {
        backgroundColor: AppColors.darkGreen,
        borderColor: AppColors.gray,
        zIndex: 999,
    },

    labelStyle: {
        color: AppColors.white,
        fontSize: wp("3%"),
    },

    container: {
        width: wp("5%"),
        height: wp("4%"),
    },

    arrowStyle: {
        tintColor: AppColors.white,
    } as ImageStyle,
})