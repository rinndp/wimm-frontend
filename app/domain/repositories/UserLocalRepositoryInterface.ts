import {LoggedUserInterface} from "../entities/User";
export interface UserLocalRepositoryInterface {
    save(user: LoggedUserInterface): Promise<void>;
    saveLanguage(lang: string): Promise<void>;
    saveCurrency(currency: string): Promise<void>;
    getUser(): Promise<LoggedUserInterface>;
    getLanguage(): Promise<string>;
    getCurrency(): Promise<string>;
    remove(): Promise<void>;
}