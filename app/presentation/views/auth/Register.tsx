import {Dimensions, ImageBackground, SafeAreaView, View, Text, Image} from "react-native";
import stylesLogin from "./StylesLogin";
import {CustomTextInput} from "../../components/CustomTextInput";
import {CustomTextInputPassword} from "../../components/CustomTextInputPassword";
import {RoundedButton} from "../../components/RoundedButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {AppColors} from "../../theme/AppTheme";


export function Register () {
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
                                         onChangeText={(text) => {}}/>

                        <CustomTextInputPassword label={"Password"}
                                                 keyboardType={"default"}
                                                 onChangeText={(text) => {}}/>

                        <CustomTextInputPassword label={"Confirm password"}
                                                 keyboardType={"default"}
                                                 onChangeText={(text) => {}}/>

                        <View style={stylesLogin.buttonContainer}>
                            <RoundedButton text={"Sign up"}
                                           onPressFromInterface={() => {}}/>
                        </View>
                    </View>
                </View>
        </SafeAreaView>
    )
}