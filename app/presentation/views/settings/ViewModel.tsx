import {useState} from "react";
import {loadTokens} from "../../../data/source/local/secure/TokenStorage";
import {getUserStatisticsUseCase} from "../../../domain/use-cases/user/GetUserStatistics";
import {UserStatisticsInterface} from "../../../domain/entities/User";

export const settingsViewModel = () => {
    const [showLoading, setShowLoading] = useState(true);
    const [userEmail, setUserEmail] = useState<string>("");
    const [userStatistics, setUserStatistics] = useState<UserStatisticsInterface>();

    const getUserInfo = async () => {
        const creds = await loadTokens();
        if (creds) {
            const {email} = creds;
            setUserEmail(email)
        }
    }

    const getUserStatistics = async (userSlug: string) => {
        const response = await getUserStatisticsUseCase(userSlug);
        console.log(response);
        if (response !== undefined) {
            setUserStatistics(response);
            setShowLoading(false);
        }
    }

    return {
        userEmail,
        getUserInfo,
        getUserStatistics,
        userStatistics,
        showLoading,
    }
}
