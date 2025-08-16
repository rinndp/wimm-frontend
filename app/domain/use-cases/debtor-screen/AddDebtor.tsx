import {DebtorScreenRepository} from "../../../data/repositories/DebtorScreenRepository";
import {AddDebtorDTO} from "../../entities/Debtor";


const {addDebtor} = new DebtorScreenRepository()

export const addDebtorUseCase = async (debtor: AddDebtorDTO) => {
    return await addDebtor(debtor);
}