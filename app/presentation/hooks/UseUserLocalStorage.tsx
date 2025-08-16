import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import {LoggedUserInterface} from "../../domain/entities/User";
import {getUserUseCase} from "../../domain/use-cases/local-user/GetUserUseCase";
import {removeUserUseCase} from "../../domain/use-cases/local-user/RemoveUserUseCase";


export const UseUserLocalStorage = () => {
    const [user, setUser] = useState<LoggedUserInterface>();

    useEffect(() => {
        getUserSession();
    }, [])

    const getUserSession = async () => {
        const user = await getUserUseCase()
        setUser(user)
    }

    const deleteUserSession = async () => {
        await removeUserUseCase()
    }

    return {
        user,
        getUserSession,
        deleteUserSession
    }

}