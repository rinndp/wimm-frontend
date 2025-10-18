import {LoggedUserInterface, LoginUserInterface} from "../entities/User";
import {ApiResponse} from "../../data/source/remote/models/ApiResponse";


export interface AuthRepositoryInterface {
    login: (user: LoginUserInterface, t: (key: string) => string) => Promise<LoggedUserInterface>
    register: (user: LoginUserInterface, t: (key: string) => string) => Promise<ApiResponse>
}