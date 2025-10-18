import {UserLocalRepository} from "../../../data/repositories/UserLocalRepository";


const {saveLanguage} = new UserLocalRepository();

export const saveLanguageUseCase = async (lang: string) => {
    await saveLanguage(lang)
}