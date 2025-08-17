import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {StyleSheet} from "react-native";
import {AppColors} from "../../theme/AppTheme";


const stylesLogin = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
    },

    logoContainer: {
        marginTop: hp("10%"),
        alignItems: "center",
    },

    logoIcon: {
        width: wp("30%"),
        height: wp("30%"),
        tintColor: AppColors.white
    },

    logoText: {
        fontFamily: "zen_kaku_light",
        fontSize: wp("8%"),
        position: "absolute",
        marginTop: hp("11%"),
        color: "#FFF",
    },

    formContainer: {
        marginTop: hp("7%"),
        gap: hp("2%"),
    },

    buttonContainer: {
        marginTop: hp("4%"),
    },

    footerText: {
        color: AppColors.white,
        fontFamily: "zen_kaku_light",
        fontSize: wp("3.8%"),
        position: "absolute",
        zIndex: 5,
        top: hp("96%"),
        lineHeight: hp("4%"),
        alignSelf: "center",
    },

    footerTextRinndp: {
        color: AppColors.white,
        fontFamily: "zen_kaku_regular",
        fontSize: wp("4.1%"),
    }
})

export default stylesLogin;