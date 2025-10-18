import {UserStatisticsRepository} from "../../../data/repositories/UserStatisticsRepository";

const {getUserStatistics} = new UserStatisticsRepository()

export const getUserStatisticsUseCase = async (userSlug: string) => {
    return await getUserStatistics(userSlug);
}