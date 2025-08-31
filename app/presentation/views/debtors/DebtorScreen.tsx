import {
    ActivityIndicator,
    ActivityIndicatorComponent,
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import stylesHome from "./StylesHome";
import {RoundedButton} from "../../components/RoundedButton";
import React, {useCallback, useContext, useEffect, useState} from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {debtorScreenViewModel} from "./ViewModel";
import {Debtor} from "../../../domain/entities/Debtor";
import {StyleSheet} from "react-native";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import Modal from 'react-native-modal';
import {AppColors} from "../../theme/AppTheme";
import {CustomTextInput} from "../../components/CustomTextInput";
import Toast from "react-native-toast-message";
import {AuthContext} from "../auth/AuthProvider";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import stylesDebtorCard from "./StylesDebtorCard";
import stylesDebtCard from "../debtor-details/StylesDebtCard";
import {stylesTabBarItems} from "../../navigation/UserNavigation";
import {useTranslation} from "react-i18next";
import stylesTabBar from "../auth/StylesTabBar";
import {LanguageSelect} from "../../components/LanguageSelect";


export function DebtorScreen({navigation = useNavigation(), route}: PropsStackNavigation) {

    const {t} = useTranslation()
    const {
        loadDebtors,
        debtors,
        loadTotalDebt,
        totalDebt,
        addDebtor,
        transformDataIntoAddDebtorDTO,
        errorMessage,
        addDebtorName,
        setAddDebtorName,
        capitalizeFirstLetter,
        deleteDebtor,
        validateAddDebtorForm,
        resetForm,
        showLoading
    } = debtorScreenViewModel()

    const {
        user,
        deleteUserSession,
        currency,
        getCurrencyApp
    } = UseUserLocalStorage();

    const [debtorModalToggle, setDebtorModalToggle] = useState(false);
    const [selectedDebtorId, setSelectedDebtorId] = useState<number | null>(null);
    const auth = useContext(AuthContext);


    useFocusEffect(
        useCallback(() => {
            if (user?.slug !== undefined) {
                console.log(user?.slug)
                loadDebtors(user?.slug);
                getCurrencyApp()
            }
        }, [user?.slug])
    );

    useEffect(() => {
        resetForm()
    }, [debtorModalToggle]);

    const debtorRenderItem = useCallback(({ item }: { item: Debtor }) => (
        <TouchableOpacity onPress={() => navigation.navigate("DebtorDetails", {debtor : item})}>
            <View style={stylesDebtorCard.card}>
                    <View>
                        <Text style={stylesDebtorCard.debtorName}>{item.name}</Text>
                        <Text style={stylesDebtorCard.debtorDebt}>{item.debt ? item.debt.toFixed(2) : 0.00.toFixed(2)}{currency}</Text>
                    </View>
                    <View style={{flexGrow: 1}}>
                        <TouchableOpacity
                            style={stylesDebtorCard.deleteIcon}
                            onPress={() => setSelectedDebtorId(item.id)}>
                            <Image
                                source={require("../../../../assets/delete-debtor-icon.png")}
                                style={stylesDebtorCard.deleteIcon}/>
                        </TouchableOpacity>
                    </View>
            </View>
            <Modal
                onBackdropPress={() => setSelectedDebtorId(null)}
                animationIn={"zoomIn"}
                animationOut={"zoomOut"}
                style={{position: "absolute", marginTop: hp("40%")}}
                backdropTransitionOutTiming={1}
                isVisible={selectedDebtorId === item.id}>
                <View style={stylesHome.modalCard}>
                    <Text style={stylesHome.deleteDebtorModalTitle}>{t("has")}{item.name} {t("paid you")}?</Text>
                    <View style={stylesHome.modalButtonsContainer}>
                        <TouchableOpacity onPress={() => setSelectedDebtorId(null)} style={{flexGrow: 1}}>
                            <Text style={stylesHome.modalButtonText}>{t("no")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{flexGrow: 0}}
                            onPress={() =>
                                deleteDebtor(item.id)
                                    .then(r =>  setSelectedDebtorId(null))}
                        >
                            <Text style={{...stylesHome.modalButtonText, color: AppColors.neonGreen}}>{t("yes")} 💸</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    ), [deleteDebtor])

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
                    <TouchableOpacity style={stylesHome.settingsIconContainer} onPress={() => navigation.navigate("SettingScreen")}>
                        <Image
                            style={{...stylesTabBarItems.item, tintColor: AppColors.white,}}
                            source={require("../../../../assets/settings-icon.png")}
                        />
                    </TouchableOpacity>
                    <View style={stylesHome.container}>
                        <View style={stylesHome.headerContainer}>
                            <Image
                                source={require("../../../../assets/wimm-icon.png")}
                                style={stylesHome.logoHome}/>
                            <Text style={stylesHome.textHome}>Wimm</Text>
                            <View style={stylesHome.textMoneyContainer}>
                                <Text style={stylesHome.textMoneyDebtors}>{totalDebt.toFixed(2)}{currency}</Text>
                                <Image style={stylesHome.textMoneyIcon}
                                       source={require("../../../../assets/arrow-up.png")}/>
                            </View>
                            <RoundedButton text={t("add debtor")} onPressFromInterface={() => setDebtorModalToggle(true)}/>
                            <Modal
                                onBackdropPress={() => setDebtorModalToggle(false)}
                                animationIn={"zoomIn"}
                                animationOut={"zoomOut"}
                                style={stylesHome.modalAddContainer}
                                backdropTransitionOutTiming={1}
                                isVisible={debtorModalToggle}>
                                <View style={stylesHome.modalCard}>
                                    <Text style={stylesHome.modalTitle}>{t("add debtor")}</Text>
                                    <CustomTextInput label={t("name")}
                                                     keyboardType={"default"}
                                                     secureTextEntry={false}
                                                     maxLength={40}
                                                     onChangeText={(text) => setAddDebtorName(text)}/>
                                    <Text style={stylesHome.helpText}>{addDebtorName.length}/40</Text>
                                    {errorMessage !== "" && (
                                        <Text style={stylesHome.modalErrorText}>{errorMessage}</Text>
                                    )}
                                    <View style={stylesHome.modalButtonsContainer}>
                                        <TouchableOpacity onPress={() => setDebtorModalToggle(false)} style={{flexGrow: 1}}>
                                            <Text style={stylesHome.modalButtonText}>{t("cancel")}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{flexGrow: 0}}
                                            onPress={() =>
                                                addDebtor(
                                                    transformDataIntoAddDebtorDTO(
                                                        capitalizeFirstLetter(addDebtorName), user?.slug ? user?.slug : ""))
                                                    .then(() => {
                                                        if (validateAddDebtorForm()) {
                                                            setDebtorModalToggle(false);
                                            }})}
                                        >
                                            <Text style={stylesHome.modalButtonText}>{t("accept")}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        <FlatList
                            data={debtors}
                            removeClippedSubviews={true}
                            fadingEdgeLength={80}
                            style={{marginTop: hp("1.4%"), marginBottom: hp("4%")}}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={debtorRenderItem}
                            ListFooterComponent={<Text style={{...stylesDebtCard.footerText, display: showLoading ? "none":"flex"}}>{t("no more debtors")}</Text>}
                            extraData={debtors}/>
                    </View>
                    <Toast/>
                </>
                )}
            </ImageBackground>
    )
}

