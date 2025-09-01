import {AuthRepository} from "../../../data/repositories/AuthRepository";
import {LoginUserInterface} from "../../entities/User";


const {register} = new AuthRepository()

export const registerUseCase = async (user: LoginUserInterface, t:(key:string)=>string) => {
    return await register(user, t)
}