import {HomeRepository} from "../../../data/repositories/HomeRepository";


const {loadDebtors} = new HomeRepository()

export const loadDebtorsUseCase = async (userSlug: string) => {
    return await loadDebtors(userSlug)
}