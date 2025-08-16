import {Dimensions, ImageBackground, SafeAreaView, View, Text, Image} from "react-native";
import stylesLogin from "./StylesLogin";
import {CustomTextInput} from "../../components/CustomTextInput";
import {CustomTextInputPassword} from "../../components/CustomTextInputPassword";
import {RoundedButton} from "../../components/RoundedButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {AppColors} from "../../theme/AppTheme";
import {useEffect} from "react";
import Toast from "react-native-toast-message";
import {registerViewModel} from "./ViewModel";
import {LoginUserInterface} from "../../../domain/entities/User";


export function Register () {
    const {
        errorMessage,
        setErrorMessage,
        register,
        onChangeRegister,
        registerValues,
        transformValuesIntoUserDTO
    } = registerViewModel()

    useEffect(() => {
        if (errorMessage !== "") {
            Toast.show({
                'type': 'error',
                'text1': errorMessage
            })
            setErrorMessage("");
        }
    }, [errorMessage]);
    return (
        <SafeAreaView style={{backgroundColor: AppColors.darkGreen}}>
                <View style={{...stylesLogin.container, paddingTop: hp("0%")}}>
                    <View style={stylesLogin.logoContainer}>
                        <Image
                            source={require("../../../../assets/wimm-icon.png")}
                            style={stylesLogin.logoIcon}/>
                        <Text style={stylesLogin.logoText}>Wimm</Text>
                    </View>
                    <View style={stylesLogin.formContainer}>
                        <CustomTextInput label={"Email"}
                                         keyboardType={"default"}
                                         secureTextEntry={false}
                                         onChangeText={(text) => onChangeRegister("email", text)}/>

                        <CustomTextInputPassword label={"Password"}
                                                 keyboardType={"default"}
                                                 onChangeText={(text) => onChangeRegister("password", text)}/>

                        <CustomTextInputPassword label={"Confirm password"}
                                                 keyboardType={"default"}
                                                 onChangeText={(text) => onChangeRegister("password2", text)}/>

                        <View style={stylesLogin.buttonContainer}>
                            <RoundedButton text={"Sign up"}
                                           onPressFromInterface={() =>
                                               register(
                                                   transformValuesIntoUserDTO(
                                                       registerValues.email, registerValues.password))}/>
                        </View>
                    </View>
                </View>
            <Toast/>
        </SafeAreaView>
    )
}