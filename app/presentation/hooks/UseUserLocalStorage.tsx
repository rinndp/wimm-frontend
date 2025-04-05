import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import {LoggedUserInterface} from "../../domain/entities/User";
import {getUserUseCase} from "../../domain/use-cases/local-user/GetUserUseCase";


export const UseUserLocalStorage = () => {
    const [user, setUser] = useState<LoggedUserInterface>();

    useEffect(() => {
        getUserSession();
    }, [])

    const getUserSession = async () => {
        setUser(await getUserUseCase());
    }

    return {
        user,
        getUserSession,
    }

}