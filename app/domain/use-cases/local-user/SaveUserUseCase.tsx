import {UserLocalRepository} from "../../../data/repositories/UserLocalRepository";
import {LoggedUserInterface} from "../../entities/User";


const {save} = new UserLocalRepository();

export const saveUserUserUseCase = async (user:  LoggedUserInterface) => {
    return await save(user)
}