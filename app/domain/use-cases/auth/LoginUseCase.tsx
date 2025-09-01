import {AuthRepository} from "../../../data/repositories/AuthRepository";
import {LoggedUserInterface, LoginUserInterface} from "../../entities/User";


const {login} = new AuthRepository()

export const loginUseCase = async (user: LoginUserInterface, t: (key: string) => string): Promise<LoggedUserInterface> => {
    return await login(user, t)
}
