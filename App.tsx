import {Login} from "./app/presentation/views/auth/Login";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {useFonts} from "expo-font";

export type RootStackParamsList = {
  Login: undefined
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
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
