import {StyleSheet} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {AppColors} from "../../theme/AppTheme";

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
        width: wp("40%"),
        height: 27,
        marginTop: wp("0.5%"),
        flexGrow: 2,
    },

    debt: {
        color: AppColors.white,
        fontFamily: "zen_kaku_medium",
        height: hp("3.5%"),
        fontSize: hp("2.1%"),
        textAlign: "center",
        lineHeight: 30,
        marginStart: wp("1%"),
        flexGrow: 0.5,

    },

    deleteIcon: {
        width: wp("8%"),
        height: wp("8%"),
        tintColor: "#e8f6e7",
        marginEnd: wp("5%")
    },

    detailsIcon: {
        width: wp("9%"),
        height: wp("9%"),
        marginTop: wp("-0.225%"),
        tintColor: AppColors.white,
    },

    footerText: {
        color: AppColors.gray,
        fontSize: wp("3.7%"),
        alignSelf: "center",
        height: 30,
        marginBottom: hp("12%"),
        fontFamily: "zen_kaku_regular"
    }
})

export default stylesDebtCard;