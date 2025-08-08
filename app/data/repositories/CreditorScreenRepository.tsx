import {DebtorScreenRepositoryInterface} from "../../domain/repositories/DebtorScreenRepositoryInterface";
import {AddDebtorDTO, Debtor} from "../../domain/entities/Debtor";
import {ApiResponse} from "../source/remote/models/ApiResponse";
import {ApiDelivery} from "../source/remote/api/ApiDevlivery";
import {AxiosError} from "axios";
import {CreditorScreenRepositoryInterface} from "../../domain/repositories/CreditorScreenRepositoryInterface";
import {Creditor} from "../../domain/entities/Creditor";


export class CreditorScreenRepository implements CreditorScreenRepositoryInterface {
    async addCreditor(creditor: AddDebtorDTO): Promise<ApiResponse> {
        try {
            const response = await ApiDelivery.post(`/creditors`, creditor);
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError<{error: string}>);
            console.log(e.response?.data);
            return Promise.reject(e.response?.data);
        }
    }

    async deleteCreditor(creditorId: number): Promise<ApiResponse> {
        try {
            const response = await ApiDelivery.delete(`/creditors/${creditorId}`);
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError<{error: string}>);
            console.log(e.response?.data);
            return Promise.reject(e.response?.data);
        }
    }

    async loadCreditors(userSlug: string): Promise<Creditor[]> {
        try {
            const response = await ApiDelivery.get(`users/${userSlug}/creditors`);
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError<{error: string}>);
            console.log(e.response?.data);
            return Promise.reject(e.response?.data);
        }
    }
}