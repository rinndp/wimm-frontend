import DropDownPicker from "react-native-dropdown-picker";
import {useState} from "react";
import {Image} from "react-native";
import {AppColors} from "../theme/AppTheme";
import {UseUserLocalStorage} from "../hooks/UseUserLocalStorage";
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
            setValue={async (callback) => {
                const newValue = typeof callback === "function" ? callback(value) : callback;
                await saveCurrencyUseCase(newValue);
                await getCurrencyApp();
                console.log("newCurrency:", newValue);
            }}
            value={currency || "€"}
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
            badgeTextStyle={{color: AppColors.green}}
            placeholder={""}
            setOpen={setOpen}/>
    )
}