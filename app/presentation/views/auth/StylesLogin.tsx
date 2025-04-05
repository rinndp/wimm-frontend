import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {StyleSheet} from "react-native";


const stylesLogin = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingTop: wp("20%"),
    },

    logoContainer: {
        marginTop: hp("10%"),
        alignItems: "center",
    },

    logoIcon: {
        width: wp("30%"),
        height: wp("30%"),
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
        gap: hp("2%")
    },

    buttonContainer: {
        marginTop: hp("4%"),
    }
})

export default stylesLogin;