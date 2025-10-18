import {PropsStackNavigation} from "../../interfaces/StackNav";
import {useNavigation} from "@react-navigation/native";
import {Dimensions, Image, ImageBackground, SafeAreaView, View, Text, Button} from "react-native";
import stylesLogin from "./StylesLogin";
import {CustomTextInput} from "../../components/CustomTextInput";
import {loginViewModel} from "./ViewModel";
import {CustomTextInputPassword} from "../../components/CustomTextInputPassword";
import {RoundedButton} from "../../components/RoundedButton";
import Toast from "react-native-toast-message";
import {useEffect} from "react";
import {AppColors} from "../../theme/AppTheme";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import i18n from "../../utils/i18n";
import { useTranslation } from "react-i18next";

export function Login ({navigation = useNavigation(), route}: PropsStackNavigation) {
    const { t } = useTranslation();

    const {
        onChangeLogin,
        loginValues,
        login,
        errorMessage,
        setErrorMessage,
        user,
        //signInWithGoogle
    } = loginViewModel()

    const {language, getLanguageApp} = UseUserLocalStorage()

    useEffect(() => {
        getLanguageApp()
    }, [language]);

    const insets = useSafeAreaInsets();

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
        <SafeAreaView style={{backgroundColor: AppColors.ultraDarkGreen}}>
        <View style={stylesLogin.container}>
                    <View style={stylesLogin.logoContainer}>
                        <Image
                            source={require("../../../../assets/wimm-icon.png")}
                            style={stylesLogin.logoIcon}/>
                        <Text style={stylesLogin.logoText}>Wimm</Text>
                    </View>
                    <View style={stylesLogin.formContainer}>
                        <CustomTextInput label={t("email")}
                                         keyboardType={"email-address"}
                                         secureTextEntry={false}
                                         textContentType={"emailAddress"}
                                         autoComplete={"email"}
                                         onChangeText={(text) => onChangeLogin("email", text)}/>

                        <CustomTextInputPassword label={t("password")}
                                                 keyboardType={"default"}
                                                 onChangeText={(text) => onChangeLogin("password", text)}
                                                 value={loginValues.password}/>

                        <View style={stylesLogin.buttonContainer}>
                            <RoundedButton text={t("sign in")}
                                           onPressFromInterface={async () => {
                                               const user = await login()
                                               if (user)
                                                   navigation.replace("UserNavigation")
                                           }}/>
                        </View>
                        {/*<View style={stylesLogin.buttonContainer}>*/}
                        {/*    <RoundedButton text={"Google"}*/}
                        {/*                   onPressFromInterface={() => signInWithGoogle()}/>*/}
                        {/*</View>*/}
                    </View>
                </View>
                <Toast/>
        </SafeAreaView>
    )
}