import {LocalStorage} from "../../../data/source/local/LocalStorage";
import {UserLocalRepository} from "../../../data/repositories/UserLocalRepository";


const {getUser} = new UserLocalRepository();

export const getUserUseCase = async () => {
    return await getUser();
}