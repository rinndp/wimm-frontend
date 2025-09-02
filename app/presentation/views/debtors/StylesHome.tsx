import {Platform, StyleSheet} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {AppColors} from "../../theme/AppTheme";


const stylesHome = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },

    headerContainer: {
        marginTop: hp("6%"),
        alignItems: 'center',
    },

    textMoneyContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: wp("2%"),
        marginBottom: hp("1%"),
    },

    logoHome: {
        width: wp("13%"),
        height: hp("9%"),
    },

    textHome: {
        fontSize: wp("5.5%"),
        fontFamily: "zen_kaku_light",
        marginBottom: hp("2%"),
        lineHeight: hp("3%"),
        marginTop: hp("-1%"),
        color: AppColors.white,
    },

    textMoneyDebtors: {
        fontSize: Platform.OS === "ios" ? wp("8%") : wp("9%"),
        fontFamily: "zen_kaku_bold",
        lineHeight: hp("4.5%"),
        color: AppColors.lightGreen,
    },

    textMoneyIcon: {
        width: wp("7.3%"),
        height: wp("7.3%"),
        resizeMode: "contain",
        marginTop: Platform.OS === "ios" ? hp("0%") : hp("0.4%"),
    },

    modalCard: {
        backgroundColor: AppColors.green,
        borderRadius: 15,
        width: wp("90%"),
        height: "auto",
        alignSelf: "center",
        alignItems: "center",
        gap: hp("3%"),
    },

    modalTitle: {
        fontFamily: "zen_kaku_light",
        fontSize: hp("2.5%"),
        color: AppColors.white,
        alignSelf: "center",
        marginTop: hp("1%"),
    },

    deleteDebtorModalTitle: {
        fontFamily: "zen_kaku_regular",
        fontSize: hp("2.3%"),
        height: "auto",
        lineHeight: 30,
        paddingHorizontal: wp("4%"),
        textAlign: "center",
        textAlignVertical: "center",
        color: AppColors.white,
        alignSelf: "center",
        marginTop: hp("2%"),
    },

    modalErrorText: {
        fontFamily: "zen_kaku_bold",
        fontSize: hp("1.5%"),
        color: AppColors.neonRed,
        height: 20,
        marginStart: wp("10%"),
        marginTop: hp("-1.5%"),
        alignSelf: "flex-start",
    },

    modalButtonText: {
        fontFamily: "zen_kaku_medium",
        fontSize: hp("2%"),
        height: 30,
        color: AppColors.white,
    },

    modalButtonsContainer: {
        flexDirection: "row",
        paddingHorizontal: wp("10%"),
        paddingTop: hp("1%"),
        marginTop:hp("-2%"),
        paddingBottom: hp("1.5%"),
    },

    loadingIconContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        opacity: 1,
    },
    loading: {
        width: wp("12%"),
        height: hp("3%"),
    },

    helpText: {
        color: AppColors.white,
        fontSize: Platform.OS === "ios" ? wp("3%") : wp("3.3%"),
        fontFamily: "zen_kaku_medium",
        top: Platform.OS === "ios" ? hp("7.9%") : hp("6.77%"),
        start: Platform.OS === "ios" ? wp("27%") : wp("22%"),
        position: "absolute",
    },

    modalAddContainer: {
        position: "absolute",
        marginTop: Platform.OS === "ios" ? hp("34%") : hp("28%"),
    },

    settingsIconContainer: {
        position: "absolute",
        top: hp("6%"),
        start: hp("40%"),
        zIndex: 999,
    },

    settingsIcon: {
        tintColor: AppColors.white,
        width: wp("7.3%"),
        height: wp("7.3%"),
        resizeMode: "contain",
    }
})

export default stylesHome;