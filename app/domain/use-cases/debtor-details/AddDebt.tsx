import {DebtorDetailsRepository} from "../../../data/repositories/DebtorDetailsRepository";
import {AddDebtDTO} from "../../entities/Debt";


const {addDebt} = new DebtorDetailsRepository()

export const addDebtUseCase = async (debt: AddDebtDTO) => {
    return await addDebt(debt);
}