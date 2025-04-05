import {HomeRepositoryInterface} from "../../domain/repositories/HomeRepositoryInterface";
import {Debtor} from "../../domain/entities/Debtor";
import {AxiosError} from "axios";
import {ApiDelivery} from "../source/remote/ApiDevlivery";
import {UseUserLocalStorage} from "../../presentation/hooks/UseUserLocalStorage";

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

}