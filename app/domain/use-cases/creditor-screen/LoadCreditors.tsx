import {CreditorScreenRepository} from "../../../data/repositories/CreditorScreenRepository";


const {loadCreditors} = new CreditorScreenRepository()

export const loadCreditorsUseCase = async (userSlug: string) => {
    return await loadCreditors(userSlug);
}