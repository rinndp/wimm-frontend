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
import stylesDebtorDetails from "./StylesDebtorDetails";
import stylesHome from "../debtors/StylesHome";
import {debtorDetailsViewModel} from "./ViewModel";
import {useCallback, useEffect, useState} from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {AddDebtDTO, Debt} from "../../../domain/entities/Debt";
import {AppColors} from "../../theme/AppTheme";
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";
import {CustomTextInput} from "../../components/CustomTextInput";
import stylesDebtCard from "./StylesDebtCard";
import {creditorDetailsViewModel} from "../creditors-details/ViewModel";
import {formatDate} from "../../utils/format-date";

type DebtorDetailsRouteProp = RouteProp<RootStackParamsList, "DebtorDetails">;

export function DebtorDetailsScreen({navigation = useNavigation()}: PropsStackNavigation) {
    const route = useRoute<DebtorDetailsRouteProp>()
    const {debtor} = route.params

    const [selectedRemoveDebtId, setSelectedRemoveDebtId] = useState<number | null>(null);
    const [selectedMoreInfoDebtId, setSelectedMoreInfoDebtId] = useState<number | null>(null);
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
        resetForm,
        showLoading
    } = debtorDetailsViewModel()


    useFocusEffect(
        useCallback(() => {
            loadDebts(debtor.id);
        }, [debtor.id])
    )

    useEffect(() => {
        resetForm()
    }, [addDebtModalToggle]);

    const debtRenderItem = useCallback(({item} :{item:Debt}) => (
        <View style={stylesDebtCard.card}>
            <Text style={stylesDebtCard.debtDescription}>{item.description}</Text>
            <Text style={stylesDebtCard.debt}>{item.debt.toFixed(2)}€</Text>
            <TouchableOpacity style={stylesDebtCard.deleteIcon}onPress={() => setSelectedRemoveDebtId(item.id)}>
                <Image source={require("../../../../assets/delete-debtor-icon.png")}
                       style={stylesDebtCard.deleteIcon}/>
            </TouchableOpacity>
            <TouchableOpacity style={stylesDebtCard.detailsIcon} onPress={() => setSelectedMoreInfoDebtId(item.id)}>
                <Image source={require("../../../../assets/details-icon.png")}
                       style={stylesDebtCard.detailsIcon}/>
            </TouchableOpacity>
            <Modal
                onBackdropPress={() => setSelectedRemoveDebtId(null)}
                animationIn={"zoomIn"}
                animationOut={"zoomOut"}
                style={{position: "absolute", marginTop: hp("40%")}}
                backdropTransitionOutTiming={1}
                isVisible={selectedRemoveDebtId === item.id}>
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
                            <Text style={{...stylesHome.modalButtonText, color: AppColors.neonGreen}}>Yes 💸</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                onBackdropPress={() => setSelectedMoreInfoDebtId(null)}
                animationIn={"zoomIn"}
                animationOut={"zoomOut"}
                backdropTransitionOutTiming={1}
                isVisible={selectedMoreInfoDebtId === item.id}>
                <View style={stylesHome.modalCard}>
                    <View style={stylesDebtorDetails.modalInfoContainer}>
                        <Text style={stylesDebtorDetails.modalMoreInfoDate}>{formatDate(item.updated_at)}</Text>
                        <Text style={stylesDebtorDetails.modalMoreInfoText}>{item.description}</Text>
                        <Text style={stylesDebtorDetails.detailsDebtorDebt}>{item.debt.toFixed(2)}€</Text>
                    </View>
                    <View style={stylesHome.modalButtonsContainer}>
                        <TouchableOpacity onPress={() => setSelectedMoreInfoDebtId(null)} style={{flexGrow: 1}}>
                            <Text style={stylesHome.modalButtonText}>Go back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{flexGrow: 0}}
                            onPress={() =>
                                deleteDebt(item.id)
                                    .then(r => setSelectedMoreInfoDebtId(null))}
                        >
                            <Text style={{...stylesHome.modalButtonText, color: AppColors.neonGreen}}>Paid 💸</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    ), [deleteDebt, selectedRemoveDebtId, setSelectedRemoveDebtId, debtor])

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
                                animationIn={"zoomIn"}
                                animationOut={"zoomOut"}
                                backdropTransitionOutTiming={1}
                                style={stylesDebtorDetails.modalAddContainer}
                                isVisible={addDebtModalToggle}>
                                <View style={stylesHome.modalCard}>
                                    <View style={{alignItems: "flex-start", gap: 20,}}>
                                        <Text style={stylesHome.modalTitle}>Add debt</Text>
                                        <CustomTextInput label={"Description"}
                                                         keyboardType={"default"}
                                                         secureTextEntry={false}
                                                         onChangeText={(text) => onChangeAddDebtForm("description", text)}/>
                                        {errorMessageDesc !== "" && (
                                            <Text style={{...stylesHome.modalErrorText,  marginStart: wp("1%")}}>{errorMessageDesc}</Text>
                                        )}
                                        <View style={{flexDirection: "row", alignItems:"center"}}>
                                            <CustomTextInput label={"Debt"}
                                                             keyboardType={"number-pad"}
                                                             secureTextEntry={false}
                                                             onChangeText={(text) => onChangeAddDebtForm("debt", text)}/>
                                            <Text style={{...stylesDebtCard.debt, marginTop:hp("3%"), marginStart:wp("2%")}}>€</Text>
                                        </View>
                                        {errorMessageDebt !== "" && (
                                            <Text style={{...stylesHome.modalErrorText,  marginStart: wp("1%")}}>{errorMessageDebt}</Text>
                                        )}
                                    </View>
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
                            ListFooterComponent={<Text style={{...stylesDebtCard.footerText, display: showLoading ? "none":"flex", marginBottom: hp("24%")}}>No more debts</Text>}
                            renderItem={debtRenderItem}
                        />
                    </View>
                    <Toast/>
                </>
                )}
            </ImageBackground>
    )
}

