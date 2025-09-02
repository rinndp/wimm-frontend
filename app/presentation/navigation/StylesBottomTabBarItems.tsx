import {StyleSheet} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

export const stylesBottomTabBarItems = StyleSheet.create({
    item: {
        position:"absolute",
        top: hp("1.4%"),
        width: wp("7.3%"),
        height: wp("7.3%"),
        resizeMode: "contain",
    },
    itemLabel: {
        position:"absolute",
        top:hp("5%"),
    }
});