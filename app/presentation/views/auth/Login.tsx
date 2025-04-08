import {PropsStackNavigation} from "../../interfaces/StackNav";
import {useNavigation} from "@react-navigation/native";
import {Dimensions, Image, ImageBackground, SafeAreaView, View, Text} from "react-native";
import stylesLogin from "./StylesLogin";
import {CustomTextInput} from "../../components/CustomTextInput";
import {loginViewModel} from "./ViewModel";
import {CustomTextInputPassword} from "../../components/CustomTextInputPassword";
import {RoundedButton} from "../../components/RoundedButton";
import Toast from "react-native-toast-message";
import {useEffect} from "react";
import {AppColors} from "../../theme/AppTheme";

export function Login ({navigation = useNavigation(), route}: PropsStackNavigation) {
    const {
        onChangeLogin,
        loginValues,
        login,
        errorMessage,
        setErrorMessage,
        userIsLogged
    } = loginViewModel()

    useEffect(() => {
        if (errorMessage !== "") {
            Toast.show({
                'type': 'error',
                'text1': errorMessage
            })
            setErrorMessage("");
        }
    }, [errorMessage]);

    useEffect(() => {
        if (userIsLogged)
            navigation.replace("Home")
    }, [userIsLogged]);

    return (
        <SafeAreaView style={{backgroundColor: AppColors.darkGreen}}>
        <View style={stylesLogin.container}>
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
                                         onChangeText={(text) => onChangeLogin("email", text)}/>

                        <CustomTextInputPassword label={"Password"}
                                                 keyboardType={"default"}
                                                 onChangeText={(text) => onChangeLogin("password", text)}/>

                        <View style={stylesLogin.buttonContainer}>
                            <RoundedButton text={"Sign in"}
                                           onPressFromInterface={() => login()}/>
                        </View>
                    </View>
                </View>
                <Toast/>
        </SafeAreaView>
    )
}