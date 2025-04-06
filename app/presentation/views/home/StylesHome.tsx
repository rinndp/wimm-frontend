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
        backgroundColor: AppColors.colorButton,
        borderRadius: 15,
        width: wp("90%"),
        height: "auto",
        marginBottom: hp("10%"),
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

    modalErrorText: {
        fontFamily: "zen_kaku_bold",
        fontSize: hp("1.5%"),
        color: "#f54646",
        height: 20,
        marginStart: wp("10%"),
        marginTop: hp("-1.5%"),
        alignSelf: "flex-start",
    },

    modalButtonText: {
        fontFamily: "zen_kaku_light",
        fontSize: hp("2%"),
        height: 30,
        color: AppColors.white,
        fontStyle: "italic",
    },

    modalButtonsContainer: {
        flexDirection: "row",
        paddingHorizontal: wp("10%"),
        paddingTop: hp("1%"),
        paddingBottom: hp("1.5%"),
    }

})

export default stylesHome;