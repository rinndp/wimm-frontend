import {ApiResponse} from "../../data/source/remote/models/ApiResponse";
import {AddCreditDTO, Credit} from "../entities/Credit";


export interface CreditorDetailsRepositoryInterface {
    loadCredits: (creditorId: number) => Promise<Credit[]>
    addCredit: (credit: AddCreditDTO) => Promise<ApiResponse>
    deleteCredit: (creditId: number) => Promise<ApiResponse>
}