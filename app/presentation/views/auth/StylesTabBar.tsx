import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

const stylesTabBar = StyleSheet.create({
    tabLabels: {
        backgroundColor: "rgba(215, 20, 20, 0)",
        width: wp("40%"),
        alignSelf: "center",
        paddingTop: wp("10%"),
        fontFamily: 'zen_kaku_regular',
        elevation: 0,
    }
})

export default stylesTabBar