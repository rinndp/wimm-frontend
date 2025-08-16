import {DebtorDetailsRepository} from "../../../data/repositories/DebtorDetailsRepository";


const {deleteDebt} = new DebtorDetailsRepository()

export const deleteDebtUseCase = async (debtId: number) => {
    return await deleteDebt(debtId)
}