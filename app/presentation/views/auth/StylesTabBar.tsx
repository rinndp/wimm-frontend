import {Platform, StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

const stylesTabBar = StyleSheet.create({
    tabLabels: {
        backgroundColor: "rgba(215, 20, 20, 0)",
        width: wp("54%"),
        alignSelf: "center",
        marginEnd: wp("30%"),
        paddingTop: Platform.OS === "ios" ? hp("1%") : hp("3%"),
        elevation: 0,
    },

    label: {
      fontFamily: 'zen_kaku_light',
        fontSize: wp("30%"),
    },

    languageSelectContainer: {
        position: "absolute",
        start: wp("70%"),
        top: hp("7.5%"),
    }
})

export default stylesTabBar