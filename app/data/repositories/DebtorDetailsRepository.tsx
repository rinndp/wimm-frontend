import {DebtorDetailsRepositoryInterface} from "../../domain/repositories/DebtorDetailsRepositoryInterface";
import {AddDebtDTO, Debt} from "../../domain/entities/Debt";
import {AxiosError} from "axios";
import {ApiDelivery} from "../source/remote/api/ApiDevlivery";
import {ApiResponse} from "../source/remote/models/ApiResponse";
import Toast from "react-native-toast-message";


export class DebtorDetailsRepository implements DebtorDetailsRepositoryInterface {
    async loadDebts(debtorId: number): Promise<Debt[]> {
        try {
            const response = await ApiDelivery.get(`/debtors/${debtorId}/debts`);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError<{error : string}>)
            console.log(e.response?.data)
            return Promise.reject(e.response?.data)
        }
    }

    async deleteDebt(debtId: number): Promise<ApiResponse> {
        try {
            const response = await ApiDelivery.delete(`/debts/${debtId}`);
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError<{error : string}>)
            console.log(e.response?.data)
            return Promise.reject(e.response?.data)
        }
    }

    async addDebt(debt: AddDebtDTO): Promise<ApiResponse> {
        try {
            const response = await ApiDelivery.post("/debts", debt);
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError<{error : string}>)
            console.log(e.response?.data)
            return Promise.reject(e.response?.data)
        }
    }
}