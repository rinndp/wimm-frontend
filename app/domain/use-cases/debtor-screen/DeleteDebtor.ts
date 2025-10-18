import {DebtorScreenRepository} from "../../../data/repositories/DebtorScreenRepository";


const {deleteDebtor} = new DebtorScreenRepository()

export const deleteDebtorUseCase = async (debtorId: number) => {
    return await deleteDebtor(debtorId);
}