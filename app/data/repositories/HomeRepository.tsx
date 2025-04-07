import {HomeRepositoryInterface} from "../../domain/repositories/HomeRepositoryInterface";
import {AddDebtorDTO, Debtor} from "../../domain/entities/Debtor";
import {AxiosError} from "axios";
import {ApiDelivery} from "../source/remote/api/ApiDevlivery";
import {UseUserLocalStorage} from "../../presentation/hooks/UseUserLocalStorage";
import {ApiResponse} from "../source/remote/models/ApiResponse";
import Toast from "react-native-toast-message";

export class HomeRepository implements HomeRepositoryInterface {
    async loadDebtors(userSlug: string): Promise<Debtor[]> {
        try {
            const response = await ApiDelivery.get(`/users/debtors/${userSlug}`)
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError<{error: string}>);
            console.error(e.response?.data);
            return Promise.reject(e.response?.data);
        }
    }

    async addDebtor(debtor: AddDebtorDTO): Promise<ApiResponse> {
        try {
            const response = await ApiDelivery.post("/debtors", debtor);
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError<{error: string}>);
            console.log(e.response?.data);
            return Promise.reject(e.response?.data);
        }
    }

    async deleteDebtor(debtorId: number): Promise<ApiResponse> {
        try {
            const response = await ApiDelivery.delete(`/debtors/${debtorId}`);
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError<{error: string}>);
            console.log(e.response?.data);
            return Promise.reject(e.response?.data);
        }
    }

}