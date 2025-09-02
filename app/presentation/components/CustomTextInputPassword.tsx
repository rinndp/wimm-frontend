import React, {useState} from "react";
import {Image, KeyboardType, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {AppColors} from "../theme/AppTheme";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

interface Props {
    label: string,
    keyboardType:KeyboardType;
    onChangeText:(text:string)=>void;
    value?:string
}
export const CustomTextInputPassword = ({label, value, keyboardType,onChangeText}:Props) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [iconPassword, setIconPassword] = useState("closed-eye");

    const togglePassword = () => {
        if (secureTextEntry) {
            setSecureTextEntry(false);
            setIconPassword("eye");
        } else {
            setSecureTextEntry(true);
            setIconPassword("closed-eye");
        }
    }

    return (
        <View>
            <Text style={styles.formInputLabel}>{label}</Text>
            <View style={styles.formInputContainerPassword}>
                <TextInput style={styles.formInput}
                           keyboardType={keyboardType}
                           secureTextEntry={secureTextEntry}
                           onChangeText={(text) => onChangeText(text)}
                           value={value}
                ></TextInput>
                <TouchableOpacity onPress={togglePassword} style={styles.iconPasswordToggleContainer}>
                    <Image source={iconPassword === "closed-eye"
                        ? require("../../../assets/closed-eye.png")
                        : require("../../../assets/eye.png")
                    } style={{...styles.iconPasswordToggle}}/>
                </TouchableOpacity>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    formInputLabel: {
        fontSize: wp("3.5%"),
        color:'white',
        marginStart: 5,
        alignSelf:"flex-start",
        marginBottom:10,
        fontFamily: "zen_kaku_regular",
        height: 20,
    },

    iconPasswordToggle: {
        width:wp("7.5%"),
        height:wp("7.5%"),
        resizeMode:'contain',
        tintColor: "#414141",
    },

    iconPasswordToggleContainer: {
        position: "relative",
        backgroundColor: AppColors.white,
        width:wp("7.5%"),
        height:wp("7.5%"),
        alignSelf: "flex-end",
        marginEnd: wp("1%"),
        marginBottom: hp("0.5%"),
        resizeMode:'contain',
        tintColor: "#414141",
    },


    formInput: {
        width:wp("65%"),
        height:hp("4.3%"),
        fontSize: wp("3.6%"),
        borderColor: AppColors.white,
        backgroundColor: 'white',
        paddingVertical: hp("1%"),
        paddingHorizontal: wp("2%"),
        borderRadius:10,
        fontFamily: "zen_kaku_regular"
    },

    formInputContainerPassword: {
        borderColor: AppColors.white,
        backgroundColor: 'white',
        borderRadius:10,
        flexDirection:"row",
        width:wp("75%"),
        height:hp("4.3%"),

    }
})

