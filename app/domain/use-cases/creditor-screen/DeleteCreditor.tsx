import {CreditorScreenRepository} from "../../../data/repositories/CreditorScreenRepository";


const {deleteCreditor} = new CreditorScreenRepository()

export const deleteCreditorUseCase = async (creditorId: number) => {
    return await deleteCreditor(creditorId);
}