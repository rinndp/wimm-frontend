import {
    SafeAreaView,
    View,
    Text,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet, ActivityIndicator
} from "react-native";
import {RouteProp, useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import {RootStackParamsList} from "../../../../App";
import stylesDebtorDetails from "../debtor-details/StylesDebtorDetails";
import stylesHome from "../debtors/StylesHome";
import {creditorDetailsViewModel} from "./ViewModel";
import {useCallback, useEffect, useState} from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {AppColors} from "../../theme/AppTheme";
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";
import {CustomTextInput} from "../../components/CustomTextInput";
import stylesDebtCard from "../debtor-details/StylesDebtCard";
import {AddCreditDTO, Credit} from "../../../domain/entities/Credit";
import {debtorDetailsViewModel} from "../debtor-details/ViewModel";
import {formatDate} from "../../utils/format-date";

type CreditorDetailsRouteProp = RouteProp<RootStackParamsList, "CreditorDetails">;

export function CreditorDetailsScreen({navigation = useNavigation()}: PropsStackNavigation) {
    const route = useRoute<CreditorDetailsRouteProp>()
    const {creditor} = route.params

    const [selectedRemoveCreditId, setSelectedRemoveCreditId] = useState<number | null>(null);
    const [selectedMoreInfoCreditId, setSelectedMoreInfoCreditId] = useState<number | null>(null);
    const [addCreditModalToggle, setAddCreditModalToggle] = useState(false);

    const {
        loadCredits,
        credits,
        deleteCredit,
        totalCredit,
        loadTotalCredit,
        addCredit,
        errorMessageCredit,
        errorMessageDesc,
        onChangeAddCreditForm,
        addCreditValues,
        validateAddCreditForm,
        resetForm,
        showLoading
    } = creditorDetailsViewModel()


    useFocusEffect(
        useCallback(() => {
            loadCredits(creditor.id);
        }, [creditor.id])
    )

    useEffect(() => {
        resetForm()
    }, [addCreditModalToggle]);

    useFocusEffect(
        useCallback(() => {
            loadTotalCredit();
        }, [credits])
    )

    const creditRenderItem = useCallback(({item} :{item:Credit}) => (
        <View style={stylesDebtCard.card}>
            <Text style={stylesDebtCard.debtDescription}>{item.description}</Text>
            <Text style={stylesDebtCard.debt}>{item.credit.toFixed(2)}€</Text>
            <TouchableOpacity style={stylesDebtCard.deleteIcon}onPress={() => setSelectedRemoveCreditId(item.id)}>
                <Image source={require("../../../../assets/delete-debtor-icon.png")}
                       style={stylesDebtCard.deleteIcon}/>
            </TouchableOpacity>
            <TouchableOpacity style={stylesDebtCard.detailsIcon} onPress={() => setSelectedMoreInfoCreditId(item.id)}>
                <Image source={require("../../../../assets/details-icon.png")}
                       style={stylesDebtCard.detailsIcon}/>
            </TouchableOpacity>
            {selectedRemoveCreditId === item.id && (
                <Modal
                    onBackdropPress={() => setSelectedRemoveCreditId(null)}
                    animationIn={"fadeInUp"}
                    animationOut={"fadeOut"}
                    style={{position: "absolute", marginTop: hp("40%")}}
                    backdropTransitionOutTiming={1}
                    animationOutTiming={1}
                    isVisible={true}>
                    <View style={stylesHome.modalCard}>
                        <Text style={stylesHome.deleteDebtorModalTitle}>Has {creditor.name} paid you?</Text>
                        <Text style={stylesDebtorDetails.detailsDebtorDebt}>{item.credit.toFixed(2)}€</Text>
                        <View style={stylesHome.modalButtonsContainer}>
                            <TouchableOpacity onPress={() => setSelectedRemoveCreditId(null)} style={{flexGrow: 1}}>
                                <Text style={stylesHome.modalButtonText}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{flexGrow: 0}}
                                onPress={() =>
                                    deleteCredit(item.id)
                                        .then(r => setSelectedRemoveCreditId(null))}
                            >
                                <Text style={{...stylesHome.modalButtonText, color: AppColors.neonGreen}}>Yes 💸</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

            {selectedMoreInfoCreditId === item.id && (
                <Modal
                    onBackdropPress={() => setSelectedMoreInfoCreditId(null)}
                    animationIn={"fadeInUp"}
                    animationOut={"fadeOut"}
                    backdropTransitionOutTiming={1}
                    animationOutTiming={1}
                    isVisible={true}>
                    <View style={stylesHome.modalCard}>
                        <View style={stylesDebtorDetails.modalInfoContainer}>
                            <Text style={stylesDebtorDetails.modalMoreInfoDate}>{formatDate(item.updated_at)}</Text>
                            <Text style={stylesDebtorDetails.modalMoreInfoText}>{item.description}</Text>
                            <Text style={stylesDebtorDetails.detailsDebtorDebt}>{item.credit.toFixed(2)}€</Text>
                        </View>
                        <View style={stylesHome.modalButtonsContainer}>
                            <TouchableOpacity onPress={() => setSelectedMoreInfoCreditId(null)} style={{flexGrow: 1}}>
                                <Text style={stylesHome.modalButtonText}>Go back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{flexGrow: 0}}
                                onPress={() =>
                                    deleteCredit(item.id)
                                        .then(r => setSelectedMoreInfoCreditId(null))}
                            >
                                <Text style={{...stylesHome.modalButtonText, color: AppColors.neonGreen}}>Paid 💸</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    ), [deleteCredit, selectedRemoveCreditId, setSelectedRemoveCreditId, creditor])

    return (
            <ImageBackground
                source={require("../../../../assets/background.jpg")}
                style={{width:Dimensions.get("window").width}}>
                <View style={stylesHome.loadingIconContainer}>
                    <ActivityIndicator style={stylesHome.loading} size="large" color="#ffffff" animating={showLoading}/>
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require("../../../../assets/go-back-arrow-icon.png")}
                       style={stylesDebtorDetails.goBackIcon}/>
                </TouchableOpacity>
                <View style={stylesDebtorDetails.container}>
                    <View style={stylesDebtorDetails.header}>
                        <Text style={stylesDebtorDetails.detailsDebtorName}>{creditor.name} 👋</Text>
                        <Text style={stylesHome.textHome}>Here is your money</Text>
                        <View style={stylesDebtorDetails.debtContainer}>
                            <Text style={stylesDebtorDetails.detailsDebtorDebt}>{totalCredit.toFixed(2)}€</Text>
                            <TouchableOpacity
                                onPress={() => setAddCreditModalToggle(true)}
                                style={stylesDebtorDetails.addDebtIcon}>
                                <Image source={require("../../../../assets/add-icon.png")}
                                       style={stylesDebtorDetails.addDebtIcon}/>
                            </TouchableOpacity>
                        </View>
                        <Modal
                            onBackdropPress={() => setAddCreditModalToggle(false)}
                            animationIn={"fadeInUp"}
                            animationOut={"fadeOut"}
                            backdropTransitionOutTiming={1}
                            style={stylesDebtorDetails.modalAddContainer}
                            animationOutTiming={1}
                            isVisible={addCreditModalToggle}>
                            <View style={stylesHome.modalCard}>
                                <View style={{alignItems: "flex-start", gap: 20,}}>
                                    <Text style={stylesHome.modalTitle}>Add debt</Text>
                                    <CustomTextInput label={"Description"}
                                                     keyboardType={"default"}
                                                     secureTextEntry={false}
                                                     onChangeText={(text) => onChangeAddCreditForm("description", text)}/>
                                    {errorMessageDesc !== "" && (
                                        <Text style={{...stylesHome.modalErrorText,  marginStart: wp("1%")}}>{errorMessageDesc}</Text>
                                    )}
                                    <View style={{flexDirection: "row", gap: 10}}>
                                        <CustomTextInput label={"Debt"}
                                                         keyboardType={"number-pad"}
                                                         secureTextEntry={false}
                                                         onChangeText={(text) => onChangeAddCreditForm("credit", text)}/>
                                        <Text style={{...stylesDebtCard.debt, marginTop: wp("7.7%"), marginStart: 0}}>€</Text>
                                    </View>
                                    {errorMessageCredit !== "" && (
                                        <Text style={{...stylesHome.modalErrorText,  marginStart: wp("1%")}}>{errorMessageCredit}</Text>
                                    )}
                                </View>
                                <View style={stylesHome.modalButtonsContainer}>
                                    <TouchableOpacity onPress={() => setAddCreditModalToggle(false)} style={{flexGrow: 1}}>
                                        <Text style={stylesHome.modalButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{flexGrow: 0}}
                                        onPress={() =>
                                            addCredit(addCreditValues as AddCreditDTO)
                                                .then(() => {
                                                    if (validateAddCreditForm()) {
                                                        setAddCreditModalToggle(false)
                                        }})}
                                    >
                                        <Text style={stylesHome.modalButtonText}>Accept</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <FlatList
                        data={credits}
                        extraData={credits}
                        removeClippedSubviews={true}
                        fadingEdgeLength={80}
                        style={{marginTop: hp("3%")}}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={<Text style={{...stylesDebtCard.footerText, display: showLoading ? "none":"flex", marginBottom: hp("15%")}}>No more debts</Text>}
                        renderItem={creditRenderItem}
                    />
                </View>
                <Toast/>
            </ImageBackground>
    )
}

