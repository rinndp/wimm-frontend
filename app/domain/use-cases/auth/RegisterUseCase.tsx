import {AuthRepository} from "../../../data/repositories/AuthRepository";
import {LoginUserInterface} from "../../entities/User";


const {register} = new AuthRepository()

export const registerUseCase = async (user: LoginUserInterface) => {
    return await register(user)
}