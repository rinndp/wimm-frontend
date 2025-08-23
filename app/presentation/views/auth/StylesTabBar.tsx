import {Platform, StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

const stylesTabBar = StyleSheet.create({
    tabLabels: {
        backgroundColor: "rgba(215, 20, 20, 0)",
        width: wp("40%"),
        alignSelf: "center",
        paddingTop: Platform.OS === "ios" ? hp("1%") : hp("3%"),
        fontFamily: 'zen_kaku_regular',
        elevation: 0,
    }
})

export default stylesTabBar