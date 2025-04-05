import {LoggedUserInterface, LoginUserInterface} from "../entities/User";


export interface AuthRepositoryInterface {
    login: (user: LoginUserInterface) => Promise<LoggedUserInterface>
}