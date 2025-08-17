import {Login} from "./app/presentation/views/auth/Login";
import {NavigationContainer} from "@react-navigation/native";
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {useFonts} from "expo-font";
import {DebtorScreen} from "./app/presentation/views/debtors/DebtorScreen";
import {AuthProvider} from "./app/presentation/views/auth/AuthProvider";
import {DebtorDetailsScreen} from "./app/presentation/views/debtor-details/DebtorDetails";
import {Debtor} from "./app/domain/entities/Debtor";
import {TabView} from "react-native-tab-view";
import TabViewLoginRegister from "./app/presentation/views/auth/TabViewLoginRegister";
import {UserNavigation} from "./app/presentation/navigation/UserNavigation";
import {PaperProvider} from "react-native-paper";
import {DefaultTheme} from "./app/presentation/theme/AppTheme";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import {Creditor} from "./app/domain/entities/Creditor";
import {CreditorDetailsScreen} from "./app/presentation/views/creditors-details/CreditorDetails";
import {Dimensions, ImageBackground} from "react-native";


export type RootStackParamsList = {
    TabViewLoginRegister: undefined
    UserNavigation: undefined
    DebtorDetails: {debtor: Debtor}
    CreditorDetails: {creditor: Creditor}
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


    return (

        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                // Animaciones integradas disponibles:
                // CardStyleInterpolators.forHorizontalIOS (slide iOS)
                // CardStyleInterpolators.forVerticalIOS (modal iOS)
                // CardStyleInterpolators.forFadeFromBottomAndroid
                // CardStyleInterpolators.forScaleFromCenterAndroid
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                gestureEnabled: true, // permite swipe para volver en iOS
            }}>
              <Stack.Screen name="TabViewLoginRegister" component={TabViewLoginRegister}/>
              <Stack.Screen name="UserNavigation" component={UserNavigation}/>
              <Stack.Screen name="DebtorDetails" component={DebtorDetailsScreen}/>
              <Stack.Screen name="CreditorDetails" component={CreditorDetailsScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
  );
}
