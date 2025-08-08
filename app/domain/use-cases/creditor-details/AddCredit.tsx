import {CreditorDetailsRepository} from "../../../data/repositories/CreditorDetailsRepository";
import {AddCreditDTO} from "../../entities/Credit";


const {addCredit} = new CreditorDetailsRepository()

export const addCreditUseCase = async (credit: AddCreditDTO) => {
    return await addCredit(credit);
}