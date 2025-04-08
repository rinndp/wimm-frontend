import {LoggedUserInterface, LoginUserInterface} from "../entities/User";
import {ApiResponse} from "../../data/source/remote/models/ApiResponse";


export interface AuthRepositoryInterface {
    login: (user: LoginUserInterface) => Promise<LoggedUserInterface>
    register: (user: LoginUserInterface) => Promise<ApiResponse>
}