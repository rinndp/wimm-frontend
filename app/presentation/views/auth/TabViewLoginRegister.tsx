import {
    TabView,
    SceneMap,
    TabBar,
} from 'react-native-tab-view';
import {Login} from "./Login";
import {
    Dimensions,
    ImageBackground, SafeAreaView,
    useWindowDimensions,
    View,
    Text
} from "react-native";
import stylesTabBar from "./StylesTabBar";
import {AppColors} from "../../theme/AppTheme";
import React, {useEffect, useState} from "react";
import {Register} from "./Register";
import {registerViewModel} from "./ViewModel";
import stylesHome from "../debtors/StylesHome";
import stylesLogin from "./StylesLogin";
import {heightPercentageToDP as hp, widthPercentageToDP} from "react-native-responsive-screen";
import DropDownPicker from "react-native-dropdown-picker";
import {LanguageSelect} from "../../components/LanguageSelect";
import {useTranslation} from "react-i18next";
import {styles} from "react-native-toast-message/lib/src/components/BaseToast.styles";


const renderScene = SceneMap({
    login: Login,
    register: Register,
});

const renderTabBar = (props: any) => (
    <SafeAreaView style={{backgroundColor: AppColors.darkGreen, zIndex: 1}}>
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: AppColors.white }}
            style={stylesTabBar.tabLabels}
        />
        <View style={stylesTabBar.languageSelectContainer}>
            <LanguageSelect/>
        </View>
        <Text style={{...stylesLogin.footerText, top: hp("86.5%"),}}>Developed by <Text style={stylesLogin.footerTextRinndp}>rinndp</Text></Text>
        <Text style={stylesLogin.footerText}>Copyright © 2025 All rights reserved</Text>
    </SafeAreaView>
);

export default function TabViewLoginRegister() {
    const layout = useWindowDimensions();
    const [open, setOpen] = useState(false);
    const {t} = useTranslation()

    const [index, setIndex] = React.useState(0);
    let [routes, setRoutes] = React.useState([
        { key: 'login', title: t("sign in")},
        { key: 'register', title: t("sign up")},
    ]);

    useEffect(() => {
        setRoutes([
            { key: 'login', title: t("sign in")},
            { key: 'register', title: t("sign up")},
        ]);
    }, [t]);

    const {userCreated} = registerViewModel()

    useEffect(() => {
        if (userCreated)
            setIndex(0);
    }, [userCreated]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            initialLayout={{ width: layout.width }}
        />
    );
}