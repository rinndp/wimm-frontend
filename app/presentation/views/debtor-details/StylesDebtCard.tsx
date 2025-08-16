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
        width: 28,
        height: 27,
        marginTop: wp("0.5%"),
        flexGrow: 2,
    },

    debt: {
        color: AppColors.white,
        fontFamily: "zen_kaku_medium",
        fontSize: hp("2.3%"),
        lineHeight: 30,
        marginStart: wp("8%"),
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
        color: AppColors.white,
        fontSize: wp("4%"),
        alignSelf: "center",
        height: 30,
        marginBottom: hp("6%"),
        fontFamily: "zen_kaku_regular"
    }
})

export default stylesDebtCard;