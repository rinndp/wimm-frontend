import DropDownPicker from "react-native-dropdown-picker";
import {useEffect, useState} from "react";
import {Image, ImageStyle, Platform, StyleSheet} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {AppColors} from "../theme/AppTheme";
import i18n from "../utils/i18n";
import {saveLanguageUseCase} from "../../domain/use-cases/local-user/SaveLanguageUseCase";
import {UseUserLocalStorage} from "../hooks/UseUserLocalStorage";


export const LanguageSelect = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>("");
    const {
        getLanguageApp,
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
            setValue={async (callback) => {
                const newValue = typeof callback === "function" ? callback(value) : callback;
                await saveLanguageUseCase(newValue);
                await getLanguageApp();
                console.log("newValue:", newValue);
                if (newValue) {
                    await i18n.changeLanguage(newValue);
                }
            }}
            value={i18n.language ? i18n.language : "en"}
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
            placeholder={""}
            setOpen={setOpen}/>
    )
}

export const stylesLanguageSelect = StyleSheet.create({
    icon: {
        width: wp("5%"),
        height: wp("5%"),
        resizeMode: "contain",
    },

    dropDownPicker: {
        backgroundColor: AppColors.darkGreen,
        color: AppColors.white,
        borderColor: AppColors.gray,
        width: wp("27%"),
        height: wp("3%"),
    },

    searchContainerStyle: {
        height: Platform.OS === "ios" ? hp("13.5%") : hp("14.5%"),
        backgroundColor: AppColors.darkGreen,
        borderColor: AppColors.gray,
        zIndex: 999,
    },

    labelStyle: {
        color: AppColors.white,
        fontFamily: "zen_kaku_regular",
        fontSize: wp("3%"),
    },

    arrowStyle: {
        tintColor: AppColors.white,
    } as ImageStyle,
})