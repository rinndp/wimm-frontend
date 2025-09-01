import {AuthRepositoryInterface} from "../../domain/repositories/AuthRepositoryInterface";
import {LoggedUserInterface, LoginUserInterface} from "../../domain/entities/User";
import {ApiDelivery} from "../source/remote/api/ApiDevlivery";
import {AxiosError} from "axios";
import Toast from "react-native-toast-message";
import {ApiResponse} from "../source/remote/models/ApiResponse";
import {useTranslation} from "react-i18next";


export class AuthRepository implements AuthRepositoryInterface {

    async login(user: LoginUserInterface, t: (key: string) => string): Promise<LoggedUserInterface> {
        try {
            const response = await ApiDelivery.post("/users/login", user);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError<{error:string}>)
            if (e.response?.data) {
                Toast.show({
                    'type': 'error',
                    'text1': t(e.response.data.error),
                })
            } else {
                console.log("Unknown error:", e);
            }
            return Promise.reject(e);
        }
    }

    async register(user: LoginUserInterface, t: (key: string) => string): Promise<ApiResponse> {
        try {
            const response = await ApiDelivery.post("/users/register", user);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError<{error:string}>)
            if (e.response?.data) {
                Toast.show({
                    'type': 'error',
                    'text1': t(e.response.data.error),
                })
            } else {
                console.log("Unknown error:", e);
            }
            return Promise.reject(e);
        }
    }

}