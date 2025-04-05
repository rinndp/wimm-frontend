import {Dimensions, FlatList, Image, ImageBackground, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import stylesHome from "./StylesHome";
import {RoundedButton} from "../../components/RoundedButton";
import {useCallback, useEffect} from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {homeViewModel} from "./ViewModel";
import {Debtor} from "../../../domain/entities/Debtor";
import {styles} from "react-native-toast-message/lib/src/components/BaseToast.styles";
import {StyleSheet} from "react-native";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {useFocusEffect} from "@react-navigation/native";
import {AppColors} from "../../theme/AppTheme";


export function HomeScreen() {

    const {
        loadDebtors,
        debtors,
        loadTotalDebt,
        totalDebt
    } = homeViewModel()

    const {
        user,
    } = UseUserLocalStorage();

    useFocusEffect(
        useCallback(() => {
            if(user?.slug != undefined) {
                console.log(user?.slug)
                loadDebtors(user?.slug)
            }
        }, [user?.slug])
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
                    <TouchableOpacity style={stylesDebtorCard.deleteIcon}>
                        <Image
                            source={require("../../../../assets/delete-debtor-icon.png")}
                            style={stylesDebtorCard.deleteIcon}/>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    ), [])

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
                        <RoundedButton text={"Add debtor"} onPressFromInterface={() => alert("ola")}/>
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