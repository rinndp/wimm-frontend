import {CreditorDetailsRepository} from "../../../data/repositories/CreditorDetailsRepository";


const {loadCredits} = new CreditorDetailsRepository()

export const loadCreditsUseCase = async (creditorId: number) => {
    return await loadCredits(creditorId);
}