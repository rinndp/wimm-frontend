import {DebtorScreenRepository} from "../../../data/repositories/DebtorScreenRepository";


const {loadDebtors} = new DebtorScreenRepository()

export const loadDebtorsUseCase = async (userSlug: string) => {
    return await loadDebtors(userSlug)
}