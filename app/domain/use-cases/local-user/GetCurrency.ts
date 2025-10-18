import {UserLocalRepository} from "../../../data/repositories/UserLocalRepository";


const {getCurrency} = new UserLocalRepository()

export const getCurrencyUseCase = async () => {
    return await getCurrency()
}