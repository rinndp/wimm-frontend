import {DarkTheme, NavigationContainer, useNavigation} from "@react-navigation/native";
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {useFonts} from "expo-font";
import {DebtorDetailsScreen} from "./app/presentation/views/debtor-details/DebtorDetails";
import {Debtor} from "./app/domain/entities/Debtor";
import TabViewLoginRegister from "./app/presentation/views/auth/TabViewLoginRegister";
import {UserNavigation} from "./app/presentation/navigation/UserNavigation";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import {Creditor} from "./app/domain/entities/Creditor";
import {CreditorDetailsScreen} from "./app/presentation/views/creditors-details/CreditorDetails";
import {UseUserLocalStorage} from "./app/presentation/hooks/UseUserLocalStorage";
import {useEffect} from "react";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SettingScreen} from "./app/presentation/views/settings/SettingScreen";
import {AuthProvider} from "./app/presentation/views/auth/AuthProvider";
import {clearTokens} from "./app/data/source/local/secure/TokenStorage";


export type RootStackParamsList = {
    TabViewLoginRegister: undefined
    UserNavigation: undefined
    DebtorDetails: {debtor: Debtor}
    CreditorDetails: {creditor: Creditor}
    SettingScreen: undefined
}


const Stack = createStackNavigator<RootStackParamsList>();

export default function App() {

    const [fontsLoaded] = useFonts({
        "zen_kaku_light": require("./assets/fonts/zen_kaku_gothic_antique_light.ttf"),
        "zen_kaku_medium": require("./assets/fonts/zen_kaku_gothic_antique_medium.ttf"),
        "zen_kaku_regular": require("./assets/fonts/zen_kaku_gothic_antique_regular.ttf"),
        "zen_kaku_bold": require("./assets/fonts/zen_kaku_gothic_antique_bold.ttf"),
        "zen_kaku_black": require("./assets/fonts/zen_kaku_gothic_antique_black.ttf"),
    });

    const {
        user,
        getLanguageApp,
        getCurrencyApp
    } = UseUserLocalStorage()

    SplashScreen.preventAutoHideAsync()

    useEffect(() => {
        const loadAssets = async () => {
            try {
                await getLanguageApp();
                await getCurrencyApp();
                const assets = [
                    require("./assets/background.jpg"),
                    require("./assets/suo-flag.png"),
                    require("./assets/es-flag.png"),
                    require("./assets/en-flag.png"),
                    require("./assets/uk-flag.png"),
                    require("./assets/eu-flag.png"),
                    require("./assets/japan-flag.png"),
                    require("./assets/delete-debtor-icon.png"),
                    require("./assets/log-out-icon.png"),
                    require("./assets/wimm-icon.png"),
                    require("./assets/settings-icon.png"),
                    require("./assets/arrow-up.png"),
                    require("./assets/arrow-down.png"),
                    require("./assets/add-icon.png"),
                    require("./assets/fonts/zen_kaku_gothic_antique_light.ttf"),
                    require("./assets/fonts/zen_kaku_gothic_antique_medium.ttf"),
                    require("./assets/fonts/zen_kaku_gothic_antique_regular.ttf"),
                    require("./assets/fonts/zen_kaku_gothic_antique_bold.ttf"),
                    require("./assets/fonts/zen_kaku_gothic_antique_black.ttf"),
                ];
                await Promise.all(assets.map(asset => Asset.fromModule(asset).downloadAsync()));
                await SplashScreen.hideAsync();
            } catch (e) {
                console.log(e);
            }
        };
        loadAssets();

    }, []);

    // useEffect(() => {
    //     GoogleSignin.configure({
    //         webClientId: '838027193595-evbqgq0d5a39tq92s9plhtve9orqjd50.apps.googleusercontent.com', // requerido para Android
    //         offlineAccess: true, // si quieres refresh tokens
    //     });
    // }, []);


    return (
        <SafeAreaProvider>
        <AuthProvider>
          <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator
                initialRouteName={user && user.slug ? "UserNavigation" : "TabViewLoginRegister"}
                screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                gestureEnabled: true,
            }}>
              <Stack.Screen name="TabViewLoginRegister" component={TabViewLoginRegister}/>
              <Stack.Screen name="UserNavigation" component={UserNavigation}/>
              <Stack.Screen name="DebtorDetails" component={DebtorDetailsScreen}/>
              <Stack.Screen name="CreditorDetails" component={CreditorDetailsScreen}/>
              <Stack.Screen name="SettingScreen" component={SettingScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
        </SafeAreaProvider>
  );
}
