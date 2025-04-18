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
        margin: 10,
        padding: 10,
        backgroundColor: AppColors.green,
        width: 200,
    },
    formButtonText:{
        width: "100%",
        fontSize: wp("4.5%"),
        textAlign: "center",
        justifyContent: 'center',
        height: 30,
        fontFamily: "zen_kaku_regular",
        color: AppColors.white,
    }
})