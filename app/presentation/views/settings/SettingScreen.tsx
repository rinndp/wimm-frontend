import {Dimensions, Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import stylesHome from "../debtors/StylesHome";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import UseUserLocalStorage from "../../hooks/UseUserLocalStorage";
import {useTranslation} from "react-i18next";
import stylesDebtorDetails from "../debtor-details/StylesDebtorDetails";
import stylesTabBar from "../auth/StylesTabBar";
import {LanguageSelect} from "../../components/LanguageSelect";
import {stylesSettings} from "./StylesSettings";
import stylesLogin from "../auth/StylesLogin";
import {styles} from "react-native-toast-message/lib/src/components/BaseToast.styles";
import {CurrencySelect} from "../../components/CurrencySelect";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";



export const SettingScreen = ({navigation = useNavigation()}: PropsStackNavigation) => {
    const {
        deleteUserSession,
        user,
    } = UseUserLocalStorage()

    const {t} = useTranslation()

    return (
        <ImageBackground
            source={require("../../../../assets/background.jpg")}
            style={{width:Dimensions.get("window").width, height:"100%"}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require("../../../../assets/go-back-arrow-icon.png")}
                       style={stylesDebtorDetails.goBackIcon}/>
            </TouchableOpacity>
            <View style={stylesSettings.container}>
                <View style={{flexDirection: "row", gap: wp("10%"), alignSelf: "center"}}>
                    <View style={stylesSettings.languageSelectContainer}>
                        <Text style={stylesSettings.label}>{t("language")}</Text>
                        <LanguageSelect/>
                    </View>
                    <View style={stylesSettings.languageSelectContainer}>
                        <Text style={stylesSettings.label}>{t("currency")}</Text>
                        <CurrencySelect/>
                    </View>
                </View>
                <TouchableOpacity style={stylesSettings.logOutContainer}
                                  onPress={() => deleteUserSession()
                                      .then(() => navigation.replace("TabViewLoginRegister"))}>
                    <Text style ={stylesSettings.logOutText}>{t("log out")}</Text>
                    <Image source={require("../../../../assets/log-out-icon.png")}
                           style={stylesSettings.logOutIcon}/>
                </TouchableOpacity>
            </View>
        </ImageBackground>

    )
}