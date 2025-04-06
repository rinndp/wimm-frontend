import {HomeRepository} from "../../../data/repositories/HomeRepository";
import {AddDebtorDTO} from "../../entities/Debtor";


const {addDebtor} = new HomeRepository()

export const addDebtorUseCase = async (debtor: AddDebtorDTO) => {
    await addDebtor(debtor);
}