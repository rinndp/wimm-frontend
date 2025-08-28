import {UserLocalRepository} from "../../../data/repositories/UserLocalRepository";
import {LoggedUserInterface} from "../../entities/User";


const {getLanguage} = new UserLocalRepository();

export const getLanguageUseCase = async () => {
    return await getLanguage()
}