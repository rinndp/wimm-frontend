import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import {LoggedUserInterface} from "../../domain/entities/User";
import {getUserUseCase} from "../../domain/use-cases/local-user/GetUserUseCase";
import {removeUserUseCase} from "../../domain/use-cases/local-user/RemoveUserUseCase";
import {getLanguageUseCase} from "../../domain/use-cases/local-user/GetLanguageUseCase";
import {saveLanguageUseCase} from "../../domain/use-cases/local-user/SaveLanguageUseCase";


export const UseUserLocalStorage = () => {
    const [user, setUser] = useState<LoggedUserInterface>();
    const [language, setLanguage] = useState<string>("en")

    useEffect(() => {
        getUserSession();
        setLanguageApp()
    }, [])

    const getUserSession = async () => {
        const user = await getUserUseCase()
        setUser(user)
    }

    const setLanguageApp = async () => {
        const lan = await getLanguageUseCase()
        setLanguage(lan)
    }

    const deleteUserSession = async () => {
        await removeUserUseCase()
    }

    return {
        user,
        getUserSession,
        deleteUserSession,
        setLanguageApp,
        language,
    }

}

export default UseUserLocalStorage;