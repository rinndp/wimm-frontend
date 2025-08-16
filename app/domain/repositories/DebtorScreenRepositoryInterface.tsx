import {AddDebtorDTO, Debtor} from "../entities/Debtor";
import {ApiResponse} from "../../data/source/remote/models/ApiResponse";


export interface DebtorScreenRepositoryInterface {
    loadDebtors: (userSlug: string) => Promise<Debtor[]>
    addDebtor: (debtor: AddDebtorDTO) => Promise<ApiResponse>
    deleteDebtor: (debtorId: number) => Promise<ApiResponse>
}