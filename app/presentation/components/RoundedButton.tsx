import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AppColors} from "../theme/AppTheme";

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
        borderColor: AppColors.colorButton,
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: AppColors.colorButton,
        width: 200,
    },
    formButtonText:{
        fontSize: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        color: AppColors.white,
    }
})