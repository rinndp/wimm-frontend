import {
    SafeAreaView,
    View,
    Text,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet
} from "react-native";
import {RouteProp, useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import {RootStackParamsList} from "../../../../App";
import stylesDebtorDetails from "./StylesDebtorDetails";
import stylesHome from "../home/StylesHome";
import {debtorDetailsViewModel} from "./ViewModel";
import {useCallback, useEffect, useState} from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {AddDebtDTO, Debt} from "../../../domain/entities/Debt";
import {AppColors} from "../../theme/AppTheme";
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";
import {CustomTextInput} from "../../components/CustomTextInput";
import {stylesDebtorCard} from "../home/Home";

type DebtorDetailsRouteProp = RouteProp<RootStackParamsList, "DebtorDetails">;

export function DebtorDetailsScreen({navigation = useNavigation()}: PropsStackNavigation) {
    const route = useRoute<DebtorDetailsRouteProp>()
    const {debtor} = route.params

    const [selectedRemoveDebtId, setSelectedRemoveDebtId] = useState<number | null>(null);
    const [addDebtModalToggle, setAddDebtModalToggle] = useState(false);

    const {
        loadDebts,
        debts,
        deleteDebt,
        totalDebt,
        loadTotalDebt,
        addDebt,
        errorMessageDebt,
        errorMessageDesc,
        onChangeAddDebtForm,
        addDebtValues,
        validateAddDebtForm,
        setErrorMessageDebt,
        setErrorMessageDesc,
    } = debtorDetailsViewModel()

    useFocusEffect(
        useCallback(() => {
            loadDebts(debtor.id);
        }, [debtor.id])
    )

    useEffect(() => {
        onChangeAddDebtForm("description", "")
        onChangeAddDebtForm("debt", "0")
        setErrorMessageDebt("");
        setErrorMessageDesc("");
    }, [addDebtModalToggle]);

    useFocusEffect(
        useCallback(() => {
            loadTotalDebt();
        }, [debts])
    )

    const debtRenderItem = useCallback(({item} :{item:Debt}) => (
        <View style={stylesDebtCard.card}>
            <Text style={stylesDebtCard.debtDescription}>{item.description}</Text>
            <Text style={stylesDebtCard.debt}>{item.debt.toFixed(2)}€</Text>
            <TouchableOpacity onPress={() => setSelectedRemoveDebtId(item.id)}>
                <Image source={require("../../../../assets/delete-debtor-icon.png")}
                       style={stylesDebtCard.deleteIcon}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require("../../../../assets/details-icon.png")}
                       style={stylesDebtCard.detailsIcon}/>
            </TouchableOpacity>
            {selectedRemoveDebtId === item.id && (
                <Modal
                    onBackdropPress={() => setSelectedRemoveDebtId(null)}
                    animationIn={"fadeInUp"}
                    animationOut={"fadeOut"}
                    style={{position: "absolute", marginTop: hp("40%")}}
                    backdropTransitionOutTiming={1}
                    animationOutTiming={1}
                    isVisible={true}>
                    <View style={stylesHome.modalCard}>
                        <Text style={stylesHome.deleteDebtorModalTitle}>Has {debtor.name} paid you?</Text>
                        <Text style={stylesDebtorDetails.detailsDebtorDebt}>{item.debt.toFixed(2)}€</Text>
                        <View style={stylesHome.modalButtonsContainer}>
                            <TouchableOpacity onPress={() => setSelectedRemoveDebtId(null)} style={{flexGrow: 1}}>
                                <Text style={stylesHome.modalButtonText}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{flexGrow: 0}}
                                onPress={() =>
                                    deleteDebt(item.id)
                                        .then(r => setSelectedRemoveDebtId(null))}
                            >
                                <Text style={stylesHome.modalButtonText}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    ), [deleteDebt, selectedRemoveDebtId, setSelectedRemoveDebtId, debtor])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require("../../../../assets/background.jpg")}
                style={{width:Dimensions.get("window").width,height:Dimensions.get("window").height}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require("../../../../assets/go-back-arrow-icon.png")}
                       style={stylesDebtorDetails.goBackIcon}/>
                </TouchableOpacity>
                <View style={stylesDebtorDetails.container}>
                    <View style={stylesDebtorDetails.header}>
                        <Text style={stylesDebtorDetails.detailsDebtorName}>{debtor.name} 👋</Text>
                        <Text style={stylesHome.textHome}>Where is my money?</Text>
                        <View style={stylesDebtorDetails.debtContainer}>
                            <Text style={stylesDebtorDetails.detailsDebtorDebt}>{totalDebt.toFixed(2)}€</Text>
                            <TouchableOpacity
                                onPress={() => setAddDebtModalToggle(true)}
                                style={stylesDebtorDetails.addDebtIcon}>
                                <Image source={require("../../../../assets/add-icon.png")}
                                       style={stylesDebtorDetails.addDebtIcon}/>
                            </TouchableOpacity>
                        </View>
                        <Modal
                            onBackdropPress={() => setAddDebtModalToggle(false)}
                            animationIn={"fadeInUp"}
                            animationOut={"fadeOut"}
                            style={{position: "absolute", marginTop: hp("34%")}}
                            backdropTransitionOutTiming={1}
                            animationOutTiming={1}
                            isVisible={addDebtModalToggle}>
                            <View style={stylesHome.modalCard}>
                                <Text style={stylesHome.modalTitle}>Add debt</Text>
                                <CustomTextInput label={"Description"}
                                                 keyboardType={"default"}
                                                 secureTextEntry={false}
                                                 onChangeText={(text) => onChangeAddDebtForm("description", text)}/>
                                {errorMessageDesc !== "" && (
                                    <Text style={stylesHome.modalErrorText}>{errorMessageDesc}</Text>
                                )}
                                <CustomTextInput label={"Debt"}
                                                 keyboardType={"number-pad"}
                                                 secureTextEntry={false}
                                                 onChangeText={(text) => onChangeAddDebtForm("debt", text)}/>
                                {errorMessageDebt !== "" && (
                                    <Text style={stylesHome.modalErrorText}>{errorMessageDebt}</Text>
                                )}
                                <View style={stylesHome.modalButtonsContainer}>
                                    <TouchableOpacity onPress={() => setAddDebtModalToggle(false)} style={{flexGrow: 1}}>
                                        <Text style={stylesHome.modalButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{flexGrow: 0}}
                                        onPress={() =>
                                            addDebt(addDebtValues as AddDebtDTO)
                                                .then(() => {
                                                    if (validateAddDebtForm()) {
                                                        setAddDebtModalToggle(false)
                                        }})}
                                    >
                                        <Text style={stylesHome.modalButtonText}>Accept</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <FlatList
                        data={debts}
                        extraData={debts}
                        removeClippedSubviews={true}
                        fadingEdgeLength={80}
                        style={{marginTop: hp("3%")}}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={<Text style={stylesDebtCard.footerText}>No more debts</Text>}
                        renderItem={debtRenderItem}
                    />
                </View>
                <Toast/>
            </ImageBackground>
        </SafeAreaView>
    )
}

const stylesDebtCard = StyleSheet.create({
    card: {
        flexDirection: "row",
        paddingVertical: hp("2.5%"),
        verticalAlign: "middle"
    },

    debtDescription: {
        color: AppColors.white,
        fontFamily: "zen_kaku_regular",
        fontSize: hp("2.0%"),
        width: 28,
        height: 27,
        marginTop: wp("0.5%"),
        flexGrow: 2,
    },

    debt: {
        color: AppColors.white,
        fontFamily: "zen_kaku_medium",
        fontSize: hp("2.3%"),
        marginStart: wp("8%"),
        flexGrow: 0.5,

    },

    deleteIcon: {
        width: wp("8%"),
        height: wp("8%"),
        tintColor: AppColors.white,
        marginEnd: wp("5%")
    },

    detailsIcon: {
        width: wp("9%"),
        height: wp("9%"),
        marginTop: wp("-0.45%"),
        tintColor: AppColors.white,
    },

    footerText: {
        color: AppColors.white,
        fontSize: wp("4%"),
        alignSelf: "center",
        height: 30,
        marginBottom: hp("14%"),
        fontFamily: "zen_kaku_regular"
    }
})