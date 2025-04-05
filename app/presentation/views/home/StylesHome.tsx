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
    }

})

export default stylesHome;