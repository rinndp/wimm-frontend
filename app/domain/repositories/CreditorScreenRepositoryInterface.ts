import {Creditor} from "../entities/Creditor";
import {ApiResponse} from "../../data/source/remote/models/ApiResponse";
import {AddDebtorDTO} from "../entities/Debtor";


export interface CreditorScreenRepositoryInterface {
    loadCreditors: (slug: string) => Promise<Creditor[]>
    addCreditor: (Creditor: AddDebtorDTO) => Promise<ApiResponse>
    deleteCreditor: (creditorId: number) => Promise<ApiResponse>
}