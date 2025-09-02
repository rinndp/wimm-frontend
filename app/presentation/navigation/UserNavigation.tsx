import stylesDebtCard from "../views/debtor-details/StylesDebtCard";
import {Image, SafeAreaView, View} from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {DebtorScreen} from "../views/debtors/DebtorScreen";
import {AppColors} from "../theme/AppTheme";
import {StyleSheet} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {useTheme} from "react-native-paper";
import {CreditorScreen} from "../views/creditors/CreditorScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {useEffect} from "react";
import {Asset} from "expo-asset";
import {useTranslation} from "react-i18next";
import {stylesBottomTabBarItems} from "./StylesBottomTabBarItems";

const Tab = createBottomTabNavigator();

export const UserNavigation = () => {

    const {t} = useTranslation();

    useEffect(() => {
        Asset.fromModule(require("../../../assets/background.jpg")).downloadAsync();
    }, []);
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "lightgray",
                tabBarStyle: {
                    backgroundColor: AppColors.darkGreen,
                    height: wp("17%"),
                    marginBottom: wp("11%"),
                    borderColor: AppColors.green,
                    borderTopColor: AppColors.green,
                    position: "absolute",
                    borderRadius: wp("5%"),
                    marginHorizontal: wp("3%"),
                    elevation: 5,  // sombra Android
                },
            }}
        >
            <Tab.Screen
                name="Debtors"
                component={DebtorScreen}
                options={{
                    tabBarLabel: t("debtors"),
                    tabBarLabelStyle: {...stylesBottomTabBarItems.itemLabel},
                    tabBarInactiveTintColor: AppColors.green,
                    tabBarActiveTintColor: AppColors.white,
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require("../../../assets/arrow-up.png")}
                            style={stylesBottomTabBarItems.item}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Creditors"
                component={CreditorScreen}
                options={{
                    tabBarLabel: t("creditors"),
                    tabBarInactiveTintColor: AppColors.green,
                    tabBarActiveTintColor: AppColors.white,
                    tabBarLabelStyle: {...stylesBottomTabBarItems.itemLabel},
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require("../../../assets/arrow-down.png")}
                            style={stylesBottomTabBarItems.item}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};