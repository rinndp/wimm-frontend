import {ActivityIndicator, Dimensions, Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import stylesHome from "../debtors/StylesHome";
import React, {useCallback, useEffect, useState} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import UseUserLocalStorage from "../../hooks/UseUserLocalStorage";
import {useTranslation} from "react-i18next";
import stylesDebtorDetails from "../debtor-details/StylesDebtorDetails";
import {LanguageSelect} from "../../components/LanguageSelect";
import {stylesSettings} from "./StylesSettings";
import {CurrencySelect} from "../../components/CurrencySelect";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {settingsViewModel} from "./ViewModel";
import {formatNumber} from "../../utils/FormatNumber";
import {AppColors} from "../../theme/AppTheme";



export const SettingScreen = ({navigation = useNavigation()}: PropsStackNavigation) => {
    const {
        deleteUserSession,
        user,
        getUserSession,
        getCurrencyApp,
        currency,
    } = UseUserLocalStorage()


    const {
        userEmail,
        getUserInfo,
        getUserStatistics,
        userStatistics,
        showLoading,
    } = settingsViewModel()

    useFocusEffect(
        useCallback(() => {
            if (user?.slug !== undefined) {
                const loadUserInfo = async () => {
                    await getUserInfo();
                    await getUserStatistics(user.slug);

                }
                loadUserInfo();
            }
        }, [user?.slug])
    )

    const {t} = useTranslation()

    return (
        <ImageBackground
            source={require("../../../../assets/background.jpg")}
            style={{width:Dimensions.get("window").width, height:"100%"}}>
            {showLoading ? (
            <>
                <View style={stylesHome.loadingIconContainer}>
                    <ActivityIndicator style={stylesHome.loading} size="large" color="#ffffff" animating={showLoading}/>
                </View>
            </>
            ):(
            <>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../../../../assets/go-back-arrow-icon.png")}
                           style={stylesDebtorDetails.goBackIcon}/>
                </TouchableOpacity>
                <View style={stylesSettings.container}>
                    <View style={stylesSettings.userInfoContainer}>
                        <Text style={{...stylesHome.textHome, fontSize: wp("4%")}}>{t("account info")}</Text>
                        <Text style={stylesHome.textHome}>{userEmail}</Text>
                        <View style={{flexDirection: "row", alignItems:"center", marginTop: hp("4%")}}>
                            <View style={stylesSettings.statisticContainer}>
                                <Text style={stylesSettings.statisticText}>{t("debtors")}</Text>
                                <Text style={stylesSettings.statisticText}>{t("debt")}</Text>
                            </View>
                            <View style={stylesSettings.statisticContainer}>
                                <Text style={stylesSettings.statisticValue}>{userStatistics?.number_of_debtors}</Text>
                                <Text style={stylesSettings.statisticValue}>{userStatistics?.total_debts ? formatNumber(userStatistics?.total_debts) : "null"}{currency || "€"}</Text>
                            </View>
                            <Image style={stylesHome.textMoneyIcon}
                                   source={require("../../../../assets/arrow-up.png")}/>
                        </View>
                        <View style={{flexDirection: "row", marginTop: hp("4%"), alignItems:"center"}}>
                            <View style={stylesSettings.statisticContainer}>
                                <Text style={stylesSettings.statisticText}>{t("creditors")}</Text>
                                <Text style={stylesSettings.statisticText}>{t("credit")}</Text>
                                <Text style={{...stylesSettings.statisticText, marginTop: hp("10%"), position: "absolute"}}>{t("balance")}</Text>
                            </View>
                            <View style={stylesSettings.statisticContainer}>
                                <Text style={{...stylesSettings.statisticValue, color: AppColors.neonRed}}>{userStatistics?.number_of_creditors}</Text>
                                <Text style={{...stylesSettings.statisticValue, color: AppColors.neonRed}}>{userStatistics?.total_credits ? formatNumber(userStatistics?.total_credits) : "null"}{currency || "€"}</Text>
                                <Text style={{...stylesSettings.statisticText, textAlign: "center", marginTop: hp("10%"), position: "absolute"}}>{userStatistics?.balance ? formatNumber(userStatistics.balance) : "null"}{currency || "€"}</Text>
                            </View>
                            <Image style={stylesHome.textMoneyIcon}
                                   source={require("../../../../assets/arrow-down.png")}/>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", gap: wp("10%"), alignSelf: "center", marginTop: hp("10%")}}>
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
            </>
            )}
        </ImageBackground>
    )
}
