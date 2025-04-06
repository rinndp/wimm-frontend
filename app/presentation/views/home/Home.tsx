import {
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
import {useCallback, useContext, useEffect, useState} from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {homeViewModel} from "./ViewModel";
import {Debtor} from "../../../domain/entities/Debtor";
import {StyleSheet} from "react-native";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {useFocusEffect} from "@react-navigation/native";
import Modal from 'react-native-modal';
import {AppColors} from "../../theme/AppTheme";
import {CustomTextInput} from "../../components/CustomTextInput";
import Toast from "react-native-toast-message";
import {AuthContext} from "../auth/AuthProvider";

export function HomeScreen() {

    const {
        loadDebtors,
        debtors,
        loadTotalDebt,
        totalDebt,
        addDebtor,
        transformDataIntoAddDebtorDTO,
        errorMessage,
        setErrorMessage,
        addDebtorName,
        setAddDebtorName,
        capitalizeFirstLetter,
        deleteDebtor
    } = homeViewModel()

    const {
        user,
    } = UseUserLocalStorage();

    const [debtorModalToggle, setDebtorModalToggle] = useState(false);
    const [selectedDebtorId, setSelectedDebtorId] = useState<number | null>(null);

    const auth = useContext(AuthContext);

    useFocusEffect(
        useCallback(() => {
            if (auth?.userSlug !== undefined) {
                console.log(auth?.userSlug)
                loadDebtors(auth?.userSlug)
            }
        }, [auth?.userSlug])
    );

    useFocusEffect(
        useCallback(() => {
            loadTotalDebt()
        }, [debtors])
    );

    const debtorRenderItem = useCallback(({ item }: { item: Debtor }) => (
        <TouchableOpacity>
            <View style={stylesDebtorCard.card}>
                <View>
                    <Text style={stylesDebtorCard.debtorName}>{item.name}</Text>
                    <Text style={stylesDebtorCard.debtorDebt}>{item.debt.toFixed(2)}€</Text>
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
            {selectedDebtorId === item.id && (
            <Modal
                onBackdropPress={() => setSelectedDebtorId(null)}
                animationIn={"fadeInUp"}
                animationOut={"fadeOut"}
                style={{position: "absolute", marginTop: hp("40%")}}
                backdropTransitionOutTiming={1}
                animationOutTiming={1}
                isVisible={true}>
                <View style={stylesHome.modalCard}>
                    <Text style={stylesHome.deleteDebtorModalTitle}>Has {item.name} paid you?</Text>
                    <View style={stylesHome.modalButtonsContainer}>
                        <TouchableOpacity onPress={() => setSelectedDebtorId(null)} style={{flexGrow: 1}}>
                            <Text style={stylesHome.modalButtonText}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{flexGrow: 0}}
                            onPress={() =>
                                deleteDebtor(item.id)
                                    .then(r => setSelectedDebtorId(null))}
                        >
                            <Text style={stylesHome.modalButtonText}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )}
        </TouchableOpacity>
    ), [deleteDebtor])

    return (
        <SafeAreaView>
            <ImageBackground
                source={require("../../../../assets/background.jpg")}
                style={{width:Dimensions.get("window").width,height:Dimensions.get("window").height}}>

                <View style={stylesHome.container}>
                    <View style={stylesHome.headerContainer}>
                        <Image
                            source={require("../../../../assets/wimm-icon.png")}
                            style={stylesHome.logoHome}/>
                        <Text style={stylesHome.textHome}>Where is my money?</Text>
                        <Text style={stylesHome.textMoney}>{totalDebt.toFixed(2)}€</Text>
                        <RoundedButton text={"Add debtor"} onPressFromInterface={() => setDebtorModalToggle(true)}/>
                        <View>
                            <Modal
                                onBackdropPress={() => setDebtorModalToggle(false)}
                                animationIn={"fadeInUp"}
                                animationOut={"fadeOut"}
                                style={{position: "absolute", marginTop: hp("34%")}}
                                backdropTransitionOutTiming={1}
                                animationOutTiming={1}
                                isVisible={debtorModalToggle}>
                                <View style={stylesHome.modalCard}>
                                    <Text style={stylesHome.modalTitle}>Add debtor</Text>
                                    <CustomTextInput label={"Name"}
                                                     keyboardType={"default"}
                                                     secureTextEntry={false}
                                                     onChangeText={(text) => setAddDebtorName(text)}/>
                                    {errorMessage !== "" && (
                                        <Text style={stylesHome.modalErrorText}>{errorMessage}</Text>
                                    )}
                                    <View style={stylesHome.modalButtonsContainer}>
                                        <TouchableOpacity onPress={() => setDebtorModalToggle(false)} style={{flexGrow: 1}}>
                                            <Text style={stylesHome.modalButtonText}>Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{flexGrow: 0}}
                                            onPress={() =>
                                                addDebtor(
                                                    transformDataIntoAddDebtorDTO(
                                                        capitalizeFirstLetter(addDebtorName), user?.slug ? user?.slug : ""))
                                                    .then(r => setDebtorModalToggle(false))}
                                        >
                                            <Text style={stylesHome.modalButtonText}>Accept</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </View>
                    <FlatList
                        data={debtors}
                        removeClippedSubviews={true}
                        fadingEdgeLength={80}
                        style={{marginTop: hp("1.4%")}}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={debtorRenderItem}
                        ListFooterComponent={<Text style={stylesDebtorCard.footerText}>No more debtors</Text>}
                        extraData={debtors}/>
                </View>
                <Toast/>
            </ImageBackground>
        </SafeAreaView>
    )
}

const stylesDebtorCard = StyleSheet.create({
    card: {
        width: wp("94%"),
        height: hp("15%"),
        backgroundColor: AppColors.colorButton,
        marginBottom: hp("1.5%"),
        borderRadius: 15,
        flexDirection: "row",
        padding: wp("7%"),
    },

    debtorName: {
        fontSize: wp("5.5%"),
        height: 44,
        color: AppColors.white,
        fontFamily: "zen_kaku_regular"
    },

    debtorDebt: {
        fontSize: wp("6%"),
        height: 44,
        color: AppColors.white,
        fontFamily: "zen_kaku_bold"
    },

    deleteIcon: {
        width: wp("10%"),
        height: hp("4%"),
        tintColor: AppColors.white,
        alignSelf: "flex-end",
    },

    footerText: {
        color: AppColors.white,
        fontSize: wp("4%"),
        alignSelf: "center",
        height: 30,
        marginBottom: hp("6%"),
        fontFamily: "zen_kaku_regular"
    }
})