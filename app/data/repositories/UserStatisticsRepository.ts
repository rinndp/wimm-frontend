import {UserStatisticsInterface} from "../../domain/entities/User";
import {ApiDelivery} from "../source/remote/api/ApiDevlivery";
import {AxiosError} from "axios";

export class UserStatisticsRepository {
    async getUserStatistics(userSlug: string): Promise<UserStatisticsInterface> {
        try {
            const response = await ApiDelivery.get(`/users/statistics/${userSlug}`);
            return Promise.resolve(response.data)
        } catch(error) {
            let e = (error as AxiosError<{error: string}>);
            console.error(e.response?.data);
            return Promise.reject(e.response?.data);
        }
    }
}