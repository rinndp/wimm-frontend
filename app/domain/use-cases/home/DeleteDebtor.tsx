import {HomeRepository} from "../../../data/repositories/HomeRepository";


const {deleteDebtor} = new HomeRepository()

export const deleteDebtorUseCase = async (debtorId: number) => {
    return await deleteDebtor(debtorId);
}