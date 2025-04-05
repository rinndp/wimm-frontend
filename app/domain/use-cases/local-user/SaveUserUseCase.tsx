import {UserLocalRepository} from "../../../data/repositories/UserLocalRepository";
import {LoggedUserInterface} from "../../entities/User";


const {save} = new UserLocalRepository();

export const saveUSerUserUseCase = async (user:  LoggedUserInterface) => {
    await save(user)
}