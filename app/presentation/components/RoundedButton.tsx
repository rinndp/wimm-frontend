import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AppColors} from "../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

interface Props {
    text: string,
    onPressFromInterface: () => void,
}

export const RoundedButton = ({text, onPressFromInterface}: Props) => {
    return(
        <TouchableOpacity
            style={styles.formButton}
            onPress={() => onPressFromInterface()}
        >
            <Text style={styles.formButtonText}>{text}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    formButton:{
        elevation: 10,
        borderWidth: 1,
        borderColor: AppColors.green,
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: wp("2%"),
        padding: wp("3%"),
        backgroundColor: AppColors.darkGreen,
        width: wp("50%"),
    },
    formButtonText:{
        width: "100%",
        fontSize: wp("4.5%"),
        textAlign: "center",
        justifyContent: 'center',
        lineHeight: hp("2.7%"),
        fontFamily: "zen_kaku_regular",
        color: AppColors.white,
    }
})