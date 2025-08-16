import {CreditorScreenRepository} from "../../../data/repositories/CreditorScreenRepository";
import {AddDebtorDTO} from "../../entities/Debtor";


const {addCreditor} = new CreditorScreenRepository()

export const addCreditorUseCase = async (creditor: AddDebtorDTO) => {
    return await addCreditor(creditor);
}