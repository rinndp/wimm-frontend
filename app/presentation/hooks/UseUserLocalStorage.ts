import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import {LoggedUserInterface} from "../../domain/entities/User";
import {getUserUseCase} from "../../domain/use-cases/local-user/GetUserUseCase";
import {removeUserUseCase} from "../../domain/use-cases/local-user/RemoveUserUseCase";
import {getLanguageUseCase} from "../../domain/use-cases/local-user/GetLanguageUseCase";
import {saveLanguageUseCase} from "../../domain/use-cases/local-user/SaveLanguageUseCase";
import {getCurrencyUseCase} from "../../domain/use-cases/local-user/GetCurrency";
import {clearTokens} from "../../data/source/local/secure/TokenStorage";


export const UseUserLocalStorage = () => {
    const [user, setUser] = useState<LoggedUserInterface>();
    const [language, setLanguage] = useState<string>("en")
    const [currency, setCurrency] = useState<string>("€")

    useEffect(() => {
        getUserSession();
        getLanguageApp()
        getCurrencyApp()
    }, [])

    const getUserSession = async () => {
        const user = await getUserUseCase()
        setUser(user)
    }

    const getLanguageApp = async () => {
        const lan = await getLanguageUseCase()
        setLanguage(lan)
    }

    const getCurrencyApp = async () => {
        const currency = await getCurrencyUseCase()
        setCurrency(currency)
    }

    const deleteUserSession = async () => {
        await removeUserUseCase()
        await clearTokens()
    }

    return {
        user,
        getUserSession,
        deleteUserSession,
        getLanguageApp,
        language,
        getCurrencyApp,
        currency
    }

}

export default UseUserLocalStorage;