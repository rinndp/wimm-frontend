import React from "react";
import {
    Image,
    KeyboardType,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    TextInput,
    TextInputEndEditingEventData, TextInputProps,
    View
} from "react-native";
import {AppColors} from "../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

interface Props {
    label: string,
    keyboardType:KeyboardType;
    secureTextEntry:boolean;
    onChangeText:(text:string)=>void;
    maxLength?:number;
}
export const CustomTextInput = ({label, keyboardType,secureTextEntry,onChangeText, maxLength}:Props) => {

    return (
        <View>
            <Text style={styles.formInputLabel}>{label}</Text>
            <TextInput style={{...styles.formInput, width: keyboardType === "numeric" ? 100 : 300 }}
                       keyboardType={keyboardType}
                       secureTextEntry={secureTextEntry}
                       textContentType={"username"}
                       onEndEditing={(e) => onChangeText(e.nativeEvent.text)}
                       onChangeText={(text) => onChangeText(text)}
                       maxLength={maxLength}
            ></TextInput>
        </View>
    )

}
const styles = StyleSheet.create({
    formInputLabel: {
        fontSize: wp("3.5%"),
        color:'white',
        marginStart: 5,
        alignSelf:"flex-start",
        height: hp("3.3%"),
        fontFamily: "zen_kaku_regular"
    },

    formInput: {
        width: wp("30%"),
        height:hp("4.3%"),
        fontSize: wp("3.6%"),
        borderColor: AppColors.white,
        backgroundColor: 'white',
        paddingVertical: hp("1%"),
        paddingHorizontal: wp("2%"),
        borderRadius:10,
        fontFamily: "zen_kaku_regular"

    }
})

