import axios from "axios";
import {clearTokens, loadTokens, saveTokens} from "../../local/secure/TokenStorage";
import {removeUserUseCase} from "../../../../domain/use-cases/local-user/RemoveUserUseCase";
const ApiDelivery = axios.create({
    baseURL: "http://192.168.2.16:8000/api",
    // baseURL: "https://wimm-backend.onrender.com/api/",
    headers: {
        "Content-Type": "application/json"
    }
})

ApiDelivery.interceptors.request.use(async (config) => {
    const creds = await loadTokens();
    if (creds) {
        const { access } = creds;
        config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
});

ApiDelivery.interceptors.response.use(
    successResponse => successResponse,
    async errorResponse => {
        const originalRequest = errorResponse.config;

        if (errorResponse.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

                const tokens = await loadTokens();
            if (!tokens) return Promise.reject(errorResponse);

            try {
                const response = await ApiDelivery.post(
                    "/users/token/refresh",
                    { refresh: tokens.refresh });

                const newAccessToken = response.data.access;
                await saveTokens(response.data.access, response.data.refresh, tokens.email);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                await removeUserUseCase()
                await clearTokens()
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(errorResponse);
    }
);

export{ApiDelivery};