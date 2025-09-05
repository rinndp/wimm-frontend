import {Dimensions, Platform, StyleSheet} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {AppColors} from "../../theme/AppTheme";
import {white} from "react-native-paper/lib/typescript/styles/themes/v2/colors";


const stylesDebtorDetails = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        paddingHorizontal: wp("8%"),
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
        fontSize: wp("6.4%"),
        width: wp("90%"),
        paddingEnd: wp("5%"),
        fontFamily: "zen_kaku_regular",
        color: AppColors.white,
        height: "auto",
        lineHeight: hp("4%"),
        paddingBottom: hp("1%"),
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
        marginTop: Platform.OS === "ios" ? wp("1.2%") : wp("1%"),
        height: wp("8%"),
        tintColor: AppColors.white,
    },

    modalMoreInfoDate: {
        marginTop: wp("4%"),
        color: AppColors.white,
        fontSize: wp("3.9%"),
        fontFamily: "zen_kaku_medium",
    },

    modalMoreInfoText: {
        color: AppColors.white,
        fontSize: wp("4.2%"),
        height: "auto",
        lineHeight: hp("3%"),
        fontFamily: "zen_kaku_regular",
        textAlign: "justify",
        paddingHorizontal: wp("8%"),
        verticalAlign: "middle",
    },

    modalInfoContainer: {
        alignItems: "center",
        width: "100%",
        paddingHorizontal: wp("5%"),
        gap: 20,
    },

    modalAddContainer: {
        alignItems:"center",
        position:"absolute",
        marginTop: Platform.OS === "ios" ? hp("30%") : hp("23%")
    }

})

export default stylesDebtorDetails;