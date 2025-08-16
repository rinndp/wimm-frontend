import {LoggedUserInterface} from "../entities/User";
export interface UserLocalRepositoryInterface {
    save(user: LoggedUserInterface): Promise<void>;
    getUser(): Promise<LoggedUserInterface>;
    remove(): Promise<void>;
}