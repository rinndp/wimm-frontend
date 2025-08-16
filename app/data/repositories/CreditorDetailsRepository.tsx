import {CreditorDetailsRepositoryInterface} from "../../domain/repositories/CreditorDetailsRepositoryInterface";
import {AddCreditDTO, Credit} from "../../domain/entities/Credit";
import {ApiResponse} from "../source/remote/models/ApiResponse";
import {ApiDelivery} from "../source/remote/api/ApiDevlivery";
import {AxiosError} from "axios";

export class CreditorDetailsRepository implements CreditorDetailsRepositoryInterface {
    async addCredit(credit: AddCreditDTO): Promise<ApiResponse> {
        try {
            const response = await ApiDelivery.post("credits", credit);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = error as AxiosError<{error: string}>;
            console.log(e.response?.data);
            return Promise.reject(e.response?.data);
        }
    }

    async deleteCredit(creditId: number): Promise<ApiResponse> {
        try {
            const response = await ApiDelivery.delete(`credits/${creditId}`);
            return Promise.resolve(response.data);
        } catch (error) {
            let e  = error as AxiosError<{error: string}>;
            console.log(e.response?.data);
            return Promise.reject(e.response?.data);
        }
    }

    async loadCredits(creditorId: number): Promise<Credit[]> {
        try {
            const response = await ApiDelivery.get(`creditors/${creditorId}/credits`);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = error as AxiosError<{error: string}>;
            console.log(e.response?.data);
            return Promise.reject(e.response?.data);
        }
    }
}