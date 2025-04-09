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
import {useCallback, useContext, useEffect, useState} from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {homeViewModel} from "./ViewModel";
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

export function HomeScreen({navigation = useNavigation(), route}: PropsStackNavigation) {

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
    } = homeViewModel()

    const {
        user,
        deleteUserSession
    } = UseUserLocalStorage();

    const [debtorModalToggle, setDebtorModalToggle] = useState(false);
    const [selectedDebtorId, setSelectedDebtorId] = useState<number | null>(null);
    const auth = useContext(AuthContext);


    useFocusEffect(
        useCallback(() => {
            if (user?.slug !== undefined) {
                console.log(user?.slug)
                loadDebtors(user?.slug);
            }
        }, [user?.slug])
    );

    useEffect(() => {
        resetForm()
    }, [debtorModalToggle]);

    useFocusEffect(
        useCallback(() => {
            loadTotalDebt()
        }, [debtors])
    );

    const debtorRenderItem = useCallback(({ item }: { item: Debtor }) => (
        <TouchableOpacity onPress={() => navigation.navigate("DebtorDetails", {debtor : item})}>
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
                                    .then(r =>  setSelectedDebtorId(null))}
                        >
                            <Text style={{...stylesHome.modalButtonText, color: AppColors.neonGreen}}>Yes 💸</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )}
        </TouchableOpacity>
    ), [deleteDebtor])

    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground
                source={require("../../../../assets/background.jpg")}
                style={{width:Dimensions.get("window").width,height:Dimensions.get("window").height}}>
                <View style={stylesHome.loadingIconContainer}>
                    <ActivityIndicator style={stylesHome.loading} size="large" color="#ffffff" animating={showLoading}/>
                </View>
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
                        <Text style={stylesHome.textHome}>Where is my money?</Text>
                        <Text style={stylesHome.textMoney}>{totalDebt.toFixed(2)}€</Text>
                        <RoundedButton text={"Add debtor"} onPressFromInterface={() => setDebtorModalToggle(true)}/>
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
                                                 maxLength={40}
                                                 onChangeText={(text) => setAddDebtorName(text)}/>
                                <Text style={stylesHome.helpText}>{addDebtorName.length}/40</Text>
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
                                                .then(() => {
                                                    if (validateAddDebtorForm()) {
                                                        setDebtorModalToggle(false);
                                        }})}
                                    >
                                        <Text style={stylesHome.modalButtonText}>Accept</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <FlatList
                        data={debtors}
                        removeClippedSubviews={true}
                        fadingEdgeLength={80}
                        style={{marginTop: hp("1.4%")}}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={debtorRenderItem}
                        ListFooterComponent={<Text style={{...stylesDebtCard.footerText, display: showLoading ? "none":"flex"}}>No more debtors</Text>}
                        extraData={debtors}/>
                </View>
                <Toast/>
            </ImageBackground>
        </SafeAreaView>
    )
}

