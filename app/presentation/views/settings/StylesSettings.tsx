
import {StyleSheet} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {AppColors} from "../../theme/AppTheme";

export const stylesSettings = StyleSheet.create({
    logOutContainer: {
        marginHorizontal: wp("5%"),
        marginTop: hp("20%"),
        alignItems: "center",
        gap: hp("2%"),
        height: wp("6%"),
        alignSelf: "center",
    },

    container: {
        paddingTop: hp("7%"),
    },

    logOutText: {
        fontFamily: "zen_kaku_bold",
        fontSize: wp("5%"),
        lineHeight: hp("2.3%"),
        color: AppColors.neonRed,
        height: 20,
    },

    logOutIcon: {
        width: wp("6%"),
        height: wp("6%"),
        tintColor: AppColors.neonRed,
    },

    label: {
        fontSize: wp("3.5%"),
        marginBottom: hp("1%"),
        fontFamily: "zen_kaku_light",
        color: AppColors.white,
    },

    languageSelectContainer: {
        alignItems: "center",
    },

    userInfoContainer: {
        alignItems: "center",
        alignSelf: "center",
    },

    statisticContainer: {
        gap: 10,
    },

    statisticText: {
        fontSize: wp("4%"),
        fontFamily: "zen_kaku_light",
        color: AppColors.white,
        width: wp("35%")
    },

    statisticValue: {
        fontSize: wp("4%"),
        fontFamily: "zen_kaku_medium",
        width: wp("35%"),
        color: AppColors.neonGreen,
        textAlign: "center"
    }

})