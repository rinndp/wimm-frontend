import {Dimensions, StyleSheet} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {AppColors} from "../../theme/AppTheme";
import {white} from "react-native-paper/lib/typescript/styles/themes/v2/colors";


const stylesDebtorDetails = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        paddingHorizontal: wp("9%"),
    },

    goBackIcon: {
        tintColor: AppColors.white,
        width: wp("7%"),
        height: wp("7%"),
        marginTop: wp("12%"),
        marginStart: wp("3%"),
    },

    header: {
        paddingTop: hp("5%"),
        alignItems:"flex-start",
    },

    detailsDebtorName: {
        fontSize: wp("7%"),
        fontFamily: "zen_kaku_regular",
        color: AppColors.white,
        height: 50,
    },

    detailsDebtorDebt: {
        fontSize: wp("8%"),
        verticalAlign: "middle",
        fontFamily: "zen_kaku_medium",
        color: AppColors.white,
    },

    debtContainer: {
        flexDirection: 'row',
        gap: 17,
        verticalAlign: "bottom",
    },

    addDebtIcon: {
        width: wp("8%"),
        marginTop: wp("1.2%"),
        height: wp("8%"),
        tintColor: AppColors.white,
    },

    modalMoreInfoDate: {
        color: AppColors.white,
        fontSize: wp("5%"),
        fontFamily: "zen_kaku_medium",
    },

    modalMoreInfoText: {
        color: AppColors.white,
        fontSize: wp("4.2%"),
        height: "auto",
        fontFamily: "zen_kaku_regular",
        textAlign: "center",
        verticalAlign: "middle",
    },

    modalInfoContainer: {
        alignItems: "center",
        width: "100%",
        paddingHorizontal: wp("5%"),
        gap: 20,
    }

})

export default stylesDebtorDetails;