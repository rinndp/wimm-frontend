import {Debtor} from "../entities/Debtor";


export interface HomeRepositoryInterface {
    loadDebtors: (userSlug: string) => Promise<Debtor[]>
}