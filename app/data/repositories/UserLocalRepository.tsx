import {UserLocalRepositoryInterface} from "../../domain/repositories/UserLocalRepositoryInterface";
import {LoggedUserInterface} from "../../domain/entities/User";
import {LocalStorage} from "../source/local/LocalStorage";

export class UserLocalRepository implements UserLocalRepositoryInterface {
    async getUser(): Promise<LoggedUserInterface> {
        const {getItem} = LocalStorage();
        const data = await getItem("wimm_user")
        return JSON.parse(data as any) as LoggedUserInterface;
    }

    async remove(): Promise<void> {
        const {removeItem} = LocalStorage()
        await removeItem("wimm_user")
    }

    async save(user: LoggedUserInterface): Promise<void> {
        const {save} = LocalStorage()
        await save("wimm_user", JSON.stringify(user))
    }

}