import stylesDebtCard from "../views/debtor-details/StylesDebtCard";
import {Image, View} from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {DebtorScreen} from "../views/debtors/DebtorScreen";
import {AppColors} from "../theme/AppTheme";
import {StyleSheet} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {useTheme} from "react-native-paper";
import {CreditorScreen} from "../views/creditors/CreditorScreen";

const Tab = createMaterialBottomTabNavigator();

export const UserNavigation = () => {
    return (
        <Tab.Navigator
            shifting={true}
            activeColor="white"
            barStyle={{
                backgroundColor: AppColors.green,
                height: wp("18%"),
                elevation: 10,
                borderRadius: wp("5%"),
                margin:wp("3%"),
                overflow: "hidden",
            }}

        >
            <Tab.Screen
                name="Debtors"
                component={DebtorScreen}
                options={{
                    tabBarLabel: 'Debtors',
                    tabBarColor: '#004d40', //
                    tabBarIcon: ({ color }: any) => (
                        <Image source={require('../../../assets/arrow-up.png')}
                               style={stylesTabBarItems.item}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Creditors"
                component={CreditorScreen}
                options={{
                    tabBarLabel: 'Creditors',
                    tabBarColor: '#004d40',
                    tabBarIcon: ({ color }: any) => (
                        <Image source={require('../../../assets/arrow-down.png')}
                               style={stylesTabBarItems.item}/>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export const stylesTabBarItems = StyleSheet.create({
    item: {
        width: wp("7.3%"),
        height: wp("7.3%"),
        resizeMode: "contain",
        paddingHorizontal: wp("5%"),

    }
})