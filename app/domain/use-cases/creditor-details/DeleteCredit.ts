import {CreditorDetailsRepository} from "../../../data/repositories/CreditorDetailsRepository";

const {deleteCredit} = new CreditorDetailsRepository()

export const deleteCreditUseCase = async (creditId: number) => {
    return await deleteCredit(creditId);
}