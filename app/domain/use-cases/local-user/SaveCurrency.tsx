import {UserLocalRepository} from "../../../data/repositories/UserLocalRepository";


const {saveCurrency} = new UserLocalRepository()

export const saveCurrencyUseCase = async (currency: string) => {
    return await saveCurrency(currency)
}