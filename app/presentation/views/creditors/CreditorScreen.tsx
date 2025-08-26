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
import stylesHome from "../debtors/StylesHome";
import {RoundedButton} from "../../components/RoundedButton";
import {useCallback, useContext, useEffect, useState} from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {debtorScreenViewModel} from "../debtors/ViewModel";
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
import stylesDebtorCard from "../debtors/StylesDebtorCard";
import stylesDebtCard from "../debtor-details/StylesDebtCard";
import {creditorScreenViewModel} from "./ViewModel";
import {Creditor} from "../../../domain/entities/Creditor";
import {IconButton} from "react-native-paper";
import {stylesTabBarItems} from "../../navigation/UserNavigation";

export function CreditorScreen({navigation = useNavigation(), route}: PropsStackNavigation) {

    const {
        creditors,
        loadCreditors,
        loadTotalCredit,
        totalCredit,
        addCreditor,
        transformDataIntoAddCreditorDTO,
        errorMessage,
        setErrorMessage,
        addCreditorName,
        setAddCreditorName,
        capitalizeFirstLetter,
        deleteCreditor,
        validateAddCreditorForm,
        resetForm,
        showLoading,
        setShowLoading
    } = creditorScreenViewModel()

    const {
        user,
        deleteUserSession
    } = UseUserLocalStorage();

    const [creditorModalToggle, setCreditorModalToggle] = useState(false);
    const [selectedCreditorId, setSelectedCreditorId] = useState<number | null>(null);
    const auth = useContext(AuthContext);


    useFocusEffect(
        useCallback(() => {
            if (user?.slug !== undefined) {
                console.log(user?.slug)
                loadCreditors(user?.slug);
            }
        }, [user?.slug])
    );

    useEffect(() => {
        resetForm()
    }, [creditorModalToggle]);

    const creditorRenderItem = useCallback(({ item }: { item: Creditor }) => (
        <TouchableOpacity onPress={() => navigation.navigate("CreditorDetails", {creditor : item})}>
            <View style={stylesDebtorCard.card}>
                <View>
                    <Text style={stylesDebtorCard.debtorName}>{item.name}</Text>
                    <Text style={stylesDebtorCard.debtorDebt}>{item.credit ? item.credit.toFixed(2) : 0.00.toFixed(2)}€</Text>
                </View>
                <View style={{flexGrow: 1}}>
                    <TouchableOpacity
                        style={stylesDebtorCard.deleteIcon}
                        onPress={() => setSelectedCreditorId(item.id)}>
                        <Image
                            source={require("../../../../assets/delete-debtor-icon.png")}
                            style={stylesDebtorCard.deleteIcon}/>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                onBackdropPress={() => setSelectedCreditorId(null)}
                animationIn={"zoomIn"}
                animationOut={"zoomOut"}
                style={{position: "absolute", marginTop: hp("40%")}}
                backdropTransitionOutTiming={1}
                isVisible={selectedCreditorId === item.id}>
                <View style={stylesHome.modalCard}>
                    <Text style={stylesHome.deleteDebtorModalTitle}>Has {item.name} paid you?</Text>
                    <View style={stylesHome.modalButtonsContainer}>
                        <TouchableOpacity onPress={() => setSelectedCreditorId(null)} style={{flexGrow: 1}}>
                            <Text style={stylesHome.modalButtonText}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{flexGrow: 0}}
                            onPress={() =>
                                deleteCreditor(item.id)
                                    .then(r =>  setSelectedCreditorId(null))}
                        >
                            <Text style={{...stylesHome.modalButtonText, color: AppColors.neonGreen}}>Yes 💸</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    ), [deleteCreditor])

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
                    <TouchableOpacity style={stylesHome.logOutContainer}
                                      onPress={() => deleteUserSession()
                                          .then(() => navigation.replace("TabViewLoginRegister"))}>
                        <Text style ={stylesHome.logOutText}>Log out</Text>
                        <Image source={require("../../../../assets/log-out-icon.png")}
                               style={stylesHome.logOutIcon}/>
                    </TouchableOpacity>
                    <View style={stylesHome.container}>
                        <View style={stylesHome.headerContainer}>
                            <Image
                                source={require("../../../../assets/wimm-icon.png")}
                                style={stylesHome.logoHome}/>
                            <Text style={stylesHome.textHome}>Wimm</Text>
                            <View style={stylesHome.textMoneyContainer}>
                                <Text style={{...stylesHome.textMoneyDebtors, color: AppColors.darkRed}}>{totalCredit.toFixed(2)}€</Text>
                                <Image style={stylesHome.textMoneyIcon}
                                       source={require("../../../../assets/arrow-down.png")}/>
                            </View>
                            <RoundedButton text={"Add creditor"} onPressFromInterface={() => setCreditorModalToggle(true)}/>
                            <Modal
                                onBackdropPress={() => setCreditorModalToggle(false)}
                                animationIn={"zoomIn"}
                                animationOut={"zoomOut"}
                                style={stylesHome.modalAddContainer}
                                backdropTransitionOutTiming={1}
                                isVisible={creditorModalToggle}>
                                <View style={stylesHome.modalCard}>
                                    <Text style={stylesHome.modalTitle}>Add creditor</Text>
                                    <CustomTextInput label={"Name"}
                                                     keyboardType={"default"}
                                                     secureTextEntry={false}
                                                     maxLength={40}
                                                     onChangeText={(text) => setAddCreditorName(text)}/>
                                    <Text style={stylesHome.helpText}>{addCreditorName.length}/40</Text>
                                    {errorMessage !== "" && (
                                        <Text style={stylesHome.modalErrorText}>{errorMessage}</Text>
                                    )}
                                    <View style={stylesHome.modalButtonsContainer}>
                                        <TouchableOpacity onPress={() => setCreditorModalToggle(false)} style={{flexGrow: 1}}>
                                            <Text style={stylesHome.modalButtonText}>Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{flexGrow: 0}}
                                            onPress={() =>
                                                addCreditor(
                                                    transformDataIntoAddCreditorDTO(
                                                        capitalizeFirstLetter(addCreditorName), user?.slug ? user?.slug : ""))
                                                    .then(() => {
                                                        if (validateAddCreditorForm()) {
                                                            setCreditorModalToggle(false);
                                                        }})}
                                        >
                                            <Text style={stylesHome.modalButtonText}>Accept</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        <FlatList
                            data={creditors}
                            removeClippedSubviews={true}
                            fadingEdgeLength={80}
                            style={{marginTop: hp("1.4%"), marginBottom: hp("4%")}}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={creditorRenderItem}
                            ListFooterComponent={<Text style={{...stylesDebtCard.footerText, display: showLoading ? "none":"flex"}}>No more creditors</Text>}
                            extraData={creditors}/>
                    </View>
                    <Toast/>
                </>
                )}
            </ImageBackground>
    )
}

