import {DebtorDetailsRepository} from "../../../data/repositories/DebtorDetailsRepository";


const {loadDebts} = new DebtorDetailsRepository()

export const loadDebtsUseCase = async (debtorId: number) => {
    return await loadDebts(debtorId);
}