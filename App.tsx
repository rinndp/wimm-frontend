import {Login} from "./app/presentation/views/auth/Login";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {useFonts} from "expo-font";
import {HomeScreen} from "./app/presentation/views/home/Home";
import {AuthProvider} from "./app/presentation/views/auth/AuthProvider";
import {DebtorDetailsScreen} from "./app/presentation/views/debtor-details/DebtorDetails";
import {Debtor} from "./app/domain/entities/Debtor";

export type RootStackParamsList = {
    Login: undefined
    Home: undefined
    DebtorDetails: {debtor: Debtor}
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
        <AuthProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="Home" component={HomeScreen}/>
              <Stack.Screen name="DebtorDetails" component={DebtorDetailsScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
  );
}
