import {StyleSheet} from "react-native";
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

    logoHome: {
        width: wp("13%"),
        height: hp("9%"),
    },

    textHome: {
        fontSize: wp("5.5%"),
        height: 43,
        fontFamily: "zen_kaku_light",
        color: AppColors.white,
    },

    textMoney: {
        fontSize: wp("9%"),
        height: 50,
        fontFamily: "zen_kaku_bold",
        color: AppColors.white,
    },

    modalCard: {
        backgroundColor: AppColors.green,
        borderRadius: 15,
        width: wp("90%"),
        height: "auto",
        alignSelf: "center",
        alignItems: "center",
        gap: 20,
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
        height: 60,
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
        paddingBottom: hp("1.5%"),
    },

    logOutContainer: {
        position: "absolute",
        top: 0,
        marginHorizontal: wp("5%"),
        marginTop: wp("13%"),
        start: 0,
        alignItems: "center",
        gap: 10,
    },

    logOutText: {
        fontFamily: "zen_kaku_bold",
        fontSize: hp("1.5%"),
        color: AppColors.neonRed,
        height: 20,

    },

    logOutIcon: {
        width: wp("4%"),
        height: wp("4%"),
        tintColor: AppColors.neonRed,
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
        fontFamily: "zen_kaku_medium",
        top: hp("6.35%"),
        start: wp("23%"),
        position: "absolute",
    }
})

export default stylesHome;