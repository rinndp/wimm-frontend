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
} from "react-native";
import stylesTabBar from "./StylesTabBar";
import {AppColors} from "../../theme/AppTheme";
import React, {useEffect} from "react";
import {Register} from "./Register";
import {registerViewModel} from "./ViewModel";

const renderScene = SceneMap({
    login: Login,
    register: Register,
});

const renderTabBar = (props: any) => (
    <SafeAreaView style={{backgroundColor: AppColors.darkGreen}}>
            <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: AppColors.white }}
                style={stylesTabBar.tabLabels}
            />
    </SafeAreaView>
);

export default function TabViewLoginRegister({}) {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'login', title: 'Sign in' },
        { key: 'register', title: 'Sign up' },
    ]);

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