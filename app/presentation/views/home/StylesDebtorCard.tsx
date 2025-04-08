import {StyleSheet} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {AppColors} from "../../theme/AppTheme";

export const stylesDebtorCard = StyleSheet.create({
    card: {
        width: wp("94%"),
        height: hp("15%"),
        backgroundColor: AppColors.green,
        marginBottom: hp("1.5%"),
        borderRadius: 15,
        flexDirection: "row",
        padding: wp("7%"),
    },

    debtorName: {
        fontSize: wp("5.5%"),
        height: 44,
        width: wp("65%"),
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
        tintColor: AppColors.lightGreen,
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

export default stylesDebtorCard;