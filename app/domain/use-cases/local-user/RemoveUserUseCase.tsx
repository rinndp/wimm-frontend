import {UserLocalRepository} from "../../../data/repositories/UserLocalRepository";


const {remove} = new UserLocalRepository()

export const removeUserUseCase = async () => {
    return await remove()
}