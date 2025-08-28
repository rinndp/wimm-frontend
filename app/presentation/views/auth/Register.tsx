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
import {useTranslation} from "react-i18next";


export function Register () {

    const {t} = useTranslation();
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
                'text1': errorMessage,
            })
            setErrorMessage("");
        }
    }, [errorMessage]);
    return (
        <SafeAreaView style={{backgroundColor: AppColors.darkGreen}}>
                <View style={{...stylesLogin.container}}>
                    <Text style={stylesLogin.registerTitle}>{t("create your account")}</Text>
                    <View style={{...stylesLogin.formContainer, marginTop: hp("5%"),}}>
                        <CustomTextInput label={t("email")}
                                         keyboardType={"default"}
                                         secureTextEntry={false}
                                         onChangeText={(text) => onChangeRegister("email", text)}/>

                        <CustomTextInputPassword label={t("password")}
                                                 keyboardType={"default"}
                                                 onChangeText={(text) => onChangeRegister("password", text)}/>
                        <Text style={stylesLogin.helpText}>{t("password must have at least 8 characters long")}</Text>

                        <CustomTextInputPassword label={t("confirm password")}
                                                 keyboardType={"default"}
                                                 onChangeText={(text) => onChangeRegister("password2", text)}/>

                        <View style={stylesLogin.buttonContainer}>
                            <RoundedButton text={t("sign up")}
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