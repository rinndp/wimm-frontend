import React from "react";
import {Image, KeyboardType, StyleSheet, Text, TextInput, View} from "react-native";

interface Props {
    label: string,
    keyboardType:KeyboardType;
    secureTextEntry:boolean;
    onChangeText:(text:string)=>void;
}
export const CustomTextInput = ({label, keyboardType,secureTextEntry,onChangeText}:Props) => {
    return (
        <View>
            <Text style={styles.formInputLabel}>{label}</Text>
            <TextInput style={styles.formInput}
                       keyboardType={keyboardType}
                       secureTextEntry={secureTextEntry}
                       onChangeText={(text) => onChangeText(text)}
            ></TextInput>
        </View>
    )

}
const styles = StyleSheet.create({
    formInputLabel: {
        fontSize:15,
        color:'white',
        marginStart: 5,
        alignSelf:"flex-start",
        height: 30,
        fontFamily: "zen_kaku_regular"
    },

    formInput: {
        width:300,
        height:38,
        fontSize: 15,
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius:10,
        fontFamily: "zen_kaku_regular"

    }
})

