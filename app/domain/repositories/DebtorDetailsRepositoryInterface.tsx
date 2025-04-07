import {AddDebtDTO, Debt} from "../entities/Debt";
import {ApiResponse} from "../../data/source/remote/models/ApiResponse";


export interface DebtorDetailsRepositoryInterface {
    loadDebts: (debtorId: number) => Promise<Debt[]>
    deleteDebt: (debtId: number) => Promise<ApiResponse>
    addDebt: (debt: AddDebtDTO) => Promise<ApiResponse>
}